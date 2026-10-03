'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiCompass, FiBookmark } from 'react-icons/fi';
import styles from './InternationalHero.module.scss';

const DESTINATIONS = [
  {
    id: 'bali',
    slug: 'bali',
    country: 'Indonesia',
    name: 'BALI',
    desc: 'Emerald rice terraces, dramatic ocean cliffs at Nusa Penida, sacred water temples, and the ultimate island sunsets.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80',
    tag: 'Island Paradise',
  },
  {
    id: 'thailand',
    slug: 'thailand',
    country: 'Thailand',
    name: 'PHUKET & KRABI',
    desc: 'Limestone karsts rising from turquoise waters, vibrant night bazaars, and longtail boat adventures.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80',
    tag: 'Tropical Escape',
  },
  {
    id: 'vietnam',
    slug: 'vietnam',
    country: 'Vietnam',
    name: 'HALONG BAY',
    desc: 'Cruising through thousand misty islands, glowing lantern streets in Hoi An, and rich culinary backstreets.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
    tag: 'Scenic & Culture',
  },
  {
    id: 'dubai',
    slug: 'dubai',
    country: 'UAE',
    name: 'DUBAI',
    desc: 'Golden dune bashing at sunset, futuristic skyline architecture, and luxury Arabian desert camps.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
    tag: 'Desert Luxury',
  },
  {
    id: 'georgia',
    slug: 'georgia',
    name: 'KAZBEGI',
    desc: 'Snow-clad Caucasus mountain ranges, ancient cliffside churches, and warm Eurasian hospitality.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1920&q=80',
    tag: 'European Alps Trail',
  },
];

export default function InternationalHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
  };

  const activeTrip = DESTINATIONS[currentIndex];

  // Prepare upcoming cards array for the right slider
  const nextCards = [];
  for (let i = 1; i < DESTINATIONS.length; i++) {
    const index = (currentIndex + i) % DESTINATIONS.length;
    nextCards.push({ ...DESTINATIONS[index], originalIndex: index });
  }

  return (
    <section className={styles.heroSection}>
      {/* 1. Fullscreen Background Image Crossfade */}
      <div className={styles.bgWrapper}>
        {DESTINATIONS.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles.bgSlide} ${idx === currentIndex ? styles.activeBg : ''}`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={styles.bgImg}
            />
          </div>
        ))}
        <div className={styles.vignetteOverlay} />
        <div className={styles.gradientLeft} />
        <div className={styles.bottomFog} />
      </div>

      <div className={styles.container}>
        {/* Main Content Grid (Left Info + Right Slider Cards) */}
        <div className={styles.mainGrid}>
          
          {/* LEFT: Active Destination Information */}
          <div className={styles.leftContent}>
            <div className={styles.countryBadge}>
              <FiCompass className={styles.compassIcon} />
              <span>{activeTrip.country}</span>
            </div>

            <h1 className={styles.title}>{activeTrip.name}</h1>
            <p className={styles.description}>{activeTrip.desc}</p>

            <div className={styles.actionRow}>
              <Link href={`/packages/${activeTrip.slug}`} className={styles.exploreBtn}>
                <span>Explore</span>
                <FiArrowRight className={styles.arrow} />
              </Link>
            </div>
          </div>

          {/* RIGHT: Floating Upcoming Slider Cards */}
          <div className={styles.rightSlider}>
            <div className={styles.cardsTrack}>
              {nextCards.map((card) => (
                <div
                  key={card.id}
                  className={styles.previewCard}
                  onClick={() => setCurrentIndex(card.originalIndex)}
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    sizes="280px"
                    className={styles.previewImg}
                  />
                  <div className={styles.cardOverlay} />

                  {/* <button className={styles.bookmarkBtn} aria-label="Bookmark">
                    <FiBookmark />
                  </button> */}

                  <div className={styles.cardInfo}>
                    <span className={styles.cardCountry}>{card.country}</span>
                    <h4 className={styles.cardName}>{card.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Pagination & Slide Navigation Arrows */}
        <div className={styles.bottomControls}>
          <div className={styles.counter}>
            <strong>0{currentIndex + 1}</strong>
            <span>/ 0{DESTINATIONS.length}</span>
          </div>

          <div className={styles.navBtns}>
            <button onClick={handlePrev} className={styles.navBtn} aria-label="Previous destination">
              <FiArrowLeft />
            </button>
            <button onClick={handleNext} className={styles.navBtn} aria-label="Next destination">
              <FiArrowRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}