import React, { useRef, useEffect } from "react";

interface VideoColorMaskOverlayProps {
  videoSrc: string;
  width?: number;
  height?: number;
  color: string;
  inverted?: boolean;
  children: React.ReactNode;
}

const VideoColorMaskOverlay: React.FC<VideoColorMaskOverlayProps> = ({
  videoSrc,
  width = 400,
  height = 400,
  color,
  inverted = false,
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;

    // Create offscreen canvas for mask processing
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d")!;

    let rafId: number;

    const draw = () => {
      if (video.paused || video.ended) return;

      // 1) Fill main canvas with the chosen color
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);

      // 2) Draw video into offscreen canvas
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.drawImage(video, 0, 0, width, height);

      // 3) Extract pixels and use red channel as alpha (since video is grayscale)
      const frame = maskCtx.getImageData(0, 0, width, height);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = inverted ? 255 - data[i] : data[i]; // Invert alpha if requested
      }
      maskCtx.putImageData(frame, 0, 0);

      // 4) Use offscreen canvas as mask
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskCanvas, 0, 0, width, height);

      // 5) Restore for next frame
      ctx.globalCompositeOperation = "source-over";

      rafId = requestAnimationFrame(draw);
    };

    const onPlay = () => {
      draw();
    };
    video.addEventListener("play", onPlay);

    // Start immediately if video is playing
    if (!video.paused && !video.ended) draw();

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("play", onPlay);
    };
  }, [videoSrc, width, height, color, inverted]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
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
        autoPlay
        playsInline
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0,
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default VideoColorMaskOverlay;
