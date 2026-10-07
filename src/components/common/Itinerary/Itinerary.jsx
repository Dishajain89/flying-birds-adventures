'use client';

import React, { useState } from 'react';
import { FiChevronDown, FiCoffee, FiHome, FiClock } from 'react-icons/fi';
import styles from './Itinerary.module.scss';

export default function Itinerary({ days = [] }) {
  const [openDay, setOpenDay] = useState(0);

  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  if (!days || !days.length) return null;

  return (
    <div className={styles.itineraryWrapper}>
      <h2 className={styles.sectionTitle}>📅 Schedule & Itinerary</h2>

      <div className={styles.accordionGroup}>
        {days.map((item, index) => {
          const isOpen = openDay === index;
          const hasMeals = Boolean(item.meals && item.meals.trim());
          const hasStay = Boolean(item.stay && item.stay.trim());

          // Check: Kya yeh pure number hai (Multi-day) ya Time string (One-day)
          const rawDay = String(item.day || index + 1).trim();
          const isNumericDay = /^\d+$/.test(rawDay);

          return (
            <div
              key={index}
              className={`${styles.accordionItem} ${isOpen ? styles.active : ''}`}
            >
              <button
                className={styles.accordionHeader}
                onClick={() => toggleDay(index)}
                type="button"
              >
                {/* Dynamic Badge: Day 1 vs 06:00 AM */}
                <div className={styles.dayBadge}>
                  {!isNumericDay && <FiClock style={{ marginRight: '4px' }} />}
                  {isNumericDay ? `Day ${rawDay}` : rawDay}
                </div>

                <h3 className={styles.dayTitle}>{item.title}</h3>

                <FiChevronDown
                  className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ''}`}
                />
              </button>

              {isOpen && (
                <div className={styles.accordionContent}>
                  {item.details && (
                    <p className={styles.detailsText}>{item.details}</p>
                  )}

                  {/* Meals & Stay Badges (Conditional) */}
                  {(hasMeals || hasStay) && (
                    <div className={styles.dayTags}>
                      {hasMeals && (
                        <span>
                          <FiCoffee /> {item.meals}
                        </span>
                      )}
                      {hasStay && (
                        <span>
                          <FiHome /> {item.stay}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}