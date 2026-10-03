'use client';

import React, { useEffect, useRef } from 'react';
import { FiShield, FiUserCheck, FiCompass, FiHeart } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyUs.module.scss';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 'guides',
    icon: <FiUserCheck />,
    title: 'Experienced Guides',
    description:
      'Our certified trip captains and local mountaineers ensure safe, well-managed, and unforgettable journeys.',
  },
  {
    id: 'adventures',
    icon: <FiCompass />,
    title: 'Unique Adventures',
    description:
      'Offbeat routes, curated local experiences, and hidden gems away from crowded tourist traps.',
  },
  {
    id: 'travel',
    icon: <FiShield />,
    title: 'Comfortable & Safe Travel',
    description:
      'Verified 3-star stays, sanitized vehicles, and 24/7 on-field emergency assistance for total peace of mind.',
  },
  {
    id: 'memories',
    icon: <FiHeart />,
    title: 'Best Memories & Vibe',
    description:
      'Connect with like-minded young travelers, enjoy bonfires under stars, and make lifelong friendships.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.why-header-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Cards Stagger Reveal
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
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
        {/* Section Header */}
        <div className={styles.header}>
          <span className={`${styles.tagline} why-header-anim`}>
            🦅 THE FLYING BIRDS DIFFERENCE
          </span>
          <h2 className={`${styles.title} why-header-anim`}>
            Why Choose Flying Birds?
          </h2>
          <p className={`${styles.subtitle} why-header-anim`}>
            We don't just sell tours; we engineer experiences that let you fly beyond limits with absolute comfort and safety.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className={styles.grid}>
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={styles.card}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className={styles.iconBox}>
                <div className={styles.iconInner}>{feature.icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}