'use client';

import React, { useState } from 'react';
import { FiHelpCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from './Faq.module.scss';

import FAQS_DATA from '../../../data/faq';

const INITIAL_COUNT = 5; // Default me 5 questions show honge

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Safe items slice: Agar showAll true hai toh sab, nahi toh pehle 5
  const visibleFaqs = showAll ? FAQS_DATA : FAQS_DATA.slice(0, INITIAL_COUNT);

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>
            <FiHelpCircle /> CLARITY &amp; TRANSPARENCY
          </span>

          <h2 className={styles.title}>
            Frequently Asked Questions
          </h2>

          <p className={styles.subtitle}>
            Got questions about our upcoming batches, safety standards, or
            booking terms? Here is everything you need to know.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className={styles.accordionContainer}>
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`${styles.accordionItem} ${
                  isOpen ? styles.activeItem : ''
                }`}
              >
                <button
                  type="button"
                  className={styles.questionHeader}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>
                    {faq.question}
                  </span>

                  <div
                    className={`${styles.iconWrap} ${
                      isOpen ? styles.rotateIcon : ''
                    }`}
                  >
                    <FiChevronDown />
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.answerContent}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View More / View Less Toggle Button */}
        {FAQS_DATA.length > INITIAL_COUNT && (
          <div className={styles.toggleBtnWrapper}>
            <button
              type="button"
              className={styles.viewMoreBtn}
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
                  setOpenIndex(0);
                }
              }}
            >
              <span>
                {showAll
                  ? 'View Less Questions'
                  : `View More Questions (${FAQS_DATA.length - INITIAL_COUNT}+)`}
              </span>
              {showAll ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}