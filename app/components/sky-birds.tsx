import * as React from "react";

interface SkyElement {
  id: number;
  type: "bird" | "cloud" | "star-bright" | "star-twinkle";
  leftPercent: number;
  topPercent: number;
  size: number;
  parallaxSpeed: number;
  maxOffset: number;
  opacity?: number;
}

const SKY_ELEMENTS: SkyElement[] = [
  {
    id: 1,
    type: "bird",
    leftPercent: 2,
    topPercent: 25,
    size: 26,
    parallaxSpeed: 0.03,
    maxOffset: 150,
  },
  {
    id: 2,
    type: "bird",
    leftPercent: 98,
    topPercent: 75,
    size: 32,
    parallaxSpeed: 0.05,
    maxOffset: 100,
  },
  {
    id: 3,
    type: "cloud",
    leftPercent: 95,
    topPercent: 2,
    size: 280,
    parallaxSpeed: 0.01,
    maxOffset: 50,
    opacity: 0.35,
  },
  {
    id: 4,
    type: "cloud",
    leftPercent: -5,
    topPercent: 70,
    size: 220,
    parallaxSpeed: 0.015,
    maxOffset: 40,
    opacity: 0.3,
  },
  {
    id: 5,
    type: "cloud",
    leftPercent: -8,
    topPercent: 5,
    size: 150,
    parallaxSpeed: 0.012,
    maxOffset: 35,
    opacity: 0.25,
  },
];

const NIGHT_SKY_ELEMENTS: SkyElement[] = [
  {
    id: 101,
    type: "star-bright",
    leftPercent: 5,
    topPercent: 15,
    size: 24,
    parallaxSpeed: 0.02,
    maxOffset: 80,
    opacity: 0.9,
  },
  {
    id: 102,
    type: "star-twinkle",
    leftPercent: 92,
    topPercent: 20,
    size: 18,
    parallaxSpeed: 0.035,
    maxOffset: 100,
    opacity: 0.8,
  },
  {
    id: 103,
    type: "star-bright",
    leftPercent: -2,
    topPercent: 65,
    size: 22,
    parallaxSpeed: 0.015,
    maxOffset: 40,
    opacity: 0.85,
  },
  {
    id: 104,
    type: "star-bright",
    leftPercent: 98,
    topPercent: 45,
    size: 20,
    parallaxSpeed: 0.025,
    maxOffset: 90,
    opacity: 0.85,
  },
  {
    id: 105,
    type: "star-twinkle",
    leftPercent: 95,
    topPercent: 80,
    size: 16,
    parallaxSpeed: 0.04,
    maxOffset: 120,
    opacity: 0.75,
  },
  {
    id: 106,
    type: "star-twinkle",
    leftPercent: 3,
    topPercent: 50,
    size: 14,
    parallaxSpeed: 0.03,
    maxOffset: 100,
    opacity: 0.7,
  },
];

const getImageSrc = (type: SkyElement["type"]): string => {
  switch (type) {
    case "bird":
      return "/images/bird-5.png";
    case "cloud":
      return "/images/cloud-3a.png";
    case "star-bright":
      return "/images/star-bright.svg";
    case "star-twinkle":
      return "/images/star-twinkle.svg";
    default:
      return "";
  }
};

const SkyBirds = () => {
  const [scrollY, setScrollY] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const [containerBounds, setContainerBounds] = React.useState({
    left: 0,
    width: 0,
  });
  const containerRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
    setScrollY(window.scrollY);

    containerRef.current =
      document.querySelector("[data-sky-container]") ||
      document.querySelector(".container.max-w-screen-md");

    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerBounds({ left: rect.left, width: rect.width });
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    updateBounds();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderElements = (elements: SkyElement[]) => {
    return elements.map((element) => {
      const rawOffset = scrollY * element.parallaxSpeed;
      const clampedOffset = Math.min(rawOffset, element.maxOffset);

      let leftPx =
        containerBounds.left +
        (containerBounds.width * element.leftPercent) / 100;
      if (element.leftPercent > 50) {
        leftPx = leftPx - element.size;
      }

      return (
        <img
          key={element.id}
          src={getImageSrc(element.type)}
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{
            left: `${leftPx}px`,
            top: `${element.topPercent}%`,
            width: `${element.size}px`,
            height: "auto",
            transform: `translateY(${clampedOffset}px)`,
            opacity: element.opacity ?? 1,
          }}
        />
      );
    });
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 dark:hidden">
        {renderElements(SKY_ELEMENTS)}
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
        {renderElements(NIGHT_SKY_ELEMENTS)}
      </div>
    </>
  );
};

export default SkyBirds;
