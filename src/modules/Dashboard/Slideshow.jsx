import React from "react";
import { Carousel } from "../../components";

const images = [
  "/images/4.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/5.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
];

const Slideshow = () => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "#4285f4",
          fontSize: "2.5em",
          margin: "20px 0",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          background: "#f0f8ff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        MOBILE VIESTA
      </h1>
      <div className="video-background">
        <Carousel
          autoplay
          autoplaySpeed={1000}
          data-testid="slideshow-carousel"
          pauseOnHover={false}
          dots={false}
          lazyLoad="ondemand"
        >
          {images.map((image) => (
            <div key={image.id}>
              <img
                loading="lazy"
                style={{ height: 920, width: 1835 }}
                src={image}
                alt={`Slide ${image.id}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Slideshow;
