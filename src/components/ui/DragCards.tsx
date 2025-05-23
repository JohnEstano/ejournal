"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "framer-motion";

export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig,
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (cardRef.current && typeof window !== "undefined") {
        const cardRect = cardRef.current.getBoundingClientRect();
        const maxX = (window.innerWidth - cardRect.width) / 2;
        const maxY = (window.innerHeight - cardRect.height) / 2;
        
        setConstraints({
          top: -maxY,
          left: -maxX,
          right: maxX,
          bottom: maxY,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDragEnd = (event: any, info: any) => {
    document.body.style.cursor = "default";
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        ...springConfig,
      },
    });

    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const maxX = (window.innerWidth - cardRect.width) / 2;
    const maxY = (window.innerHeight - cardRect.height) / 2;

    const currentVelocityX = velocityX.get();
    const currentVelocityY = velocityY.get();

    const newX = info.point.x + currentVelocityX * 0.3;
    const newY = info.point.y + currentVelocityY * 0.3;

    const clampedX = Math.max(-maxX, Math.min(newX, maxX));
    const clampedY = Math.max(-maxY, Math.min(newY, maxY));

    animate(info.point.x, clampedX, {
      duration: 0.8,
      ease: [0.2, 0, 0, 1],
      bounce: 0.4,
      type: "spring",
      stiffness: 50,
      damping: 15,
      mass: 0.8,
    });

    animate(info.point.y, clampedY, {
      duration: 0.8,
      ease: [0.2, 0, 0, 1],
      bounce: 0.4,
      type: "spring",
      stiffness: 50,
      damping: 15,
      mass: 0.8,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={handleDragEnd}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative h-64 w-64 overflow-hidden rounded-2xl bg-transparent shadow-2xl transform-3d",
        className
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("[perspective:3000px]", className)}>{children}</div>
  );
};