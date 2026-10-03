// ===================================
// ALL TRIPS & HOME GROUP TRIPS (With Tabs & Switch Support)
// ===================================
export const allTripsQuery = `
  *[_type == "trip"] | order(_createdAt desc) {
    _id,
    title,
    "name": title,
    "slug": slug.current,
    "state": destination,
    "image": coverImage.asset->url,
    "price": startingPrice,
    duration,
    badge,
    tripType,
    category,
    featuredOnHome,
    coverImage
  }
`;

// Popular / Featured Trips for Homepage (Domestic + International Group Trips)
export const popularTripsQuery = `
  *[_type == "trip" && (tripType == "domestic" || tripType == "international")] | order(_createdAt desc) {
    _id,
    title,
    "name": title,
    "slug": slug.current,
    "state": destination,
    "image": coverImage.asset->url,
    "price": startingPrice,
    duration,
    badge,
    tripType,
    category,
    featuredOnHome,
    coverImage
  }
`;

// ===================================
// SCOPED QUERIES
// ===================================
export const domesticTripsQuery = `
  *[_type == "trip" && tripType == "domestic"] | order(_createdAt desc) {
    _id,
    title,
    "name": title,
    "slug": slug.current,
    "state": destination,
    "image": coverImage.asset->url,
    "price": startingPrice,
    duration,
    badge,
    category
  }
`;

export const internationalTripsQuery = `
  *[_type == "trip" && tripType == "international"] | order(_createdAt desc) {
    _id,
    title,
    "name": title,
    "slug": slug.current,
    "state": destination,
    "image": coverImage.asset->url,
    "price": startingPrice,
    duration,
    badge,
    category
  }
`;

export const oneDayTripsQuery = `
  *[_type == "trip" && tripType == "oneDay"] | order(_createdAt desc) {
    _id,
    title,
    "name": title,
    "slug": slug.current,
    "state": destination,
    "image": coverImage.asset->url,
    "price": startingPrice,
    duration,
    badge
  }
`;

// ===================================
// SINGLE TRIP BY SLUG (Includes Meals, Stay & PDF Resolvers)
// ===================================
export const tripBySlugQuery = `
  *[_type == "trip" && slug.current == $slug][0]{
    ...,
    "image": coverImage.asset->url,
    itineraries[]{
      ...,
      "pdfUrl": pdf.asset->url,
      "pdfName": pdf.asset->originalFilename,
      days[]{
        ...,
        day,
        title,
        description,
        meals,
        stay,
        "dayImageUrl": dayImage.asset->url
      }
    }
  }
`;

// ===================================
// GALLERY
// ===================================
export const galleryQuery = `
  *[
    _type == "gallery" &&
    featured == true
  ] | order(_createdAt desc) {
    _id,
    title,
    location,
    image
  }
`;



export const testimonialsQuery = `
  *[
    _type == "testimonial" &&
    featured == true
  ] | order(_createdAt desc) {
    _id,
    name,
    trip,
    quote,
    rating,
    userHandle,
    location,
    "videoUrl": video.asset->url
  }
`;