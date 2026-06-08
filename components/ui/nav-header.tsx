"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

type NavHeaderProps = {
  items: NavItem[];
  className?: string;
  dropdownOpen?: string | null;
  onDropdownOpen?: (label: string | null) => void;
};

function NavHeader({
  items,
  className,
  dropdownOpen,
  onDropdownOpen,
}: NavHeaderProps) {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const hideCursor = () => {
    setPosition((current) => ({ ...current, opacity: 0 }));
    onDropdownOpen?.(null);
  };

  return (
    <ul
      className={cn(
        "relative mx-auto hidden w-fit items-center rounded-full border border-outline-variant/45 bg-white/90 p-1 shadow-sm backdrop-blur-xl lg:flex",
        className
      )}
      onMouseLeave={hideCursor}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          hideCursor();
        }
      }}
    >
      {items.map((item) => (
        <Tab
          key={item.label}
          item={item}
          setPosition={setPosition}
          dropdownOpen={dropdownOpen}
          onDropdownOpen={onDropdownOpen}
        />
      ))}

      <Cursor position={position} />
    </ul>
  );
}

type TabProps = {
  item: NavItem;
  setPosition: Dispatch<SetStateAction<CursorPosition>>;
  dropdownOpen?: string | null;
  onDropdownOpen?: (label: string | null) => void;
};

function Tab({
  item,
  setPosition,
  dropdownOpen,
  onDropdownOpen,
}: TabProps) {
  const ref = useRef<HTMLLIElement>(null);
  const hasChildren = Boolean(item.children?.length);
  const isOpen = dropdownOpen === item.label;

  const updatePosition = () => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();
    setPosition({
      width,
      opacity: 1,
      left: ref.current.offsetLeft,
    });

    onDropdownOpen?.(hasChildren ? item.label : null);
  };

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={updatePosition}
      onFocus={updatePosition}
    >
      {hasChildren ? (
        <>
          <button
            type="button"
            className={cn(
              "relative z-10 flex h-10 items-center gap-1 rounded-full px-3 text-sm font-bold text-white mix-blend-difference transition-transform duration-200 lg:px-3.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            )}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {item.label}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {isOpen && (
            <div className="absolute left-1/2 top-[calc(100%+0.7rem)] z-30 w-64 -translate-x-1/2 pt-1">
              <ul className="rounded-lg border border-outline-variant/35 bg-white p-2 shadow-xl shadow-slate-900/10">
                {item.children?.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-primary-light/45 hover:text-on-surface"
                      onClick={() => onDropdownOpen?.(null)}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <NavLink href={item.href} onClick={() => onDropdownOpen?.(null)}>
          {item.label}
        </NavLink>
      )}
    </li>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative z-10 flex h-10 items-center rounded-full px-3 text-sm font-bold text-white mix-blend-difference transition-transform duration-200 lg:px-3.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function Cursor({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="absolute z-0 h-10 rounded-full bg-black"
    />
  );
}

export default NavHeader;
