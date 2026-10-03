'use client';

import React, { useState } from 'react';
import { FiChevronDown, FiCoffee, FiHome, FiCompass } from 'react-icons/fi';
import styles from './Itinerary.module.scss';

export default function Itinerary({ days }) {
  const [openDay, setOpenDay] = useState(1);

  const toggleDay = (dayNum) => {
    setOpenDay(openDay === dayNum ? null : dayNum);
  };

  return (
    <div className={styles.itineraryWrapper}>
      <h2 className={styles.sectionTitle}>📅 Day-wise Itinerary</h2>

      <div className={styles.accordionGroup}>
        {days.map((item) => {
          const isOpen = openDay === item.day;
          return (
            <div
              key={item.day}
              className={`${styles.accordionItem} ${isOpen ? styles.active : ''}`}
            >
              <button
                className={styles.accordionHeader}
                onClick={() => toggleDay(item.day)}
              >
                <div className={styles.dayBadge}>Day {item.day}</div>
                <h3 className={styles.dayTitle}>{item.title}</h3>
                <FiChevronDown
                  className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ''}`}
                />
              </button>

              {isOpen && (
                <div className={styles.accordionContent}>
                  <p className={styles.detailsText}>{item.details}</p>
                  <div className={styles.dayTags}>
                    <span>
                      <FiCoffee /> {item.meals}
                    </span>
                    <span>
                      <FiHome /> {item.stay}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}