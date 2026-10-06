"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FiGlobe,
  FiClock,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./InternationalTrips.module.scss";

export default function InternationalTrips({ trips = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!trips.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header Section */}
        <div className={styles.headerWrapper}>
          <div className={styles.header}>

            <span className={styles.tagline}>
              ✈️ PASSPORT TO ADVENTURE
            </span>

            <h2 className={styles.title}>
              International Destinations
            </h2>

            <p className={styles.subtitle}>
              Go beyond borders. Curated global journeys with seamless
              visas, premium stays, and guided explorations.
            </p>

          </div>

          <div className={styles.navControls}>

            <button
              ref={prevRef}
              className={`${styles.navBtn} ${styles.prevBtn}`}
              aria-label="Previous International Destination"
            >
              <FiChevronLeft />
            </button>

            <button
              ref={nextRef}
              className={`${styles.navBtn} ${styles.nextBtn}`}
              aria-label="Next International Destination"
            >
              <FiChevronRight />
            </button>

          </div>
        </div>

        {/* 3D Depth Curve Swiper Slider */}
        <div className={styles.sliderWrapper}>

          <Swiper
            modules={[
              EffectCoverflow,
              Navigation,
              Pagination,
              Autoplay,
            ]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={trips.length > 3}
            loopAdditionalSlides={2}
            speed={900}

            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 140,
              modifier: 1,
              slideShadows: false,
            }}

            pagination={{
              clickable: true,
              el: `.${styles.customPagination}`,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
            }}

            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}

            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}

            breakpoints={{
              320: {
                slidesPerView: 1.15,
                spaceBetween: 10,
              },

              640: {
                slidesPerView: 1.8,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 2.8,
                spaceBetween: 25,
              },

              1280: {
                slidesPerView: 3.4,
                spaceBetween: 30,
              },
            }}

            className={styles.swiperContainer}
          >

            {trips.slice(0, 6).map((trip) => (

              <SwiperSlide
                key={trip.id}
                className={styles.swiperSlide}
              >

                <div className={styles.card}>

                  {/* Background Image */}
                  {trip.image && (
                    <Image
                      src={trip.image}
                      alt={trip.name}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                      className={styles.bgImage}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className={styles.gradientOverlay} />

                  {/* Top Badge */}
                  <div className={styles.topRow}>

                    {trip.badge && (
                      <span className={styles.badge}>
                        {trip.badge}
                      </span>
                    )}

                  </div>

                  {/* Floating Glassmorphic Details Card */}
                  <div className={styles.floatingGlass}>

                    <div className={styles.countryTag}>
                      <FiGlobe className={styles.globeIcon} />

                      <span>
                        {trip.country}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>
                      {trip.name}
                    </h3>

                    <div className={styles.metaInfo}>

                      <span className={styles.duration}>
                        <FiClock className={styles.icon} />

                        {trip.duration}
                      </span>

                    </div>

                    <div className={styles.footerRow}>

                      <div className={styles.priceBox}>

                        <small>
                          Starting from
                        </small>

                        <div className={styles.amount}>
                          ₹{trip.price}

                          <span>
                            / person
                          </span>
                        </div>

                      </div>

                      <Link
                        href={`/packages/${trip.slug}`}
                        className={styles.exploreBtn}
                      >
                        <span>
                          Explore
                        </span>

                        <FiArrowUpRight
                          className={styles.arrowIcon}
                        />
                      </Link>

                    </div>

                  </div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

          <div className={styles.customPagination} />

        </div>
      </div>
    </section>
  );
}