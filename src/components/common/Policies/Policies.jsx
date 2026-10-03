"use client";

import React, { useState } from "react";
import { FiChevronDown, FiShield } from "react-icons/fi";
import styles from "./Policies.module.scss";

const COMMON_POLICIES = {
  cancellation:
    "Cancellation requests are subject to the terms and conditions of the trip. Cancellation charges may vary depending on how close the cancellation is to the departure date. Please contact Flying Birds Adventure for the applicable cancellation charges before cancelling your booking.",

  refund:
    "Refunds, wherever applicable, will be processed according to the cancellation terms of the trip. Processing time may vary depending on the payment method and banking partner. Any non-refundable charges will be deducted from the refundable amount.",

  booking:
    "A booking is confirmed only after the required payment or confirmation amount has been received. Guests are requested to provide accurate details while booking. Once the booking is confirmed, the applicable trip terms and cancellation policy will apply.",
};

export default function Policies() {
  const [openSection, setOpenSection] = useState("cancellation");

  const policyList = [
    {
      id: "cancellation",
      title: "Cancellation Policy",
      text: COMMON_POLICIES.cancellation,
    },
    {
      id: "refund",
      title: "Refund Policy",
      text: COMMON_POLICIES.refund,
    },
    {
      id: "booking",
      title: "Booking Policy",
      text: COMMON_POLICIES.booking,
    },
  ];

  return (
    <div className={styles.policiesWrapper}>
      <h2 className={styles.sectionTitle}>
        <FiShield className={styles.icon} />
        Our Policies
      </h2>

      <div className={styles.accordionGroup}>
        {policyList.map((item) => {
          const isOpen = openSection === item.id;

          return (
            <div
              key={item.id}
              className={`${styles.accordionItem} ${
                isOpen ? styles.active : ""
              }`}
            >
              <button
                className={styles.accordionHeader}
                onClick={() =>
                  setOpenSection(isOpen ? null : item.id)
                }
              >
                <span>{item.title}</span>

                <FiChevronDown
                  className={`${styles.arrowIcon} ${
                    isOpen ? styles.rotate : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className={styles.accordionContent}>
                  <p>{item.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}