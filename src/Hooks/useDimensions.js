import { useEffect } from "react";
import { useState } from "react";

const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function updateDimensions() {
      const { innerHeight, innerWidth } = window;
      setDimensions({ width: innerWidth, height: innerHeight });
    }
    window.addEventListener("resize", updateDimensions);
    updateDimensions()
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
};
export default useDimensions;
