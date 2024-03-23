"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import ProductSection from "@/components/ProductSection";
import Hero from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSection />
      <Footer />
    </>
  );
}
