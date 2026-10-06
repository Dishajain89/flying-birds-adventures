"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMapPin,
  FiClock,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./PopularDestination.module.scss";

const CATEGORIES = [
  { id: "all", label: "All Trips" },
  { id: "weekend", label: "Weekends Trips" },
  { id: "trek", label: "Trek" },
];

const CATEGORY_TITLES = {
  all: "Group",
  weekend: "Weekend",
  trek: "Trek",
};

export default function PopularDestinations({ trips = [] }) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  // Filter States
  const [activeCategory, setActiveCategory] = useState("all");
  const [isInternational, setIsInternational] = useState(false);

  // Dynamic Filtering Logic
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // 1. Domestic vs International Check
      const tripIsIntl =
        trip.isInternational === true ||
        (trip.region && trip.region.toLowerCase().includes("international")) ||
        (trip.tripType && trip.tripType.toLowerCase().includes("international"));

      if (isInternational ? !tripIsIntl : tripIsIntl) {
        return false;
      }

      // 2. Category Tab Check
      if (activeCategory === "all") return true;

      const directCategory = (trip.category || trip.tripType || "").toLowerCase();
      if (directCategory === activeCategory) return true;

      const combinedMeta = `${trip.title || ""} ${trip.name || ""} ${trip.badge || ""}`.toLowerCase();

      if (activeCategory === "weekend") {
        return (
          combinedMeta.includes("weekend") ||
          combinedMeta.includes("sunday") ||
          (trip.duration && (trip.duration.includes("1D") || trip.duration.includes("2D")))
        );
      }

      if (activeCategory === "trek") {
        return (
          combinedMeta.includes("trek") ||
          combinedMeta.includes("hike") ||
          combinedMeta.includes("summit")
        );
      }

      return true;
    });
  }, [trips, activeCategory, isInternational]);

  return (
    <section className={styles.section} id="popular-destinations">
      <div className={styles.glowRadial} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <div className={styles.tagBadge}>
              <FiCompass className={styles.tagIcon} />
              <span>EXPLORE INDIA&apos;S BEST</span>
            </div>

            <h2 className={styles.title}>
              {CATEGORY_TITLES[activeCategory] || "Group"}{" "}
              <span className={styles.titleHighlight}>Trips</span>
            </h2>

            <p className={styles.subtitle}>
              Expert-curated, locally approved travel guides and unforgettable adventures with like-minded travellers.
            </p>
          </div>

          {/* Navigation Arrows */}
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

        {/* Filter Controls */}
        <div className={styles.filterBar}>
          <div className={styles.tabsList}>
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tabBtn} ${
                  activeCategory === tab.id ? styles.activeTab : ""
                }`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.toggleWrapper}>
            <span className={styles.toggleLabel}>
              {isInternational ? "International" : "Domestic"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isInternational}
              className={`${styles.switchBtn} ${
                isInternational ? styles.switchActive : ""
              }`}
              onClick={() => setIsInternational(!isInternational)}
            >
              <span className={styles.switchHandle} />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className={styles.sliderWrapper}>
          {filteredTrips.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No trips currently scheduled under this category.</p>
            </div>
          ) : (
            <Swiper
              key={`${activeCategory}-${isInternational}`}
              modules={[Navigation, Pagination, Autoplay]}
              grabCursor={false}
              simulateTouch={true}
              touchStartPreventDefault={false}
              loop={filteredTrips.length > 3}
              loopAdditionalSlides={2}
              speed={600}
              autoplay={{
                delay: 3500,
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
                  slidesPerView: 2.15, // Mobile screen: 2 cards poore + agle ka sneak peek
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2.3,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 2.8,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 3.2,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3.4,
                  spaceBetween: 28,
                },
              }}
              className={styles.swiperContainer}
            >
              {filteredTrips.map((dest, index) => {
                const tripSlug = dest.slug || dest.id;
                const tripPrice = dest.price ?? dest.startingPrice ?? 0;

                return (
                  <SwiperSlide
                    key={dest.id || index}
                    className={styles.swiperSlide}
                  >
                    <Link
                      href={`/packages/${tripSlug}`}
                      className={styles.stageCard}
                    >
                      {/* Image Backdrop */}
                      <div className={styles.imageBackdrop}>
                        {dest.image && (
                          <Image
                            src={dest.image}
                            alt={dest.name || dest.title || "Trip Image"}
                            fill
                            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 25vw"
                            className={styles.bgImg}
                            priority={index < 2}
                          />
                        )}
                        <div className={styles.gradientOverlay} />
                      </div>

                      {/* Header Badge */}
                      <div className={styles.cardHeader}>
                        {dest.badge && (
                          <span className={styles.badge}>{dest.badge}</span>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className={styles.cardBody}>
                        {dest.state && (
                          <div className={styles.locationPill}>
                            <FiMapPin className={styles.pinIcon} />
                            <span>{dest.state}</span>
                          </div>
                        )}

                        <h3 className={styles.cardTitle}>
                          {dest.name || dest.title}
                        </h3>

                        {dest.duration && (
                          <div className={styles.durationRow}>
                            <FiClock className={styles.clockIcon} />
                            <span>{dest.duration}</span>
                          </div>
                        )}

                        <div className={styles.cardFooter}>
                          <div className={styles.priceWrap}>
                            <span className={styles.priceLabel}>Starting from</span>
                            <div className={styles.priceText}>
                              ₹{tripPrice.toLocaleString("en-IN")}
                              <small className={styles.perPerson}>/ person</small>
                            </div>
                          </div>

                          <div className={styles.actionBtn}>
                            <span className={styles.actionText}>Explore</span>
                            <FiArrowUpRight className={styles.arrowIcon} />
                          </div>
                        </div>
                      </div>

                      <div className={styles.glowBorder} />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}

          <div className={styles.customPagination} />
        </div>
      </div>
    </section>
  );
}