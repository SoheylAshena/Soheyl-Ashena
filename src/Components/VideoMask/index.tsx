import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    const video = videoRef.current!;
    video.playbackRate = playbackRate;

    const canvas = canvasRef.current!;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Create offscreen canvas for mask processing
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d")!;

    // Configure ScrollTrigger to trigger animation once
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center", // Trigger when top of container hits center of viewport
      once: true, // Run only once
      onEnter: startAnimation,
    });

    // Draw video frame as a mask on the canvas
    function draw() {
      if (video.paused || video.ended) {
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
    }

    // Start animation when ScrollTrigger is hit
    function startAnimation() {
      video
        .play()
        .catch((error) => console.error("Video playback failed:", error));
      if (!rafId.current) draw(); // Start drawing if not already running
    }

    // Cleanup on component unmount
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      scrollTrigger.kill();
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
          display: "none",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default VideoColorMaskOverlay;
