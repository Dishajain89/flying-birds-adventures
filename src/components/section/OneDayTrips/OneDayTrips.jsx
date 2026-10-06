"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./OneDayTrips.module.scss";

export default function OneDayTrips({ trips = [] }) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.glowRadial} />

      <div className={styles.container}>
        {/* Header & Slider Navigation Controls */}
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <span className={styles.tagline}>
              ⚡ WEEKEND GETAWAYS FROM INDORE
            </span>

            <h2 className={styles.title}>
              One Day Adventure Treks
            </h2>

            <p className={styles.subtitle}>
              Escape the city rush with our curated 1-day Sunday treks and
              heritage tours. Pickup & drop from Indore included.
            </p>
          </div>

          <div className={styles.navControls}>
            <button
              ref={(node) => setPrevEl(node)}
              className={`${styles.navBtn} ${styles.prevBtn}`}
              aria-label="Previous Slide"
              type="button"
            >
              <FiChevronLeft />
            </button>

            <button
              ref={(node) => setNextEl(node)}
              className={`${styles.navBtn} ${styles.nextBtn}`}
              aria-label="Next Slide"
              type="button"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            speed={700}
            grabCursor={false}
            loop={trips.length > 3}
            loopAdditionalSlides={2}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: `.${styles.customPagination}`,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
            }}
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
               0: {
                  slidesPerView: 1.15, // Mobile screen: 2 cards poore + agle ka sneak peek
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 1.3,
                  spaceBetween: 12,
                },
              640: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              900: {
                slidesPerView: 2.3,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3.2,
                spaceBetween: 28,
              },
            }}
            className={styles.swiperContainer}
          >
            {trips.map((trip) => {
              const tripSlug = trip.slug?.current || trip.slug || trip.id;

              return (
                <SwiperSlide key={trip.id || trip._id} className={styles.swiperSlide}>
                  {/* Poora Card ab ek Next.js Link hai */}
                  <Link
                    href={`/packages/${tripSlug}`}
                    className={styles.card}
                  >
                    {/* Full Edge-to-Edge Image Canvas */}
                    <div className={styles.imageBackdrop}>
                      {trip.image && (
                        <Image
                          src={trip.image}
                          alt={trip.name || "Adventure"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={styles.bgImage}
                        />
                      )}
                      <div className={styles.gradientOverlay} />
                    </div>

                    {/* Top Badges */}
                    <div className={styles.cardHeader}>
                      {trip.badge && (
                        <span className={styles.badge}>{trip.badge}</span>
                      )}
                    </div>

                    {/* Card Content Floating Over Bottom Gradient */}
                    <div className={styles.cardBody}>
                      {trip.state && (
                        <div className={styles.locationMeta}>
                          <FiMapPin className={styles.pinIcon} />
                          <span>{trip.state}</span>
                        </div>
                      )}

                      <h3 className={styles.cardTitle}>{trip.name}</h3>

                      {trip.duration && (
                        <div className={styles.durationRow}>
                          <FiClock className={styles.clockIcon} />
                          <span>{trip.duration}</span>
                        </div>
                      )}

                      {/* Footer Row */}
                      <div className={styles.cardFooter}>
                        <div className={styles.priceContainer}>
                          <span className={styles.priceLabel}>Starting from</span>
                          <div className={styles.priceValue}>
                            ₹{trip.price || 0} <small>/ person</small>
                          </div>
                        </div>

                        <div className={styles.actionBtn}>
                          <span>View Details</span>
                          <FiArrowRight className={styles.arrowIcon} />
                        </div>
                      </div>
                    </div>

                    <div className={styles.glowBorder} />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className={styles.customPagination} />
        </div>
      </div>
    </section>
  );
}