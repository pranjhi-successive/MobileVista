import React, { useEffect, useState } from "react";
const Slideshow = () => {
  const [currentslide, setCurrentslide] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [userinterval, setUserInterval] = useState(2000);
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
    "/images/10.jpg",
  ];
  useEffect(() => {
    let time;
    if (isPlay) {
      time = setInterval(() => {
        if (currentslide === images.length - 1) {
          setCurrentslide(0);
        } else {
          setCurrentslide(currentslide + 1);
        }
      }, userinterval);
    } else {
      clearInterval(time);
    }
    return () => {
      clearInterval(time);
    };
  }, [currentslide, isPlay, userinterval, images.length]);
  return (
    <div   style={{
      position: "relative",
      // maxWidth: "900px",
      margin: "auto",
    }}>
      <div style={{ display: "flex" }}>
        <img
          style={{ height: 860, width: 1650 }}
          src={images[currentslide]}
          alt={`Slide  $ {currentslide}`}
        />
      </div>
      <div className="controls">
        <div>
        </div>
      </div>
    </div>
  );
};
export default Slideshow;