import React, { useRef, useEffect, type CSSProperties } from "react";
import * as THREE from "three";

type MaskedVideoProps = {
  maskSrc: string;
  maskColor?: string;
  style?: CSSProperties;
  children: React.ReactNode;
};

export const MaskedVideo: React.FC<MaskedVideoProps> = ({
  maskSrc,
  maskColor = "black",
  style,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1) SCENE, CAMERA & RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    // absolutely fill parent
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";

    containerRef.current.appendChild(renderer.domElement);

    // 2) VIDEO ELEMENT (wait for it to be ready)
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = maskSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const onCanPlay = () => {
      video.play().catch(() => {});
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      // 3) MESH WITH ALPHAMAP
      const geometry = new THREE.PlaneGeometry(4, 2);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(maskColor),
        alphaMap: videoTexture,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 4) RENDER LOOP
      const animate = () => {
        // ensure videoTexture is updated
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
          videoTexture.needsUpdate = true;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    };

    video.addEventListener("canplay", onCanPlay);

    // 5) HANDLE RESIZE
    const onResize = () => {
      if (!containerRef.current) return;
      const W = containerRef.current.clientWidth;
      const H = containerRef.current.clientHeight;
      renderer.setSize(W, H);

      // adjust ortho camera to keep plane square
      const aspect = W / H;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    // kick off initial size
    onResize();

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      video.removeEventListener("canplay", onCanPlay);
      renderer.dispose();
      video.pause();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [maskSrc, maskColor]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Your content lives here, behind the mask overlay */}
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>

      {/* Three.js will inject its <canvas> here */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          // ensure this sits above your children
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
