import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import DomeGallery from "./components/DomeGallery";
import "./components/DomeGallery.css";
import { fetchGalleryImages } from "./lib/fetch-gallery.js";

const DEFAULT_GALLERY_IMAGES = [
  { src: "/assets/gallery/pool-dual.webp", alt: "Swimming pool and jacuzzi courtyard" },
  { src: "/assets/gallery/pool-fountain.webp", alt: "Pool with fountain and lounge area" },
  { src: "/assets/gallery/pool-lounge.webp", alt: "Shaded poolside lounge and bar" },
  { src: "/assets/gallery/aerial-courtyard.webp", alt: "Aerial view of the resort courtyard" },
  { src: "/assets/gallery/terrace-pavilion.webp", alt: "Rooftop terrace pavilion" },
  { src: "/assets/gallery/gazebo-interior.webp", alt: "Wooden gazebo lounge" },
  { src: "/assets/gallery/dining-lounge.webp", alt: "Indoor dining and lounge area" },
  { src: "/assets/gallery/bar-area.webp", alt: "Bar area beside the pool" },
  { src: "/assets/gallery/outdoor-kitchen.webp", alt: "Outdoor kitchen and grill" },
  { src: "/assets/gallery/bathroom.webp", alt: "Modern marble bathroom" },
  { src: "/assets/gallery/bedroom-purple.webp", alt: "Guest bedroom with ambient lighting" },
  { src: "/assets/gallery/bedroom-trundle.webp", alt: "Family room with trundle beds" },
  { src: "/assets/gallery/bedroom-bunk.webp", alt: "Bunk bed room" },
];

function getGalleryLayout() {
  const narrow = window.matchMedia("(max-width: 480px)").matches;
  const mobile = window.matchMedia("(max-width: 720px)").matches;

  if (narrow) {
    return {
      fit: 0.92,
      minRadius: 160,
      maxRadius: 420,
      segments: 16,
      dragSensitivity: 16,
    };
  }

  if (mobile) {
    return {
      fit: 0.88,
      minRadius: 180,
      maxRadius: 480,
      segments: 20,
      dragSensitivity: 18,
    };
  }

  return {
    fit: 0.72,
    minRadius: 240,
    maxRadius: 900,
    segments: 35,
    dragSensitivity: 20,
  };
}

function GalleryApp() {
  const [layout, setLayout] = useState(getGalleryLayout);
  const [images, setImages] = useState(DEFAULT_GALLERY_IMAGES);

  useEffect(() => {
    fetchGalleryImages(DEFAULT_GALLERY_IMAGES).then(setImages);
  }, []);

  useEffect(() => {
    const queries = ["(max-width: 720px)", "(max-width: 480px)"].map((query) =>
      window.matchMedia(query)
    );
    const update = () => setLayout(getGalleryLayout());
    queries.forEach((mq) => mq.addEventListener("change", update));
    window.addEventListener("resize", update);
    return () => {
      queries.forEach((mq) => mq.removeEventListener("change", update));
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <DomeGallery
      images={images}
      {...layout}
      dragDampening={0}
      grayscale={false}
      overlayBlurColor="#f7f3ef"
      openedImageWidth="min(90vw, 480px)"
      openedImageHeight="min(75vh, 560px)"
      imageBorderRadius="16px"
      openedImageBorderRadius="16px"
    />
  );
}

const rootEl = document.getElementById("gallery-dome-root");

if (rootEl) {
  createRoot(rootEl).render(<GalleryApp />);
}
