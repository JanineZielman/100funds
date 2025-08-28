'use client'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactSlick from "react-slick";

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

const Slider: FC<SliderProps> = ({ slice }) => {
  // console.log(slice.primary.slides_to_show)
  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slice.primary.slides_to_show ? slice.primary.slides_to_show : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${styles.slider} slides-${slice.primary.slides_to_show}`}
    >
      <ReactSlick {...settings}>
        {slice.primary.slides.map((item, i) => (
          <div key={i} className={styles.slide}>
            <PrismicNextImage field={item.image} />
            {item.caption &&
              <div className={styles.caption}>
                <PrismicRichText field={item.caption}/>
              </div>
            }
          </div>
        ))}
      </ReactSlick>
    </section>
  );
};

export default Slider;