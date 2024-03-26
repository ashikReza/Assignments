/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";

const useImageNavigation = (totalImages) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigateImage = (action, index) => {
    if (action === "prev") {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
      );
    } else if (action === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    } else if (action === "set") {
      setCurrentImageIndex(index);
    }
  };

  return { currentImageIndex, navigateImage };
};

export default useImageNavigation;
