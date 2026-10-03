"use client";

import React from "react";
import { FiCheckCircle, FiPackage } from "react-icons/fi";
import styles from "./ThingsToCarry.module.scss";

const COMMON_ITEMS = [
  { icon: "🪪", name: "Valid ID Proof" },
  { icon: "💧", name: "Water Bottle" },
  { icon: "👟", name: "Comfortable Shoes" },
  { icon: "🕶️", name: "Sunglasses" },
  { icon: "🧴", name: "Sunscreen" },
  { icon: "💊", name: "Personal Medicines" },
];

const TYPE_SPECIFIC_ITEMS = {
  oneDay: [
    { icon: "🎒", name: "Small Backpack" },
    { icon: "☂️", name: "Umbrella / Raincoat" },
    { icon: "🧢", name: "Cap / Hat" },
  ],
  domestic: [
    { icon: "🎒", name: "Travel Backpack" },
    { icon: "🧥", name: "Weather Clothes" },
    { icon: "🧢", name: "Cap / Hat" },
  ],
  international: [
    { icon: "🛂", name: "Passport & Visas" },
    { icon: "🔌", name: "Universal Adapter" },
    { icon: "💳", name: "Forex / Travel Card" },
    { icon: "📄", name: "Travel Insurance" },
  ],
};

export default function ThingsToCarry({ tripType = "oneDay" }) {
  const specificItems = TYPE_SPECIFIC_ITEMS[tripType] || [];
  const items = [...COMMON_ITEMS, ...specificItems];

  return (
    <section className={styles.sectionBlock}>
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <div className={styles.iconBadge}>
            <FiPackage />
          </div>
          <h2 className={styles.blockHeader}>Things To Carry</h2>
        </div>
        <span className={styles.countBadge}>{items.length} Essentials</span>
      </div>

      <div className={styles.carryGrid}>
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className={styles.carryCard}>
            <div className={styles.iconCircle}>
              <span className={styles.emoji}>{item.icon}</span>
            </div>
            <span className={styles.itemName}>{item.name}</span>
            <FiCheckCircle className={styles.checkIcon} />
          </div>
        ))}
      </div>
    </section>
  );
}