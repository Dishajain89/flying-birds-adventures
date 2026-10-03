'use client';

import React, { useEffect, useRef } from 'react';
import { FiGlobe, FiAward, FiHeart, FiCheckCircle, FiShield } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Achievements.module.scss';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    id: 'trips',
    number: '10K+',
    target: 10,
    unit: 'K+',
    title: 'Trips Managed',
    desc: 'Thousands of experiences handled smoothly with great feedback from travelers.',
    icon: <FiCheckCircle />,
    percentage: '98%',
  },
  {
    id: 'destinations',
    number: '240+',
    target: 240,
    unit: '+',
    title: 'Global Reach',
    desc: 'We’ve connected travelers to over 240+ unique destinations worldwide.',
    icon: <FiGlobe />,
    percentage: '85%',
  },
  {
    id: 'partnerships',
    number: '100+',
    target: 100,
    unit: '+',
    title: 'Community Partnerships',
    desc: 'Over 100 collaborations with local communities and eco-projects.',
    icon: <FiHeart />,
    percentage: '90%',
  },
  {
    id: 'service',
    number: '#1',
    target: 1,
    unit: '',
    title: 'Award-Winning Service',
    desc: 'Recognized by top travel organizations for excellence in customer experience.',
    icon: <FiAward />,
    percentage: '100%',
  },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(`.${styles.header}`, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Progress bars fill animation
      gsap.from(`.${styles.barFill}`, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        stagger: 0.2,
        ease: 'power2.out',
      });

      // Card items stagger
      gsap.from(`.${styles.statRowItem}`, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        
        {/* Top Split Header: Title + Big Milestone Gauge Badge */}
        <div className={styles.topSplit}>
          <div className={styles.header}>
            <span className={styles.tagline}>🦅 PROVEN TRACK RECORD</span>
            <h2 className={styles.title}>Our Impact & Achievements</h2>
            <p className={styles.subtitle}>
              Every trip we organize isn’t just about travel — it’s about creating memories, uplifting communities, and building a more connected world.
            </p>
          </div>

          <div className={styles.heroGaugeWidget}>
            <div className={styles.outerRing}>
              <div className={styles.innerRing}>
                <span className={styles.gaugeVal}>100%</span>
                <span className={styles.gaugeLabel}>Verified Safety Record</span>
              </div>
            </div>
          </div>
        </div>

        {/* HUD Matrix Display (Horizontal Grid with Progress Trackers) */}
        <div className={styles.hudGrid}>
          {STATS.map((item, idx) => (
            <div key={item.id} className={styles.statRowItem}>
              <div className={styles.itemHeader}>
                <div className={styles.iconCircle}>
                  {item.icon}
                </div>
                <div className={styles.bigNumber}>
                  {item.number}
                </div>
              </div>

              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>

              {/* Glowing Interactive Progress Line */}
              <div className={styles.progressTrack}>
                <div 
                  className={styles.barFill} 
                  style={{ width: item.percentage }} 
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}