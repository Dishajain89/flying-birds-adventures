import { client } from "@/sanity/lib/client";
import { internationalTripsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import TripCards from "./TripCards";

export default async function InternationalCardsData({ tagline, title, subtitle }) {
  const sanityTrips = await client.fetch(internationalTripsQuery);

  const trips = sanityTrips.map((trip) => ({
    id: trip._id,
    slug: trip.slug?.current,
    name: trip.title,
    state: trip.destination,
    duration: trip.duration,
    price: trip.startingPrice,
    image: trip.coverImage ? urlFor(trip.coverImage).width(1200).url() : null,
    badge: trip.badge,
  }));

  return (
    <TripCards
      tagline={tagline}
      title={title}
      subtitle={subtitle}
      trips={trips}
    />
  );
}
