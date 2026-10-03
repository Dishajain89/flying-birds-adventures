'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  FiNavigation, 
  FiMapPin, 
  FiArrowUpRight, 
  FiCompass, 
  FiSun,
  FiActivity
} from 'react-icons/fi';
import styles from './OneDayHero.module.scss';

const INDORE_ESCAPE_SHARDS = [
  {
    id: 'mandu',
    title: 'Mandu',
    subtitle: 'Jahaz Mahal & Valley Clouds',
    distance: '85 KM',
    drive: '90 Mins',
    tag: 'Monsoon Heritage',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'chidiya-bhadak',
    title: 'Chidiya Bhadak',
    subtitle: 'Hidden Gorge & Rock Streams',
    distance: '55 KM',
    drive: '60 Mins',
    tag: 'Trek & Waterfalls',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gulawat',
    title: 'Gulawat',
    subtitle: 'Bamboo Canopies & Lotus Lakes',
    distance: '28 KM',
    drive: '40 Mins',
    tag: 'Backwaters & Sunrise',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function OneDayHero() {
  const [activeShard, setActiveShard] = useState(0);

  return (
    <section className={styles.heroSection}>
      {/* Background Topographical & Ambient Radar Glow */}
      <div className={styles.ambientGlow} />
      <div className={styles.topographicRings} />

      {/* Background Giant Typography Watermark */}
      <div className={styles.watermarkText}>MALWA ESCAPES</div>

      <div className={styles.container}>
        {/* Top Radar Bar */}
        <div className={styles.topStatusBar}>
          <div className={styles.originPill}>
            <span className={styles.pulseDot} />
            <FiNavigation className={styles.navIcon} />
            <span>ORIGIN: INDORE (22.7196° N, 75.8577° E)</span>
          </div>

          <div className={styles.indoreVibeTicker}>
            <FiSun className={styles.sunIcon} />
            <span>Morning Poha ➔ Secret Waterfalls ➔ Night Sarafa</span>
          </div>
        </div>

        {/* Central Kinetic Stage */}
        <div className={styles.stageGrid}>
          
          {/* Left Column: Bold Typography & Indore Soul */}
          <div className={styles.contentColumn}>
            <div className={styles.brandBadge}>
              <FiCompass className={styles.badgeCompass} />
              <span>FLYING BIRDS INDORE SQUAD</span>
            </div>

            <h1 className={styles.mainHeadline}>
              Bahar Niklo, <br />
              <span className={styles.goldGradient}>Malwa Tumhara Hai.</span>
            </h1>

            <p className={styles.leadCopy}>
              From the historic heartbeats of Rajwada to roaring mist-kissed canyon waterfalls within an hour&apos;s drive. Packed breakfast, certified leads, raw nature — return before dinner.
            </p>

            {/* Quick Live Stats Pill */}
            <div className={styles.quickMetrics}>
              <div className={styles.metricItem}>
                <strong>&lt; 90 Min</strong>
                <small>Average Drive</small>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <strong>Every Sun</strong>
                <small>Fixed Departures</small>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <strong>Indore City</strong>
                <small>Central Pickups</small>
              </div>
            </div>

            <div className={styles.actionRow}>
              <a href="#oneday-cards" className={styles.primaryCta}>
                <span>Explore Sunday Departures</span>
                <FiArrowUpRight className={styles.arrowIcon} />
              </a>
              <div className={styles.liveSeatPulse}>
                <FiActivity />
                <span>Next Weekend Seats Filling</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Layered Glass Shards (Interactive Showcase) */}
          <div className={styles.shardsColumn}>
            <div className={styles.shardsCluster}>
              {INDORE_ESCAPE_SHARDS.map((shard, idx) => {
                const isActive = activeShard === idx;
                return (
                  <div
                    key={shard.id}
                    className={`${styles.shardBlade} ${styles[`blade${idx}`]} ${
                      isActive ? styles.bladeActive : ''
                    }`}
                    onMouseEnter={() => setActiveShard(idx)}
                    onClick={() => setActiveShard(idx)}
                  >
                    <Image
                      src={shard.image}
                      alt={shard.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 360px"
                      className={styles.shardImg}
                      priority={idx === 0}
                    />
                    <div className={styles.shardOverlay} />

                    {/* Shard Meta Header */}
                    <div className={styles.shardTop}>
                      <span className={styles.shardTag}>{shard.tag}</span>
                      <span className={styles.shardDistance}>
                        <FiMapPin /> {shard.distance}
                      </span>
                    </div>

                    {/* Shard Bottom Details */}
                    <div className={styles.shardBottom}>
                      <small>{shard.drive} from Indore</small>
                      <h3>{shard.title}</h3>
                      <p>{shard.subtitle}</p>
                    </div>

                    {/* Interactive Active Border Rim */}
                    {isActive && <div className={styles.activeBorderGlow} />}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <div className={styles.bottomShadowFog} />
    </section>
  );
}