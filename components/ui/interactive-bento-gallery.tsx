"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface MediaItemType {
  id: string;
  type?: "image" | "video";
  title: string;
  desc: string;
  url: string;
  span?: string;
}

interface MediaItemProps {
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
}

const defaultSpans = [
  "row-span-3 sm:col-span-1 sm:row-span-3 lg:col-span-1 lg:row-span-4",
  "row-span-2 sm:col-span-2 sm:row-span-3 lg:col-span-2 lg:row-span-3",
  "row-span-3 sm:col-span-2 sm:row-span-3 lg:col-span-1 lg:row-span-4",
  "row-span-2 sm:col-span-1 sm:row-span-2 lg:col-span-2 lg:row-span-3",
  "row-span-3 sm:col-span-1 sm:row-span-3 lg:col-span-1 lg:row-span-4",
  "row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-3",
  "row-span-3 sm:col-span-1 sm:row-span-3 lg:col-span-1 lg:row-span-4",
];

function MediaItem({ item, className = "", onClick }: MediaItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(item.type === "video");

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.unobserve(video);
  }, [item.type]);

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    let mounted = true;

    async function handlePlayback() {
      if (!videoRef.current) return;

      if (!isInView) {
        videoRef.current.pause();
        return;
      }

      try {
        if (videoRef.current.readyState < 3) {
          setIsBuffering(true);
          await new Promise<void>((resolve) => {
            if (!videoRef.current) return resolve();
            videoRef.current.oncanplay = () => resolve();
          });
        }

        if (mounted && videoRef.current) {
          setIsBuffering(false);
          await videoRef.current.play();
        }
      } catch {
        setIsBuffering(false);
      }
    }

    handlePlayback();

    return () => {
      mounted = false;
      video.pause();
    };
  }, [isInView, item.type]);

  if (item.type === "video") {
    return (
      <div className={`${className} relative overflow-hidden bg-inverse-surface`}>
        <video
          ref={videoRef}
          aria-label={item.title}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          onClick={onClick}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-cover`}
      loading="lazy"
      decoding="async"
      onClick={onClick}
    />
  );
}

interface GalleryModalProps {
  selectedItem: MediaItemType;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
}

function GalleryModal({
  selectedItem,
  onClose,
  setSelectedItem,
  mediaItems,
}: GalleryModalProps) {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/70 px-3 py-6 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative flex h-[72vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-surface-container-lowest shadow-xl"
          initial={{ y: 18, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 18, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          onClick={(event) => event.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <MediaItem item={selectedItem} className="h-full w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 sm:p-6">
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                  {selectedItem.title}
                </h2>
                <p className="mt-1 max-w-2xl text-sm font-medium text-white/80">
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            type="button"
            aria-label="Close gallery preview"
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-on-surface shadow-md backdrop-blur transition-colors hover:bg-white"
            onClick={onClose}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((position) => ({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          }));
        }}
        className="fixed bottom-5 left-1/2 z-[110] -translate-x-1/2 touch-none"
      >
        <div className="flex max-w-[92vw] items-center -space-x-2 overflow-x-auto rounded-lg border border-white/25 bg-primary/25 px-3 py-2 shadow-xl backdrop-blur-xl">
          {mediaItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`View ${item.title}`}
              onClick={() => setSelectedItem(item)}
              className={`relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg border border-white/25 bg-surface-container shadow-md ${
                selectedItem.id === item.id ? "ring-2 ring-white" : ""
              }`}
              style={{
                zIndex:
                  selectedItem.id === item.id ? 30 : mediaItems.length - index,
              }}
              initial={{ rotate: index % 2 === 0 ? -10 : 10 }}
              animate={{
                y: selectedItem.id === item.id ? -6 : 0,
                rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -10 : 10,
                scale: selectedItem.id === item.id ? 1.12 : 1,
              }}
              whileHover={{ y: -8, rotate: 0, scale: 1.16 }}
              whileTap={{ scale: 0.96 }}
            >
              <MediaItem item={item} className="h-full w-full" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItemType[];
  title?: string;
  description?: string;
  emptyMessage?: string;
}

export default function InteractiveBentoGallery({
  mediaItems,
  title,
  description,
  emptyMessage = "No images found in this category.",
}: InteractiveBentoGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);
  const draggedRef = useRef(false);

  useEffect(() => {
    setItems(mediaItems);
    setSelectedItem(null);
  }, [mediaItems]);

  if (mediaItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-base font-semibold text-on-surface-variant">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div>
      {title || description ? (
        <div className="mb-8 text-center">
          {title ? (
            <motion.h2
              className="text-3xl font-extrabold text-on-surface md:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {title}
            </motion.h2>
          ) : null}
          {description ? (
            <motion.p
              className="mx-auto mt-2 max-w-2xl text-base text-on-surface-variant"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              {description}
            </motion.p>
          ) : null}
        </div>
      ) : null}

      <motion.div
        className="grid grid-cols-1 gap-3 auto-rows-[92px] sm:grid-cols-3 sm:auto-rows-[84px] md:gap-4 lg:grid-cols-4 lg:auto-rows-[92px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06 },
          },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={`gallery-media-${item.id}`}
            className={`group relative overflow-hidden rounded-lg bg-surface-container shadow-md ring-1 ring-outline-variant/35 ${item.span || defaultSpans[index % defaultSpans.length]}`}
            onClick={() => {
              if (!isDragging && !draggedRef.current) setSelectedItem(item);
            }}
            variants={{
              hidden: { y: 34, scale: 0.96, opacity: 0 },
              visible: {
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 340,
                  damping: 28,
                  delay: index * 0.025,
                },
              },
            }}
            whileHover={{ scale: 1.015 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragStart={() => {
              draggedRef.current = true;
              setIsDragging(true);
            }}
            onDragEnd={(_, info) => {
              const moveDistance = info.offset.x + info.offset.y;

              if (Math.abs(moveDistance) > 48) {
                const reorderedItems = [...items];
                const [draggedItem] = reorderedItems.splice(index, 1);
                const targetIndex =
                  moveDistance > 0
                    ? Math.min(index + 1, items.length - 1)
                    : Math.max(index - 1, 0);

                reorderedItems.splice(targetIndex, 0, draggedItem);
                setItems(reorderedItems);
              }

              setIsDragging(false);
              window.setTimeout(() => {
                draggedRef.current = false;
              }, 0);
            }}
          >
            <MediaItem item={item} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="line-clamp-1 text-base font-extrabold text-white">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm font-medium text-white/80">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
