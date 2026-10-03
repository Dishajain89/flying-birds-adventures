"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiSun,
  FiZap,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";

import styles from "./OnedayCards.module.scss";

export default function OnedayCards({ trips = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto switch showcase every 4.5 seconds
  useEffect(() => {
    if (!trips.length) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % trips.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [trips.length]);

  // Reset active index if data changes
  useEffect(() => {
    if (activeIdx >= trips.length) {
      setActiveIdx(0);
    }
  }, [activeIdx, trips.length]);

  if (!trips.length) return null;

  const activeSpot = trips[activeIdx] || trips[0];

  return (
    <section className={styles.cardsSection} id="oneday-cards">
      {/* Background Atmosphere */}
      <div className={styles.ambientGoldCore} />
      <div className={styles.bgGridCanvas} />

      <div className={styles.container}>
        {/* Header Block */}
        <div className={styles.headerBlock}>
          <div className={styles.pillBadge}>
            <FiZap className={styles.zapIcon} />
            <span>INDORE WEEKEND CLUB</span>
          </div>

          <h1 className={styles.title}>
            Zero Planning. <br />
            <span className={styles.gradientText}>
              Pure Sunday Escapes.
            </span>
          </h1>

          <p className={styles.subtitle}>
            Hit snooze on Monday anxiety. Jump into raw waterfalls, misty
            palaces, and riverside trails just outside the city.
          </p>
        </div>

        {/* Dynamic Cards Stage */}
        <div className={styles.stageWrapper}>
          {/* Main Feature Highlight Card */}
          <div className={styles.featuredCard}>
            {activeSpot.image && (
              <Image
                key={activeSpot.id}
                src={activeSpot.image}
                alt={activeSpot.name || "One Day Trip"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 650px"
                className={styles.featuredImg}
              />
            )}

            <div className={styles.cardOverlay} />

            {/* Top Pass Header */}
            <div className={styles.ticketTop}>
              <div className={styles.ticketBadge}>
                <FiSun />
                <span>SUNDAY EXPEDITION PASS</span>
              </div>

              <span className={styles.originTag}>
                DEPARTING FROM INDORE
              </span>
            </div>

            {/* Bottom Floating Info */}
            <div className={styles.ticketBottom}>
              <div className={styles.metaRow}>
                <span className={styles.spotCategory}>
                  {activeSpot.badge || activeSpot.state}
                </span>
              </div>

              <h2 className={styles.spotName}>
                {activeSpot.name}
              </h2>

              <div className={styles.spotMeta}>
                <span className={styles.driveBadge}>
                  <FiClock />
                  {activeSpot.duration}
                </span>

                <span className={styles.priceBadge}>
                  Starting from{" "}
                  <strong>₹{activeSpot.price}</strong>
                </span>

                <Link
                  href={`/packages/${activeSpot.slug || activeSpot.id}`}
                  className={styles.exploreLink}
                >
                  <span>View Details</span>
                  <FiArrowUpRight />
                </Link>
              </div>
            </div>

            <div className={styles.cardBorderGlow} />
          </div>

          {/* Interactive Satellite Cards */}
          <div className={styles.satelliteCardsWrapper}>
            {trips.map((spot, idx) => {
              const isActive = activeIdx === idx;

              return (
                <button
                  key={spot.id || idx}
                  className={`${styles.satelliteCard} ${
                    isActive ? styles.activeCard : ""
                  }`}
                  onClick={() => setActiveIdx(idx)}
                  type="button"
                >
                  <div className={styles.thumbnailWrap}>
                    {spot.image && (
                      <Image
                        src={spot.image}
                        alt={spot.name || "One Day Trip"}
                        fill
                        sizes="80px"
                        className={styles.thumbnailImg}
                      />
                    )}
                  </div>

                  <div className={styles.cardText}>
                    <strong>{spot.name}</strong>

                    <div className={styles.subMeta}>
                      <span>₹{spot.price}</span>
                      <small>• {spot.duration}</small>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.bottomShadowFog} />
    </section>
  );
}