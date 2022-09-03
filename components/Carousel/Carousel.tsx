import classNames from "classnames";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import React, { ReactElement, useRef } from "react";
import Slider from "react-slick";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  children?: any;
  responsive?: { [key: string]: number };
  isShow?: boolean;
  className?: string;
  isMicrosite?: boolean;
}

const Carousel = (props: CarouselProps) => {
  const { children, responsive, className, isShow = true, isMicrosite } = props;

  const horizontalSliderRef = useRef<any>(null);

  const horizontalSliderSettings = {
    className: styles.slick_slide,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: responsive?.show,
    slidesToScroll: responsive?.scroll,
    adaptiveHeight: true,
    center: true,
    cssEase: "linear",

    responsive: [
      //2xl
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: responsive?.xxlShow,
          slidesToScroll: responsive?.xxlScroll,
        },
      },
      //xl
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: responsive?.xlShow,
          slidesToScroll: responsive?.xlScroll,
        },
      },
      //lg
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: responsive?.lgShow,
          slidesToScroll: responsive?.lgScroll,
        },
      },
      //md
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: responsive?.mdShow,
          slidesToScroll: responsive?.mdScroll,
        },
      },
      //sm
      {
        breakpoint: 600,
        settings: {
          slidesToShow: responsive?.smShow,
          slidesToScroll: responsive?.smScroll,
        },
      },
      //xs
      {
        breakpoint: 480,
        settings: {
          slidesToShow: responsive?.xsShow,
          slidesToScroll: responsive?.xsScroll,
        },
      },
    ],
  };

  function handlePrevHorizontalSlide() {
    if (horizontalSliderRef && horizontalSliderRef.current) {
      horizontalSliderRef.current.slickPrev();
    }
  }

  function handleNextHorizontalSlide() {
    if (horizontalSliderRef && horizontalSliderRef.current) {
      horizontalSliderRef.current.slickNext();
    }
  }
  if (!isShow) {
    return <div />;
  }

  const carouselClass = classNames(
    className,
    styles.carousel,
    isMicrosite && styles.special
  );

  return (
    <div className={carouselClass}>
      <div onClick={handlePrevHorizontalSlide} className={styles.btn_prev}>
        <Icon icon="carret-left" size={20} />
      </div>
      <Slider ref={horizontalSliderRef} {...horizontalSliderSettings}>
        {children}
      </Slider>
      <div onClick={handleNextHorizontalSlide} className={styles.btn_next}>
        <Icon icon="carret-right" size={20} />
      </div>
    </div>
  );
};

export default Carousel;
