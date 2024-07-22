import { useEffect, useState } from "react";

export const useDebouncedResize = (delay) => {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    return dimensions;
};
