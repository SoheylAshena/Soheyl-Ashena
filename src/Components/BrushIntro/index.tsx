import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BrushIntroProps {
  duration?: number;
  Shape: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  paused?: boolean;
}

const BrushIntro: React.FC<BrushIntroProps> = ({
  duration = 3,
  Shape,
  className,
  paused,
}) => {
  const shapeRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      gsap.from("path", {
        paused: paused,
        duration,
        drawSVG: "0%",
        ease: "power2.in",
      });
    },
    { scope: shapeRef, dependencies: [paused], revertOnUpdate: true }
  );

  return <Shape className={className} ref={shapeRef} />;
};

export default BrushIntro;
