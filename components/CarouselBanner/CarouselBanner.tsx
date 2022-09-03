import { ReactElement, useRef } from "react";
import Icon from "components/Icon/Icon";
import Slider, { Settings } from "react-slick";
import styles from "./CarouselBanner.module.scss";

interface ICarouselBanner {
  className?: string
  children?: ReactElement | ReactElement[]
  configs?: Settings
}

const CarouselBanner = (props: ICarouselBanner) => {
  const { className, children, configs } = props

  const refCarouselBanner = useRef<Slider>(null);
  const configSlider: Settings = {
    className: styles.slick_slide,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    ...configs
  }

  function handlePrevHorizontalSlide() {    
    if (refCarouselBanner && refCarouselBanner.current) {
      refCarouselBanner?.current.slickPrev();
    }
  }

  function handleNextHorizontalSlide() {
    if (refCarouselBanner && refCarouselBanner.current) {
      refCarouselBanner.current.slickNext();
    }
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div onClick={handlePrevHorizontalSlide} className={styles.btn_prev}>
        <Icon icon="carret-left" size={20} />
      </div>
      <Slider ref={refCarouselBanner} {...configSlider}>
        {children}
      </Slider>
      <div onClick={handleNextHorizontalSlide} className={styles.btn_next}>
        <Icon icon="carret-right" size={20} />
      </div>
    </div>
  )
}

export default CarouselBanner