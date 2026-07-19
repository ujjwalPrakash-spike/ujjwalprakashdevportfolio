"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useRouter } from "next/navigation";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  videoSrc?: string;
  targetUrl?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  activeIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
  activeIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkActiveCard = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardElements = container.querySelectorAll(".carousel-card-item");
      if (cardElements.length === 0) return;

      const firstCard = cardElements[0] as HTMLElement;
      const cardWidth = firstCard.clientWidth;
      const paddingLeft = window.innerWidth * 0.065;

      const focusPoint = container.scrollLeft + paddingLeft + cardWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cardElements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        const cardCenter = htmlEl.offsetLeft + htmlEl.clientWidth / 2;
        const distance = Math.abs(cardCenter - focusPoint);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  useEffect(() => {
    checkActiveCard();
    window.addEventListener("resize", checkActiveCard);
    return () => window.removeEventListener("resize", checkActiveCard);
  }, [items]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardElements = carouselRef.current.querySelectorAll(".carousel-card-item");
      if (cardElements.length > 0) {
        const cardWidth = (cardElements[0] as HTMLElement).clientWidth;
        carouselRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardElements = carouselRef.current.querySelectorAll(".carousel-card-item");
      if (cardElements.length > 0) {
        const cardWidth = (cardElements[0] as HTMLElement).clientWidth;
        carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardElements = carouselRef.current.querySelectorAll(".carousel-card-item");
      if (cardElements.length > index) {
        const targetCard = cardElements[index] as HTMLElement;
        const paddingLeft = window.innerWidth * 0.065;
        carouselRef.current.scrollTo({
          left: targetCard.offsetLeft - paddingLeft,
          behavior: "smooth",
        });
      }
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex, activeIndex }}
    >
      <div className="relative w-full">
        {/* Smooth Gradient Masks to match background color */}
        <div className="absolute left-0 top-0 bottom-0 w-[3vw] bg-gradient-to-r from-[#dee1e4] via-[#dee1e4]/30 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[3vw] bg-gradient-to-l from-[#dee1e4] via-[#dee1e4]/30 to-transparent z-30 pointer-events-none" />

        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={() => {
            checkScrollability();
            checkActiveCard();
          }}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-6 px-[6.5vw]",
              "w-fit",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl carousel-card-item"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 px-[6.5vw]">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { onCardClose, activeIndex } = useContext(CarouselContext);
  const isActive = index === activeIndex;
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !open) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, open]);

  useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => handleClose());

  const handleClick = () => {
    if (!isActive) {
      onCardClose(index);
      return;
    }
    if (card.targetUrl) {
      setTimeout(() => {
        router.push(card.targetUrl as string);
      }, 150);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleClick}
        animate={{
          scale: isActive ? 1.0 : 0.95,
          opacity: isActive ? 1.0 : 0.35,
          filter: isActive ? "blur(0px)" : "blur(3px)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 1,
        }}
        className={cn(
          "relative z-10 flex h-[350px] w-[72vw] flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[580px] md:w-[72vw] dark:bg-neutral-900 transition-all duration-500 ease-out transform-gpu",
          isActive ? "z-20 shadow-xl" : "z-10 shadow-sm"
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        {card.videoSrc ? (
          <>
            {/* Solid dark base — shows cleanly when video is not playing */}
            <div className="absolute inset-0 z-0 bg-[#111111]" />
            <motion.video
              ref={videoRef}
              src={card.videoSrc}
              poster={card.src}
              preload="auto"
              muted
              loop
              playsInline
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={
                isActive
                  ? { duration: 0.5, ease: "easeIn" }
                  : { duration: 0 }
              }
              className="absolute inset-0 z-10 h-full w-full object-cover"
            />
          </>
        ) : (
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="absolute inset-0 z-10 object-cover"
          />
        )}
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a view"}
      {...rest}
    />
  );
};
