import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define props interface for type safety
interface VideoColorMaskOverlayProps {
  videoSrc: string; // URL of the video
  width?: number; // Canvas width (default: 400)
  height?: number; // Canvas height (default: 400)
  color: string; // Color for the canvas background
  inverted?: boolean; // Invert the video mask (default: false)
  playbackRate?: number; // Video playback speed (default: 1)
  children: React.ReactNode; // Child elements to render
}

const VideoColorMaskOverlay: React.FC<VideoColorMaskOverlayProps> = ({
  videoSrc,
  width = 400,
  height = 400,
  color,
  inverted = false,
  playbackRate = 1,
  children,
}) => {
  // Refs for DOM elements and animation state
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const hasPlayed = useRef(false); // Tracks if animation has played

  // Initialize canvas with solid color
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current!;
    canvas.width = width; // Set canvas dimensions
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color; // Fill with specified color
    ctx.fillRect(0, 0, width, height);
  }, [width, height, color]);

  // Draw video frame as a mask on the canvas
  const draw = useCallback(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Create offscreen canvas for mask processing
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d")!;

    // Stop animation if video is paused or ended, but draw final frame
    if (video.paused || video.ended) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
      maskCtx.drawImage(video, 0, 0, width, height);
      const frame = maskCtx.getImageData(0, 0, width, height);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = inverted ? 255 - data[i] : data[i]; // Use red channel as alpha
      }
      maskCtx.putImageData(frame, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskCanvas, 0, 0, width, height);
      return; // Exit animation loop
    }

    // Draw colored background
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Draw video to offscreen canvas
    maskCtx.drawImage(video, 0, 0, width, height);
    const frame = maskCtx.getImageData(0, 0, width, height);
    const data = frame.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i + 3] = inverted ? 255 - data[i] : data[i]; // Apply inversion if needed
    }
    maskCtx.putImageData(frame, 0, 0);

    // Apply mask to main canvas
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(maskCanvas, 0, 0, width, height);

    // Continue animation loop
    rafId.current = requestAnimationFrame(draw);
  }, [width, height, color, inverted]);

  useEffect(() => {
    const video = videoRef.current!;
    initializeCanvas(); // Set up canvas with solid color on mount

    video.playbackRate = playbackRate; // Set video playback speed

    // Start animation when ScrollTrigger is hit
    const startAnimation = () => {
      if (hasPlayed.current) return; // Ensure animation plays only once
      hasPlayed.current = true;
      video
        .play()
        .catch((error) => console.error("Video playback failed:", error));
      if (!rafId.current) draw(); // Start drawing if not already running
    };

    // Configure ScrollTrigger to trigger animation once
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center", // Trigger when top of container hits center of viewport
      once: true, // Run only once
      onEnter: startAnimation,
    });

    // Cleanup on component unmount
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      scrollTrigger.kill();
      video.pause();
    };
  }, [draw, initializeCanvas, playbackRate]);

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
          pointerEvents: "none", // Prevent canvas from blocking interactions
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
          opacity: 0, // Hide video element
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default VideoColorMaskOverlay;
