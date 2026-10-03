'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiGlobe, FiClock, FiStar, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp, FaPassport } from 'react-icons/fa';
import { internationalTrip } from '@/data/internationalTrip';
import styles from './InternationalCards.module.scss';

export default function InternationalCards() {
  const trips = internationalTrip || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>🦅 PASSPORT READY EXPEDITIONS</span>
          <h2 className={styles.title}>All International Departures</h2>
          <p className={styles.subtitle}>
            Zero hassle planning with curated group departures, verified 4-star stays, visa assistance, and certified trip leads.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className={styles.grid}>
          {trips.map((trip) => {
            const tripSlug = trip.slug || trip.id;
            return (
              <div key={trip.id} className={styles.tripCard}>
                {/* Image Stage */}
                <div className={styles.imageBox}>
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.img}
                  />
                  <div className={styles.overlay} />

                  {/* Top Badges */}
                  <div className={styles.topBadges}>
                    <span className={styles.featureBadge}>{trip.badge}</span>
                    <div className={styles.ratingBadge}>
                      <FiStar className={styles.starIcon} />
                      <strong>{trip.rating}</strong>
                      <span>({trip.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Visa Tag */}
                  {trip.visa && (
                    <div className={styles.visaTag}>
                      <FaPassport className={styles.passportIcon} />
                      <span>{trip.visa}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.countryTag}>
                      <FiGlobe /> {trip.country}
                    </span>
                    <span className={styles.durationTag}>
                      <FiClock /> {trip.duration}
                    </span>
                  </div>

                  <h3 className={styles.tripTitle}>{trip.name}</h3>

                  {/* Price & Actions Footer */}
                  <div className={styles.cardFooter}>
                    <div className={styles.priceWrap}>
                      <span className={styles.priceLabel}>Starting from</span>
                      <div className={styles.priceText}>
                        ₹{trip.price} <small>/ person</small>
                      </div>
                    </div>

                    <div className={styles.actionBtns}>
                      <a
                        href={`https://wa.me/919999999999?text=Hi%20Flying%20Birds!%20I%20want%20to%20know%20details%20and%20visa%20process%20for%20${trip.name}%20trip.`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.waBtn}
                        aria-label={`Chat on WhatsApp about ${trip.name}`}
                      >
                        <FaWhatsapp />
                      </a>

                      <Link
                        href={`/packages/${tripSlug}`}
                        className={styles.exploreBtn}
                      >
                        <span>Itinerary</span>
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}