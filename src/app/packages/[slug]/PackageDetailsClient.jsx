"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";

import BookingCard from "@/components/ui/BookingCard/BookingCard";
import Itinerary from "@/components/common/Itinerary/Itinerary";
import Faq from "@/components/common/Faq/Faq";
import Policies from "@/components/common/Policies/Policies";

import { urlFor } from "@/sanity/lib/image";

import styles from "./[slug].module.scss";
import CustomizedConnect from "@/components/ui/CustomizedConnect/CustomizedConnect";
import ThingsToCarry from "@/components/common/ThingsToCarry/ThingsToCarry";

export default function PackageDetailsClient({ trip }) {
  const itineraries = trip.itineraries || [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedItinerary =
    itineraries[selectedIndex] || itineraries[0];

  if (!selectedItinerary) {
    return (
      <div className={styles.sectionBlock}>
        <h2>No itinerary available</h2>
      </div>
    );
  }

  /* =========================
      SAFE GALLERY IMAGES
  ========================= */

  const galleryImages = [
    selectedItinerary.coverImage,
    ...(selectedItinerary.gallery || []),
  ].filter((img) => img && (img.asset || img._ref));

  /* Safe Image Resolver helper function */
  const getSafeImageUrl = (img) => {
    try {
      if (!img || (!img.asset && !img._ref)) return null;
      return urlFor(img).width(1200).url();
    } catch (err) {
      console.warn("Corrupted Sanity image asset detected:", err);
      return null;
    }
  };

  /* =========================
      DAYS
  ========================= */

  const days = (selectedItinerary.days || []).map((item) => ({
    day: item.day,
    title: item.title,
    details: item.description,
    meals: item.meals || item.meal || "",
    stay: item.stay || item.accommodation || "",
  }));

  /* =========================
      BATCHES
  ========================= */

  const batches = (trip.batchDates || [])
    .filter((item) => item.status !== "soldOut")
    .map((item) => item.date);

  /* =========================
      PRICE & OCCUPANCY RATES
  ========================= */

  const price =
    selectedItinerary.price || trip.startingPrice || 0;

  const triplePrice =
    selectedItinerary.triplePrice ?? trip.triplePrice ?? null;

  const doublePrice =
    selectedItinerary.doublePrice ?? trip.doublePrice ?? null;

  /* =========================
      BOOKING CARD DATA
  ========================= */

  const bookingPackage = {
    title: selectedItinerary.title || trip.title,

    duration:
      selectedItinerary.duration ||
      trip.duration ||
      "Flexible",

    tripType: trip.tripType || "domestic", // 👈 One-Day vs Domestic switch ke liye zaroori hai

    price,
    triplePrice, // 👈 Sanity Triple Rate pass ho gaya
    doublePrice, // 👈 Sanity Double Rate pass ho gaya

    batches,
    groupType: "Group Trip",
    rating: "5",
    bestTime: "As per batch",
    brochureUrl: selectedItinerary.pdfUrl || "",
    seatsLeft: selectedItinerary.seatsLeft || null,
  };

  return (
    <>
      {/* =========================
          GALLERY
      ========================= */}

      <div className={styles.galleryGrid}>
        {galleryImages.map((img, idx) => {
          const imageUrl = getSafeImageUrl(img);

          if (!imageUrl) return null;

          return (
            <div
              key={img._key || idx}
              className={styles.galleryImage}
            >
              <Image
                src={imageUrl}
                alt={trip.title || "Trip Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.img}
                priority={idx === 0}
              />
            </div>
          );
        })}
      </div>

      {/* =========================
          ITINERARY OPTIONS
      ========================= */}

      {itineraries.length > 1 && (
        <section className={styles.sectionBlock}>
          <h2 className={styles.blockHeader}>
            Choose Your Itinerary
          </h2>

          <div className={styles.itineraryOptions}>
            {itineraries.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`${styles.itineraryOption} ${
                  selectedIndex === index
                    ? styles.itineraryOptionActive
                    : ""
                }`}
              >
                <span className={styles.optionTitle}>
                  {item.title}
                </span>

                {item.tagline && (
                  <span className={styles.optionTagline}>
                    {item.tagline}
                  </span>
                )}

                <span className={styles.optionMeta}>
                  {item.duration || trip.duration}
                  {item.price
                    ? ` • ₹${item.price.toLocaleString("en-IN")}`
                    : ""}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* =========================
          MAIN 70/30 GRID
      ========================= */}

      <div className={styles.mainGrid}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          {/* OVERVIEW */}
          <section className={styles.sectionBlock}>
            <h1 className={styles.mainTitle}>
              {selectedItinerary.title || trip.title}
            </h1>

            {selectedItinerary.tagline && (
              <p className={styles.overviewText}>
                {selectedItinerary.tagline}
              </p>
            )}

            {selectedItinerary.description && (
              <p className={styles.overviewText}>
                {selectedItinerary.description}
              </p>
            )}

            {trip.tourOverview && (
              <>
                <h3 className={styles.subTitle}>
                  About This Trip
                </h3>

                <p className={styles.overviewText}>
                  {trip.tourOverview}
                </p>
              </>
            )}
          </section>

          {/* =========================
              DAY-WISE ITINERARY
          ========================= */}

          <section className={styles.sectionBlock}>
            <Itinerary days={days} />
          </section>

          {/* =========================
              INCLUSIONS / EXCLUSIONS
          ========================= */}

          <section className={styles.sectionBlock}>
            <h2 className={styles.blockHeader}>
              📋 Inclusions & Exclusions
            </h2>

            <div className={styles.incExcGrid}>
              <div className={styles.incBox}>
                <h3>What's Included</h3>

                <ul>
                  {(trip.included || []).map((item, index) => (
                    <li key={index}>
                      <FiCheckCircle className={styles.checkIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.excBox}>
                <h3>What's Not Included</h3>

                <ul>
                  {(trip.notIncluded || []).map((item, index) => (
                    <li key={index}>
                      <FiXCircle className={styles.crossIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <ThingsToCarry tripType={trip.tripType} />

          {/* =========================
              IMPORTANT NOTES
          ========================= */}

          <section className={styles.sectionBlock}>
            <div className={styles.warningCard}>
              <div className={styles.warningHeader}>
                <FiAlertTriangle className={styles.warnIcon} />
                <h3>Important Notes</h3>
              </div>

              <ul>
                <li>
                  Trip itinerary may change depending on
                  weather and local conditions.
                </li>
                <li>
                  Please follow the instructions shared by
                  the trip coordinator.
                </li>
                <li>
                  Carry valid ID proof during the trip.
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ - STATIC */}
          <section className={styles.sectionBlock}>
            <Faq />
          </section>

          <CustomizedConnect />

          {/* POLICIES - STATIC */}
          <section className={styles.sectionBlock}>
            <Policies />
          </section>
        </div>

        {/* =========================
            RIGHT SIDEBAR
        ========================= */}

        <div className={styles.rightColumn}>
          <BookingCard pkg={bookingPackage} />
        </div>
      </div>
    </>
  );
}