import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

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

  gsap.registerPlugin(DrawSVGPlugin);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shapeRef.current) {
        gsap.from(shapeRef.current.querySelectorAll("path"), {
          duration,
          drawSVG: "0%",
          ease: "power2.inOut",
          immediateRender: false,
        });
      }
    }, shapeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <Shape className={className} ref={shapeRef} />
    </div>
  );
};

export default BrushIntro;
