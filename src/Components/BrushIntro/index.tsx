import { useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(useGSAP);

interface BrushIntroProps {
  duration?: number;
  Shape: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const BrushIntro: React.FC<BrushIntroProps> = ({
  duration = 3,
  Shape,
  className,
}) => {
  const shapeRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      gsap.from("path", {
        duration,
        drawSVG: "0%",
        ease: "power2.in",
      });
    },
    { scope: shapeRef }
  );

  return (
    <div>
      <Shape className={className} ref={shapeRef} />
    </div>
  );
};

export default BrushIntro;
