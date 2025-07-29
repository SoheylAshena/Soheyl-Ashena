import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface VideoAlphaMaskProps {
  videoSrc: string;
  width?: number;
  height?: number;
  color: string;
  inverted?: boolean;
  playbackRate?: number;
  children: React.ReactNode;
  rotate?: number;
}

const VideoAlphaMask: React.FC<VideoAlphaMaskProps> = ({
  videoSrc,
  width = 680,
  height = 400,
  color,
  inverted = false,
  playbackRate = 1,
  children,
  rotate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    video.playbackRate = playbackRate;

    const initializeCanvas = () => {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
      if (video.paused || video.ended) {
        return; // Exit animation loop
      }

      ctx.globalCompositeOperation = inverted
        ? "destination-out"
        : "destination-in";

      ctx.drawImage(video, 0, 0, width, height);

      rafId.current = requestAnimationFrame(draw);
    };

    initializeCanvas();

    const startAnimation = () => {
      video.play();
      draw();
    };

    let scrollCtx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          onEnter: startAnimation,
        },
      });
    });

    return () => {
      cancelAnimationFrame(rafId.current!);

      scrollCtx.revert();

      video.pause();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          pointerEvents: "none",
          transform: "rotate(" + rotate + "deg)",
        }}
      />
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "none",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default VideoAlphaMask;
