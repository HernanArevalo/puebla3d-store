'use client';

import { useState } from 'react';

import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#55555',
            '--swiper-pagination-color': '#55555',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 4000,
          stopOnLastSlide: true,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 max-h-160"
      >
        {images.length > 0 ? (
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={1024}
                height={800}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <ProductImage
              alt={title}
              width={1024}
              height={800}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        )}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.length > 0 ? (
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={300}
                height={300}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <ProductImage
              alt={title}
              width={300}
              height={300}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
