'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './TripCards.module.scss';

export default function TripCards({
  tagline,
  title,
  subtitle,
  trips = [],
}) {
  return (
    <section className={styles.section}>
      <div className={styles.glowRadial} />

      <div className={styles.container}>
        {/* Dynamic Section Header from Props */}
        {(tagline || title || subtitle) && (
          <div className={styles.header}>
            {tagline && <span className={styles.tagline}>{tagline}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}

        {/* Trips Grid */}
        <div className={styles.grid}>
          {trips.map((trip) => {
            const tripSlug = trip.slug || trip.id;

            return (
              <div key={trip.id} className={styles.tripCard}>
                {/* Full Edge-to-Edge Image Backdrop */}
                <div className={styles.imageBackdrop}>
                  {trip.image && (
                    <Image
                      src={trip.image}
                      alt={trip.name || 'Trip Destination'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.bgImg}
                    />
                  )}
                  <div className={styles.gradientOverlay} />
                </div>

                {/* Top Badges */}
                <div className={styles.cardHeader}>
                  {trip.badge && (
                    <span className={styles.featureBadge}>{trip.badge}</span>
                  )}
                </div>

                {/* Card Content & Details Floating on Bottom */}
                <div className={styles.cardBody}>
                  {trip.state && (
                    <div className={styles.locationMeta}>
                      <FiMapPin className={styles.pinIcon} />
                      <span>{trip.state}</span>
                    </div>
                  )}

                  <h3 className={styles.tripTitle}>{trip.name}</h3>

                  {trip.duration && (
                    <div className={styles.durationRow}>
                      <FiClock className={styles.clockIcon} />
                      <span>{trip.duration}</span>
                    </div>
                  )}

                  <div className={styles.cardFooter}>
                    {/* Price */}
                    <div className={styles.priceWrap}>
                      <span className={styles.priceLabel}>Starting from</span>
                      <div className={styles.priceText}>
                        ₹{trip.price || 0} <small>/ person</small>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={styles.actionBtns}>
                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/919999999999?text=${encodeURIComponent(
                          `Hi Flying Birds! I want to know details for ${trip.name} trip.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.waBtn}
                        aria-label={`Chat about ${trip.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaWhatsapp />
                      </a>

                      {/* Explore Button */}
                      <Link
                        href={`/packages/${tripSlug}`}
                        className={styles.exploreBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Explore</span>
                        <FiArrowRight className={styles.arrowIcon} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className={styles.glowBorder} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}