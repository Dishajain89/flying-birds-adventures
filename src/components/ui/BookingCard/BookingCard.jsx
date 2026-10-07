'use client';

import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiDownload, FiStar, FiClock, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './BookingCard.module.scss';

const OCCUPANCY_OPTIONS = [
  { key: 'quad', label: 'Quad' },
  { key: 'triple', label: 'Triple' },
  { key: 'double', label: 'Double' },
];

export default function BookingCard({ pkg = {} }) {
  // 1. Bulletproof One-Day Check (Kisi bhi format me ho, pakad lega)
  const tripTypeStr = String(pkg.tripType || '').toLowerCase().trim();
  const durationStr = String(pkg.duration || '').toLowerCase().trim();
  const titleStr = String(pkg.title || '').toLowerCase().trim();

  const isOneDayTrip =
    tripTypeStr === 'oneday' ||
    tripTypeStr === 'one-day' ||
    tripTypeStr === 'day' ||
    durationStr.includes('same day') ||
    durationStr.includes('1 day') ||
    durationStr.includes('1d') ||
    titleStr.includes('one day');

  const [occupancy, setOccupancy] = useState('quad');
  const [selectedBatch, setSelectedBatch] = useState(pkg.batches?.[0] || '');
  const [guests, setGuests] = useState(1);

  // 2. Base Price
  const basePrice = Number(pkg.price || pkg.startingPrice || 0);

  // 3. Dynamic Triple & Double Price
  const tripleRate = pkg.triplePrice !== undefined && pkg.triplePrice !== null
    ? Number(pkg.triplePrice)
    : basePrice + 1000;

  const doubleRate = pkg.doublePrice !== undefined && pkg.doublePrice !== null
    ? Number(pkg.doublePrice)
    : basePrice + 1500;

  // 4. Current Price calculation
  let currentPrice = basePrice;
  if (!isOneDayTrip) {
    if (occupancy === 'double') {
      currentPrice = doubleRate;
    } else if (occupancy === 'triple') {
      currentPrice = tripleRate;
    } else {
      currentPrice = basePrice;
    }
  }

  // 5. Strikethrough Original Price & Discount
  const currentOriginalPrice = Math.round((currentPrice * 1.2) / 100) * 100;
  const discountAmount = currentOriginalPrice > currentPrice ? currentOriginalPrice - currentPrice : 0;
  const totalAmount = guests * currentPrice;

  const handleGuestChange = (type) => {
    if (type === 'inc') setGuests((prev) => prev + 1);
    if (type === 'dec' && guests > 1) setGuests((prev) => prev - 1);
  };

  const handleWhatsAppBooking = () => {
    const tripTitle = pkg.title || 'Adventure Trip';
    const sharingLine = isOneDayTrip ? '' : `🛏️ *Occupancy:* ${occupancy.toUpperCase()} Sharing\n`;

    const message = `Hello Flying Birds Adventure! 🦅\n\nI want to book the following trip:\n\n📍 *Destination:* ${tripTitle}\n${sharingLine}📅 *Batch Date:* ${selectedBatch}\n👥 *Number of Guests:* ${guests}\n💰 *Price per Person:* ₹${currentPrice.toLocaleString('en-IN')}\n💵 *Total Price:* ₹${totalAmount.toLocaleString('en-IN')}\n\nPlease share the payment details and seat availability!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918982303230?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={styles.stickyContainer}>
      {/* Dynamic Trip Snapshot Card */}
      <div className={styles.snapshotCard}>
        <div className={styles.snapHeader}>
          <h3>📍 {pkg.title}</h3>
          {pkg.seatsLeft && pkg.seatsLeft < 10 && (
            <span className={styles.seatsUrgency}>🔥 Only {pkg.seatsLeft} Seats Left!</span>
          )}
        </div>
        <div className={styles.snapGrid}>
          <div className={styles.snapItem}>
            <FiClock className={styles.icon} />
            <span>{pkg.duration}</span>
          </div>
          <div className={styles.snapItem}>
            <FiUsers className={styles.icon} />
            <span>{isOneDayTrip ? 'Day Expedition' : pkg.groupType || 'Group Trip'}</span>
          </div>
          <div className={styles.snapItem}>
            <FiStar className={styles.starIcon} />
            <span>{pkg.rating || '4.9'} Rating</span>
          </div>
          <div className={styles.snapItem}>
            <FiMapPin className={styles.icon} />
            <span>Best: {pkg.bestTime}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Booking Card */}
      <div className={styles.bookingCard}>
        {/* Occupancy Pricing Header */}
        <div className={styles.priceHeader}>
          <span className={styles.fromLabel}>
            {isOneDayTrip ? 'Trip Fare' : 'Starting From'}
          </span>

          {/* Occupancy Tabs: Sirf Tab Dikhega Jab isOneDayTrip FALSE Ho */}
          {!isOneDayTrip && (
            <div className={styles.occupancyRow}>
              <span className={styles.occupancyLabel}>Occupancy —</span>
              <div className={styles.occupancyTabs}>
                {OCCUPANCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setOccupancy(opt.key)}
                    className={`${styles.occupancyBtn} ${
                      occupancy === opt.key ? styles.occupancyActive : ''
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Discount Display */}
          <div className={styles.priceContainer}>
            <div className={styles.priceValues}>
              {currentOriginalPrice && (
                <span className={styles.originalPrice}>
                  ₹{currentOriginalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <div className={styles.currentPrice}>
                ₹{currentPrice.toLocaleString('en-IN')}
              </div>
            </div>

            {discountAmount > 0 && (
              <span className={styles.discountBadge}>
                ₹{discountAmount.toLocaleString('en-IN')} OFF
              </span>
            )}
          </div>
        </div>

        {/* Batch Selection */}
        <div className={styles.formGroup}>
          <label>
            <FiCalendar /> Select Batch
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className={styles.selectInput}
          >
            {pkg.batches?.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        {/* Guests Counter */}
        <div className={styles.formGroup}>
          <label>
            <FiUsers /> Guests
          </label>
          <div className={styles.counterBox}>
            <button
              onClick={() => handleGuestChange('dec')}
              disabled={guests <= 1}
              type="button"
            >
              -
            </button>
            <span>{guests}</span>
            <button onClick={() => handleGuestChange('inc')} type="button">
              +
            </button>
          </div>
        </div>

        {/* Total Price Display */}
        <div className={styles.totalRow}>
          <span>
            {isOneDayTrip
              ? `Total Price (${guests} Person${guests > 1 ? 's' : ''}):`
              : `Total Price (${occupancy.toUpperCase()} Sharing):`}
          </span>
          <span className={styles.totalVal}>
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Action Buttons */}
        <button className={styles.bookNowBtn} onClick={handleWhatsAppBooking}>
          <FaWhatsapp className={styles.waIcon} /> Book Now via WhatsApp
        </button>

        {pkg.brochureUrl && (
          <a
            href={`/api/download-pdf?url=${encodeURIComponent(
              pkg.brochureUrl
            )}&name=${encodeURIComponent(pkg.title)}`}
            className={styles.downloadBtn}
          >
            <FiDownload />
            Download Itinerary PDF
          </a>
        )}
      </div>
    </div>
  );
}