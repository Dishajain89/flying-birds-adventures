'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { initHeroAnimations, animateCounters } from './HeroAnimation';
import styles from './Hero.module.scss';

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

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

    animateCounters([
      { ref: stat1Ref, endValue: 30000 },
      { ref: stat2Ref, endValue: 500 },
      { ref: stat3Ref, endValue: 5 },
    ]);
  }, []);

  const handleScrollToDestinations = () => {
    const targetSection = document.getElementById('popular-destinations');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Search Submit Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = searchTerm.trim().toLowerCase();
    if (!cleanQuery) return;

    // Direct slug route par redirect karega
    const slug = cleanQuery.replace(/\s+/g, '-');
    router.push(`/packages/${slug}`);
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.videoWrapper}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.bgVideo}
          src="/videos/hero1.mp4"
        />
      </div>

      <div className={styles.darkOverlay} />

      <div className={styles.cloudLayer} ref={cloudsRef}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
      </div>

      <div className={styles.sunGlow} />

      <div className={styles.birdWrapper}>
        <img
          src="/images/eagle-flying.gif"
          alt="Flying Bird"
          className={styles.flyingBird}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.badge} ref={badgeRef}>
          <span className={styles.badgeIcon}>🦅</span>
          <span>Trusted Adventure Company</span>
        </div>

        <h1 className={styles.heading} ref={headingRef}>
          Fly with the <br /> <span className={styles.subHeading}>Adventures</span>
        </h1>

        <p className={styles.description} ref={descRef}>
          Where every destination becomes a memory with Flying Birds Adventure.
        </p>

        {/* Action Buttons: Mobile par bhi row layout rakhenge */}
        <div className={styles.ctaGroup} ref={ctaRef}>
          <button 
            type="button" 
            className={styles.primaryCta}
            onClick={handleScrollToDestinations}
          >
            Explore Packages
          </button>
          <a
            href="https://wa.me/919977995057"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            <FaWhatsapp className={styles.waIcon} />
            Plan My Trip
          </a>
        </div>

        {/* Desktop Searchbar: Mobile par hide ho jayega kyunki wo Navbar me shift ho gaya hai */}
        <form 
          className={styles.glassSearchCard} 
          ref={searchRef}
          onSubmit={handleSearchSubmit}
        >
          <div className={styles.searchField}>
            <FiMapPin className={styles.fieldIcon} />
            <div className={styles.fieldInputGroup}>
              <label>Destination</label>
              <input
                type="text"
                placeholder="Search Goa, Manali, Kashmir..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.searchButton}>
            <FiSearch />
            <span>Search</span>
          </button>
        </form>

        {/* Stats Counter Bar: Mobile par bhi horizontal inline flex rakha hai */}
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
    </section>
  );
}