"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  description: string;
  role?: string;
  rating?: number;
}

interface TestimonialCarouselProps extends HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const visibleCardCount = 3;

const TestimonialCarousel = forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitX, setExitX] = useState(0);

    const hasMultipleCards = testimonials.length > 1;

    const moveTo = (direction: 1 | -1) => {
      if (!hasMultipleCards) return;

      setExitX(direction * 220);
      window.setTimeout(() => {
        setCurrentIndex((current) => {
          const nextIndex = current + direction;
          if (nextIndex < 0) return testimonials.length - 1;
          return nextIndex % testimonials.length;
        });
        setExitX(0);
      }, 180);
    };

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (Math.abs(info.offset.x) < 90) return;
      moveTo(info.offset.x < 0 ? 1 : -1);
    };

    if (testimonials.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[22rem] w-full items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative h-80 w-full max-w-sm sm:h-[21rem]">
          {testimonials.map((testimonial, index) => {
            const position =
              (index - currentIndex + testimonials.length) %
              testimonials.length;
            const isVisible = position < visibleCardCount;

            if (!isVisible) return null;

            const isCurrentCard = position === 0;

            return (
              <motion.article
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-outline-variant/25 bg-white p-6 shadow-xl",
                  isCurrentCard
                    ? "cursor-grab active:cursor-grabbing"
                    : "pointer-events-none"
                )}
                style={{ zIndex: visibleCardCount - position }}
                drag={isCurrentCard && hasMultipleCards ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.94,
                  opacity: 0,
                  y: position * 14,
                  rotate: position * -2,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 1 - position * 0.045,
                  opacity: isCurrentCard ? 1 : 0.64 - position * 0.18,
                  x: isCurrentCard ? exitX : 0,
                  y: position * 14,
                  rotate: isCurrentCard ? exitX / 26 : position * -2,
                }}
                transition={{ type: "spring", stiffness: 310, damping: 24 }}
              >
                {showArrows && isCurrentCard && hasMultipleCards ? (
                  <div className="absolute inset-x-0 top-3 z-10 flex justify-between px-4">
                    <button
                      type="button"
                      aria-label="Previous testimonial"
                      onClick={() => moveTo(-1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/85 text-on-surface-variant shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next testimonial"
                      onClick={() => moveTo(1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/85 text-on-surface-variant shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}

                <div className="flex flex-col items-center gap-4 pt-5 text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full border-2 border-primary-light object-cover shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-extrabold text-on-surface">
                      {testimonial.name}
                    </h3>
                    {testimonial.role ? (
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                        {testimonial.role}
                      </p>
                    ) : null}
                  </div>

                  {testimonial.rating ? (
                    <div className="flex gap-1 rounded-full border border-warning/15 bg-warning/5 px-3 py-1">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={cn(
                            "h-3.5 w-3.5",
                            starIndex < testimonial.rating!
                              ? "fill-warning text-warning"
                              : "text-outline-variant"
                          )}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>

                <p className="mt-5 text-center text-sm font-medium leading-relaxed text-on-surface-variant">
                  &ldquo;{testimonial.description}&rdquo;
                </p>
              </motion.article>
            );
          })}

          {showDots && hasMultipleCards ? (
            <div className="absolute -bottom-8 inset-x-0 flex justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-outline-variant/70 hover:bg-primary/45"
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel };
