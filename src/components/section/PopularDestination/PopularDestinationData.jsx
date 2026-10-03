import { client } from "@/sanity/lib/client";
import { popularTripsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PopularDestination from "./PopularDestination";

export default async function PopularDestinationsData() {
  // Fetch trips (Includes both domestic & international for tabs/toggle)
  const sanityTrips = (await client.fetch(popularTripsQuery)) || [];

  const trips = sanityTrips.map((trip) => {
    // 🛡️ Safe Image URL Resolver (Crash Proof)
    const getSafeImage = () => {
      // 1. Agar query se already resolved image URL aa raha ho
      if (typeof trip.image === "string" && trip.image.trim() !== "") {
        return trip.image;
      }

      // 2. Agar raw Sanity image asset object ho
      if (trip.coverImage && (trip.coverImage.asset || trip.coverImage._ref)) {
        try {
          return urlFor(trip.coverImage).width(1200).url();
        } catch (err) {
          console.warn(`Image resolution failed for trip: ${trip.title}`, err);
        }
      }

      // 3. Fallback placeholder agar Sanity me image upload na hui ho
      return "/images/destinations/manali.jpg";
    };

    return {
      id: trip._id,
      // Slug string handle karne ke liye (chahe string ho ya slug.current)
      slug: typeof trip.slug === "string" ? trip.slug : trip.slug?.current || trip._id,

      // Basic Info
      name: trip.name || trip.title || "Untitled Trip",
      title: trip.title,
      state: trip.state || trip.destination || "",

      // Trip Details
      duration: trip.duration || "Flexible",
      price: trip.price || trip.startingPrice || 0,

      // Safe Image
      image: getSafeImage(),

      // Badge
      badge: trip.badge || null,

      // Filter Props (Tabs & International Switch ke liye zaroori)
      category: trip.category || "weekend",
      tripType: trip.tripType || "domestic",
      isInternational: trip.tripType === "international",
    };
  });

  return <PopularDestination trips={trips} />;
}