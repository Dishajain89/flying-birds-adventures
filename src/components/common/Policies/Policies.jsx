"use client";

import React, { useState } from "react";
import { FiChevronDown, FiShield } from "react-icons/fi";
import styles from "./Policies.module.scss";

const POLICY_DATA = [
  {
    id: "cancellation",
    title: "Cancellation & Refund Policy",
    sections: [
      {
        title: "Cancellation Charges",
        items: [
          "If a cancellation is made 60–45 days before the trip start date, 10% of the total trip cost will be charged as a cancellation fee.",
          "If a cancellation is made 45–30 days before the trip start date, 50% of the total trip cost will be charged as a cancellation fee.",
          "If a cancellation is made within 30 days of the trip start date, 100% of the total trip cost will be charged and no refund will be provided.",
          "Cancellation charges will be calculated on the total trip cost, regardless of the amount paid at the time of cancellation.",
          "Any eligible refund will be processed after deducting applicable cancellation charges and non-refundable booking costs."
        ]
      },
      {
        title: "Unforeseen Circumstances",
        items: [
          "In case of extreme weather, natural disasters, government restrictions, war, pandemics, or other force majeure events, the itinerary or planned activities may be changed, postponed, or cancelled.",
          "Flying Birds Adventures will make reasonable efforts to provide an alternative arrangement wherever possible.",
          "Refunds will depend on the amount recoverable from hotels, transport providers, activity operators, and other vendors.",
          "The cancellation policy may be subject to change in emergency situations affecting the destination or trip operations.",
          "Once a booking is confirmed, it is non-transferable and non-exchangeable unless specifically approved by Flying Birds Adventures."
        ]
      }
    ]
  },

  {
    id: "booking",
    title: "Booking & Travel Terms",
    sections: [
      {
        title: "Booking & Payment",
        items: [
          "A 50% advance payment per person is required at the time of booking to reserve your seat.",
          "The remaining 50% balance must be paid 1 day before the trip departure.",
          "A booking will be considered confirmed only after full payment has been received. Failure to pay the balance on time may result in cancellation without refund."
        ]
      },
      {
        title: "Travel & Tickets",
        items: [
          "Flying Birds Adventures is not a ticketing agency. Train and bus tickets are booked subject to availability.",
          "RAC or waitlisted tickets are not guaranteed to get confirmed.",
          "No refund or claim will be applicable for unconfirmed tickets.",
          "All travelers must carry a valid government-issued ID proof during the trip.",
          "Travelers joining from outside the city or state must inform Flying Birds Adventures in advance."
        ]
      },
      {
        title: "Accommodation & Transport",
        items: [
          "Accommodation is generally provided on a quad-sharing basis, unless mentioned otherwise.",
          "An extra mattress may be provided where required for additional participants.",
          "Hotel, camp, resort, and transport arrangements are subject to availability and will be confirmed after receiving the required payment.",
          "Seating in the bus or Tempo Traveller will be on a first-come, first-served basis."
        ]
      },
      {
        title: "Refunds & Other Terms",
        items: [
          "Any applicable GST or taxes are non-refundable.",
          "If a refund is applicable, it will be processed to the original payment method within 5–7 working days.",
          "Flying Birds Adventures reserves the right to deny or cancel participation if any booking or payment terms are not followed.",
          "The itinerary, accommodation, transport, or activities may be changed due to weather conditions, availability, or unforeseen circumstances."
        ]
      }
    ]
  },

  {
    id: "rules",
    title: "Trip Rules & Important Guidelines",
    sections: [
      {
        title: "Safety & Conduct",
        items: [
          "Flying Birds Adventures strictly prohibits the use of narcotics, illegal drugs, or banned substances during the trip. Any violation may lead to removal from the trip without refund and may have legal consequences.",
          "Weapons, fireworks, and hazardous or toxic substances are strictly prohibited during the trip. Participants will be responsible for any legal consequences arising from violations.",
          "Flying Birds Adventures reserves the right to remove or deny participation to anyone who violates trip rules or creates an unsafe or inappropriate environment. No refund will be provided in such cases.",
          "Participants are responsible for their own safety and belongings when they are outside the designated hotel, resort, camp, or group activity areas."
        ]
      },
      {
        title: "Property & Personal Belongings",
        items: [
          "Any damage caused to hotel, resort, campsite, or transport property must be paid for by the responsible participant as per the applicable repair or replacement cost.",
          "Flying Birds Adventures is not responsible for loss or theft of personal belongings, personal illness, or accidents caused by individual negligence."
        ]
      },
      {
        title: "Travel & Accommodation",
        items: [
          "All participants must carry a valid government-issued ID proof. Travelers joining from outside the city or state should inform Flying Birds Adventures in advance.",
          "Hotel, camp, resort, and transport arrangements are subject to availability and will be secured after the required payment confirmation.",
          "Adventure activities, sightseeing, trekking, water sports, and other activities involve certain risks. Participants are expected to follow safety instructions and guidelines provided by the organizers and activity operators.",
          "In case of a vehicle or transport breakdown, participants may need to wait until the issue is resolved. Alternative transport will depend on availability and circumstances.",
          "Seating in buses or Tempo Travellers will be arranged on a first-come, first-served basis."
        ]
      },
      {
        title: "Environment & Activities",
        items: [
          "Participants are expected to respect nature and keep the destinations clean. Please avoid littering and help us maintain a safe and eco-friendly environment.",
          "Confirmed registrations are generally non-transferable and non-refundable, subject to the applicable cancellation policy.",
          "Bonfires, music nights, parties, and other group activities are subject to local regulations and hotel, resort, or campsite rules.",
          "The trip itinerary may be modified due to weather conditions, road conditions, local restrictions, health or safety concerns, or other unforeseen circumstances. Flying Birds Adventures reserves the right to make necessary changes for the safety and overall experience of the group."
        ]
      },
      {
        title: "Enjoy the Journey",
        items: [
          "Respect your fellow travelers, follow the trip guidelines, enjoy the journey, and make unforgettable memories with Flying Birds Adventures."
        ]
      }
    ]
  }
];

export default function Policies() {
  const [openSection, setOpenSection] = useState("cancellation");

  return (
    <div className={styles.policiesWrapper}>
      <h2 className={styles.sectionTitle}>
        <FiShield className={styles.icon} />
        Our Policies
      </h2>

      <div className={styles.accordionGroup}>
        {POLICY_DATA.map((item) => {
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
                  {item.sections.map((section, index) => (
                    <div
                      className={styles.policySection}
                      key={index}
                    >
                      <h3>{section.title}</h3>

                      <ul>
                        {section.items.map((text, itemIndex) => (
                          <li key={itemIndex}>{text}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}