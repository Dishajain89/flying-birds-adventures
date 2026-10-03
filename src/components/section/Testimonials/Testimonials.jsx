"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiStar,
  FiVolume2,
  FiVolumeX,
  FiMapPin,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaInstagram, FaQuoteLeft } from "react-icons/fa";

import styles from "./Testimonials.module.scss";

export default function Testimonials({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Reset active index if Sanity data changes
  useEffect(() => {
    if (activeIndex >= testimonials.length) {
      setActiveIndex(0);
    }
  }, [testimonials.length, activeIndex]);

  // No testimonials available
  if (!testimonials.length) {
    return null;
  }

  const current = testimonials[activeIndex] || testimonials[0];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

    setIsMuted(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

    setIsMuted(true);
  };

  const handleSelect = (index) => {
    setActiveIndex(index);
    setIsMuted(true);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>
            ✨ STORIES FROM THE TRAIL
          </span>

          <h2 className={styles.title}>
            Real Journeys, Raw Moments
          </h2>

          <p className={styles.subtitle}>
            Experience what traveling with Flying Birds Adventure feels like
            through unscripted traveler reels and reviews.
          </p>
        </div>

        {/* Master Cinema-Stage Layout */}
        <div className={styles.stageGrid}>
          {/* LEFT: Phone-Frame Video Display */}
          <div className={styles.phoneFrameWrapper}>
            <div className={styles.phoneFrame}>
              <div className={styles.notch} />

              {/* Dynamic Video */}
              {current.videoUrl && (
                <video
                  ref={videoRef}
                  key={current.videoUrl}
                  src={current.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className={styles.reelVideo}
                />
              )}

              {/* Glass Top Overlay Info */}
              <div className={styles.videoTopBar}>

                <button
                  className={styles.soundBtn}
                  onClick={toggleSound}
                  aria-label="Toggle Video Sound"
                >
                  {isMuted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
              </div>

              {/* Bottom Tag */}
              <div className={styles.videoBottomBar}>
                {current.location && (
                  <span className={styles.locationBadge}>
                    <FiMapPin /> {current.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Active Traveler Story */}
          <div className={styles.storyContent}>
            <div className={styles.quoteCard}>
              <FaQuoteLeft className={styles.quoteIcon} />

              {/* Star Ratings */}
              <div className={styles.starRating}>
                {[...Array(current.rating || 0)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={styles.star}
                  />
                ))}

                <span className={styles.verifiedTag}>
                  <FiCheckCircle /> Verified Traveler
                </span>
              </div>

              {/* Main Quote Text */}
              <p className={styles.quoteText}>
                {current.quote}
              </p>

              {/* Traveler Identity */}
              <div className={styles.authorSection}>
                <div className={styles.authorInfo}>
                  <h3>{current.name}</h3>
                  <p>{current.trip}</p>
                </div>
              </div>
            </div>

            {/* Traveler Switcher Strip */}
            <div className={styles.selectorWrapper}>
              <div className={styles.selectorTrack}>
                {testimonials.map((item, index) => {
                  const isSelected = activeIndex === index;

                  return (
                    <button
                      key={item.id}
                      className={`${styles.selectItem} ${
                        isSelected ? styles.selectedItem : ""
                      }`}
                      onClick={() => handleSelect(index)}
                    >
                      <div className={styles.selectorText}>
                        <span className={styles.name}>
                          {item.name}
                        </span>

                        <span className={styles.tripName}>
                          {item.trip?.split(" ")[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className={styles.navControls}>
                <button
                  className={styles.navBtn}
                  onClick={handlePrev}
                  aria-label="Previous Story"
                >
                  <FiChevronLeft />
                </button>

                <button
                  className={styles.navBtn}
                  onClick={handleNext}
                  aria-label="Next Story"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

