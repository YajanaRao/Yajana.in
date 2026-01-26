import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfilePic from "@/assets/images/profile-pic.jpg";
import MeInNature from "@/assets/images/me/nature.jpg";
import MeInFerry from "@/assets/images/me/ferry.jpg";
import MeWithWings from "@/assets/images/me/wings.png";

const IMAGES: string[] = [ProfilePic, MeInNature, MeWithWings, MeInFerry];

// Deterministic rotation values for natural card movement (avoids hydration mismatch)
const getRotation = (index: number) => {
  const rotations = [-8, 5, -3, 7]; // Pre-defined values for each card position
  return rotations[index % rotations.length];
};

const ProfileCarousel = () => {
  const [active, setActive] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const isActive = (index: number) => {
    return index === active;
  };

  return (
    <div
      className="relative flex items-center justify-center h-[300px] w-full"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {IMAGES.map((img, index) => (
          <motion.div
            key={img}
            initial={{
              opacity: 0,
              scale: 0.9,
              z: -100,
              rotate: getRotation(index),
            }}
            animate={{
              opacity: isActive(index) ? 1 : 0.7,
              scale: isActive(index) ? 1 : 0.95,
              z: isActive(index) ? 0 : -100,
              rotate: isActive(index) ? 0 : getRotation(index),
              zIndex: isActive(index) ? 40 : IMAGES.length + 2 - index,
              y: isActive(index) ? [0, -80, 0] : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              z: 100,
              rotate: getRotation(index),
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: isActive(index) ? 1.05 : 0.98,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            className="absolute origin-bottom"
          >
            <img
              src={img}
              alt={`Card ${index + 1}`}
              draggable={false}
              className="w-64 h-64 rounded-2xl object-cover object-center"
              style={{
                boxShadow: `
                  0 ${10 + index * 4}px ${20 + index * 8}px rgba(0, 0, 0, ${
                  0.4 + index * 0.1
                })
                `,
                filter: "contrast(1.02) saturate(0.98)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProfileCarousel;
