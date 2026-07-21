'use client';

import React, { useEffect, useRef } from 'react';
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { initHeroAnimations, animateCounters } from './HeroAnimation';
import styles from './Hero.module.scss';

export default function Hero() {
  const heroRef = useRef(null);
  const cloudsRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const searchRef = useRef(null);
  const statsRef = useRef(null);
  const scrollRef = useRef(null);

  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  useEffect(() => {
    // Initialize GSAP Entrance Timeline
    initHeroAnimations({
      heroRef,
      cloudsRef,
      badgeRef,
      headingRef,
      descRef,
      ctaRef,
      searchRef,
      statsRef,
      scrollRef,
    });

    // Trigger Animated Counters
    animateCounters([
      { ref: stat1Ref, endValue: 5000 },
      { ref: stat2Ref, endValue: 120 },
      { ref: stat3Ref, endValue: 4 },
    ]);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Layer 1: Background Video */}
      <div className={styles.videoWrapper}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.bgVideo}
          src="/videos/hero.mp4"
        />
      </div>

      {/* Layer 2: Dark Overlay Gradient */}
      <div className={styles.darkOverlay} />

      {/* Layer 3: Moving Cloud Layers */}
      <div className={styles.cloudLayer} ref={cloudsRef}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
      </div>

      {/* Layer 4: Sun Glow Layer */}
      <div className={styles.sunGlow} />

      {/* Continuous Animated Flying Bird */}
      <div className={styles.birdWrapper}>
        <img
          src="/images/eagle.png"
          alt="Flying Bird"
          className={styles.flyingBird}
        />
      </div>

      {/* Layer 5: Hero Main Content */}
      <div className={styles.container}>
        {/* Brand Badge */}
        <div className={styles.badge} ref={badgeRef}>
          <span className={styles.badgeIcon}>🦅</span>
          <span>Trusted Adventure Company</span>
        </div>

        {/* Headings */}
        <h1 className={styles.heading} ref={headingRef}>
          Fly Beyond Limits
          <span className={styles.subHeading}>Discover Incredible India</span>
        </h1>

        {/* Description */}
        <p className={styles.description} ref={descRef}>
          Experience breathtaking destinations, weekend getaways, and
          unforgettable adventures with Flying Birds Adventure.
        </p>

        {/* Action Buttons */}
        <div className={styles.ctaGroup} ref={ctaRef}>
          <button className={styles.primaryCta}>
            Explore Packages
          </button>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            <FaWhatsapp className={styles.waIcon} />
            Plan My Trip
          </a>
        </div>

        {/* Premium Floating Glass Card Searchbar */}
        <div className={styles.glassSearchCard} ref={searchRef}>
          <div className={styles.searchField}>
            <FiMapPin className={styles.fieldIcon} />
            <div className={styles.fieldInputGroup}>
              <label>Destination</label>
              <input type="text" placeholder="Where to go?" />
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.searchField}>
            <FiCalendar className={styles.fieldIcon} />
            <div className={styles.fieldInputGroup}>
              <label>Duration</label>
              <input type="text" placeholder="How many days?" />
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.searchField}>
            <FiUsers className={styles.fieldIcon} />
            <div className={styles.fieldInputGroup}>
              <label>Travelers</label>
              <input type="text" placeholder="Add guests" />
            </div>
          </div>

          <button className={styles.searchButton}>
            <FiSearch />
            <span>Search</span>
          </button>
        </div>

        {/* Stats Counter Bar */}
        <div className={styles.statsContainer} ref={statsRef}>
          <div className={styles.statItem}>
            <h3>
              <span ref={stat1Ref}>0</span>+
            </h3>
            <p>Happy Travelers</p>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statItem}>
            <h3>
              <span ref={stat2Ref}>0</span>+
            </h3>
            <p>Trips Completed</p>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statItem}>
            <h3>
              <span ref={stat3Ref}>0</span>★
            </h3>
            <p>Google Rating</p>
          </div>
        </div>
      </div>

      {/* Layer 6: Animated Mouse Scroll Indicator */}
      {/* <div className={styles.scrollIndicator} ref={scrollRef}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div> */}
    </section>
  );
}