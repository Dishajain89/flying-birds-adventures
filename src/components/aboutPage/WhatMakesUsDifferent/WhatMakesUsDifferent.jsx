'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiShield, FiUsers, FiCompass, FiHeart, FiArrowUpRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhatMakesUsDifferent.module.scss';

gsap.registerPlugin(ScrollTrigger);

const DIFFERENCE_CARDS = [
  {
    id: '01',
    title: 'Certified Mountain Captains',
    tag: 'Safety First',
    subtitle: 'NIM & HMI Certified Expedition Leads',
    description:
      'We don’t outsource to random drivers. Every expedition is guided by certified mountaineers trained in high-altitude wilderness first aid and rescue.',
    icon: <FiShield />,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '02',
    title: '18–35 Exclusive Tribe',
    tag: 'Like-Minded Vibes',
    subtitle: 'Solo Travelers, Hustlers & Creators',
    description:
      'No awkward family tours. Every batch is curated for young explorers who love late-night acoustic music, star-gazing sessions, and raw deep conversations.',
    icon: <FiUsers />,
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '03',
    title: '50%+ Solo Female Explorers',
    tag: 'Zero Compromise Safety',
    subtitle: 'Verified Accommodations & Security',
    description:
      'We take female traveler security seriously. Verified stays, safe double/triple sharing rooms, and supportive trip captains with 24/7 emergency response.',
    icon: <FiHeart />,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '04',
    title: 'Offbeat Raw Itineraries',
    tag: 'No Tourist Traps',
    subtitle: 'Secret Waterfalls & Cliffside Camps',
    description:
      'We skip the crowded spots to lead you into untouched river streams, remote valleys, and authentic local homestays that you won’t find on Google.',
    icon: <FiCompass />,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
];

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.diff-heading-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Cards Stagger Reveal
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
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
          <span className={`${styles.tagline} diff-heading-anim`}>
            🦅 THE FLYING BIRDS CULTURE
          </span>
          <h2 className={`${styles.title} diff-heading-anim`}>
            Why Travel With Us?
          </h2>
          <p className={`${styles.subtitle} diff-heading-anim`}>
            We don’t sell package tours; we build real travel memories. Here is the standard that makes every Flying Birds journey unforgettable.
          </p>
        </div>

        {/* 4 Interactive Visual Story Cards */}
        <div className={styles.cardsGrid}>
          {DIFFERENCE_CARDS.map((card, index) => (
            <div
              key={card.id}
              className={styles.storyCard}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              {/* Background Photo */}
              <div className={styles.imageBox}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.bgImage}
                />
                <div className={styles.darkOverlay} />
              </div>

              {/* Number Index Watermark */}
              <span className={styles.numberIndex}>{card.id}</span>

              {/* Top Meta Details */}
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>{card.icon}</div>
                <span className={styles.badge}>{card.tag}</span>
              </div>

              {/* Bottom Card Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <h4 className={styles.cardSubtitle}>{card.subtitle}</h4>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>

              {/* Subtle Corner Action Indicator */}
              <div className={styles.cornerIndicator}>
                <FiArrowUpRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}