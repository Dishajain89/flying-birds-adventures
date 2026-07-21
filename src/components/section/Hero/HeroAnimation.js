import gsap from 'gsap';

export const initHeroAnimations = (refs) => {
  const {
    heroRef,
    cloudsRef,
    badgeRef,
    headingRef,
    descRef,
    ctaRef,
    searchRef,
    statsRef,
    scrollRef,
  } = refs;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Entrance Sequence
  tl.fromTo(
    cloudsRef.current,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 1.2 }
  )
    .fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.8'
    )
    .fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(
      searchRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.2'
    )
    .fromTo(
      statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

  return tl;
};

export const animateCounters = (statsArray) => {
  statsArray.forEach(({ ref, endValue }) => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration: 4,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(obj.val);
        }
      },
    });
  });
};