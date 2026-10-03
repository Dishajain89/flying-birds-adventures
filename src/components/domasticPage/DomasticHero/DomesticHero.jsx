'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiMapPin, FiCompass } from 'react-icons/fi';
import gsap from 'gsap';
import styles from './DomesticHero.module.scss';

const SHARDS_DATA = [
  {
    id: 'Manali',
    name: 'Manali',
    state: 'Himachal',
    image: '/images/manali.jpg',
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    image: '/images/goa.jpg',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    image: '/images/udaipur.jpg',
  },
  {
    id: 'kerela',
    name: 'Kerala',
    state: 'Kerala',
    image: '/images/kerela.jpg',
  },
  {
    id: 'Kashmir',
    name: 'Kashmir',
    state: 'Jammu and Kashmir',
    image: '/images/kashmir.jpg',
  },
];

export default function DomesticHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  // Auto-Slideshow (crossfades background every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SHARDS_DATA.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    SHARDS_DATA.forEach((shard, idx) => {
      gsap.to(`.shard-item-${idx}`, {
        x: xPos * shard.depth,
        y: yPos * shard.depth,
        rotationY: xPos * 6,
        rotationX: -yPos * 6,
        ease: 'power2.out',
        duration: 0.7,
      });
    });
  };

  return (
    <section
      className={styles.heroSection}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* 1. Fullscreen Crossfade Background Canvas */}
      <div className={styles.bgCanvas}>
        {SHARDS_DATA.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles.bgSlide} ${idx === activeIdx ? styles.activeBgSlide : ''}`}
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

        {/* Ambient Dark Overlay & Glow Gradients */}
        <div className={styles.darkGradient} />
        <div className={styles.radialGlow} />
        <div className={styles.bottomFog} />
      </div>

      {/* 2. Large Watermark Outline */}
      <div className={styles.bgWatermark}>EXPLORE INDIA</div>

      {/* 3. Center Punchline & Active Indicator */}
      <div className={styles.centerContent}>
        <div className={styles.brandBadge}>
          <span className={styles.eagleIcon}>🦅</span>
          <span>FLYING BIRDS ADVENTURE</span>
        </div>

        <h1 className={styles.title}>
          Uncharted Trails. <br />
          <span className={styles.highlightText}>Raw Incredible India.</span>
        </h1>

        <p className={styles.subtitle}>
          Summits to rivers • Monasteries to sand dunes • Curated youth expeditions
        </p>

        {/* Active Destination Pill */}
        <div className={styles.activePill}>
          <FiCompass className={styles.compassIcon} />
          <span>Currently Exploring:</span>
          <strong>{SHARDS_DATA[activeIdx].name} ({SHARDS_DATA[activeIdx].state})</strong>
        </div>
      </div>

      {/* 4. Flanked Perspective Shard Cards (Safe from Navbar) */}
      <div className={styles.shardsContainer}>
        {SHARDS_DATA.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={item.id}
              className={`${styles.shard} ${styles[`shardSlot${idx + 1}`]} ${
                isActive ? styles.activeShard : ''
              } shard-item-${idx}`}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
            >
              <div className={styles.cardInner}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className={styles.shardImg}
                  priority={idx < 2}
                />
                <div className={styles.overlay} />

                <div className={styles.shardInfo}>
                  <span className={styles.stateTag}>
                    <FiMapPin /> {item.state}
                  </span>
                  <h3 className={styles.placeName}>{item.name}</h3>
                </div>

                {/* Glowing Outline on Active */}
                {isActive && <div className={styles.activeBorderGlow} />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}