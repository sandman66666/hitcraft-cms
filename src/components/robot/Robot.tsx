import { useRef, useEffect, useState } from "react";

interface RobotProps {
  // Position classes - can override default robot positioning
  position?: "robot-center" | "robot-left" | "robot-contact" | "robot-sent";
  // Custom styles for the container
  style?: React.CSSProperties;
  // Whether to show the Christmas hat
  showChristmasHat?: boolean;
  // Whether to show the bounce animation
  shouldBounce?: boolean;
  // Whether to enable eye tracking
  enableEyeTracking?: boolean;
  // Custom image to show instead of eyes
  imageSrc?: string | null;
  // Z-index for the robot
  zIndex?: number;
  // Whether to show or hide the robot
  isVisible?: boolean;
  // Additional class names for the container
  className?: string;
}

export default function Robot({
  position = "robot-center",
  style = {},
  showChristmasHat = false,
  shouldBounce = true,
  enableEyeTracking = true,
  imageSrc = null,
  zIndex = 50,
  isVisible = true,
  className = "",
}: RobotProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const robotContainerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop || !enableEyeTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      const eyes = [leftEyeRef.current, rightEyeRef.current];

      eyes.forEach((eye) => {
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const eyeDeltaX = e.clientX - eyeCenterX;
        const eyeDeltaY = e.clientY - eyeCenterY;

        const angle = Math.atan2(eyeDeltaY, eyeDeltaX);
        const maxMove = Math.min(rect.width / 4, rect.height / 4);
        const distance = Math.min(
          Math.hypot(eyeDeltaX, eyeDeltaY) / 8,
          maxMove
        );

        const eyeX = Math.cos(angle) * distance;
        const eyeY = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
          eye.style.transition = "transform 0.1s ease-out";
          eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, enableEyeTracking]);

  if (!isVisible) return null;

  return (
    <div
      ref={robotContainerRef}
      className={`robot-container ${position} ${
        shouldBounce ? "robot-bounce" : ""
      } ${className}`}
      style={{
        zIndex,
        ...style,
      }}
    >
      {/* Christmas Hat */}
      {showChristmasHat && (
        <div className="hat-container">
          <div className="christmas-hat"></div>
        </div>
      )}

      <div className="robot-background relative">
        {imageSrc ? (
          <section className="flex justify-center items-center h-full">
            <img src={imageSrc} className="robot-sent-image" alt="robot" />
          </section>
        ) : (
          <>
            <div
              ref={leftEyeRef}
              className="open-eye left animation-blink"
            ></div>
            <div
              ref={rightEyeRef}
              className="open-eye right animation-blink"
            ></div>
          </>
        )}
      </div>
    </div>
  );
}
