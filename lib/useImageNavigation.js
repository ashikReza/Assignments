/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";

const useImageNavigation = (totalImages) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigateImage = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    } else if (direction === "prev") {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
      );
    }
  };

  return { currentImageIndex, navigateImage };
};

export default useImageNavigation;
