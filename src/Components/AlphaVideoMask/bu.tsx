import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define props interface for type safety
interface VideoAlphaMaskProps {
  videoSrc: string; // URL of the video
  width?: number; // Canvas width (default: 400)
  height?: number; // Canvas height (default: 400)
  color: string; // Color for the canvas background
  inverted?: boolean; // Invert the video mask (default: false)
  playbackRate?: number; // Video playback speed (default: 1)
  children: React.ReactNode; // Child elements to render
}

const VideoAlphaMask: React.FC<VideoAlphaMaskProps> = ({
  videoSrc,
  width = 400,
  height = 400,
  color,
  inverted = false,
  playbackRate = 1,
  children,
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

    startAnimation();

    // let scrollCtx = gsap.context(() => {
    //   gsap.to(containerRef.current, {
    //     scrollTrigger: {
    //       trigger: containerRef.current,
    //       start: "top center",
    //       onEnter: startAnimation,
    //     },
    //   });
    // });

    return () => {
      cancelAnimationFrame(rafId.current!);

      //   scrollCtx.revert();

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
