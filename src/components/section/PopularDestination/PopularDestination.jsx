'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiMapPin, FiClock, FiStar, FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DESTINATIONS_DATA } from '@/data/destinationData';
import styles from './PopularDestination.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function PopularDestinations() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.dest-header-anim', {
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
          start: 'top 65%',
        },
        y: 60,
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
          <span className={`${styles.tagline} dest-header-anim`}>
            ✨ EXPLORE INDIA'S BEST
          </span>
          <h2 className={`${styles.title} dest-header-anim`}>
            Popular Destinations
          </h2>
          <p className={`${styles.subtitle} dest-header-anim`}>
            Handpicked iconic locations designed for ultimate thrill, breathtaking views, and lifelong memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className={styles.grid}>
          {DESTINATIONS_DATA.map((dest, index) => (
            <div
              key={dest.id}
              className={styles.card}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              {/* Image & Overlay Wrapper */}
              <div className={styles.imageWrapper}>
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.bgImage}
                  priority={index < 3}
                />
                <div className={styles.overlay} />
                
                {dest.badge && (
                  <span className={styles.badge}>{dest.badge}</span>
                )}

                <div className={styles.locationTag}>
                  <FiMapPin className={styles.pinIcon} />
                  <span>{dest.state}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.content}>
                <div className={styles.metaRow}>
                  <div className={styles.rating}>
                    <FiStar className={styles.starIcon} />
                    <span>{dest.rating}</span>
                    <small>({dest.reviewsCount})</small>
                  </div>
                  <div className={styles.duration}>
                    <FiClock className={styles.clockIcon} />
                    <span>{dest.duration}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{dest.name}</h3>

                <div className={styles.footerRow}>
                  <div className={styles.priceContainer}>
                    <span className={styles.priceLabel}>Starting from</span>
                    <div className={styles.priceValue}>
                      ₹{dest.price} <span>/ person</span>
                    </div>
                  </div>

                  <button className={styles.actionBtn} aria-label={`View details for ${dest.name}`}>
                    <span>View Details</span>
                    <FiArrowRight className={styles.arrowIcon} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}