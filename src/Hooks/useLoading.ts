import { useEffect, useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "auto";
      }, 1000);
    };

    // If the page is already loaded, call handler
    if (document.readyState === "complete") {
      setLoading(false);
      document.body.style.overflow = "auto";
    } else {
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  return loading;
};

export default useLoading;
