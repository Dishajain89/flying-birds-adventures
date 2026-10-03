import { client } from "@/sanity/lib/client";
import { testimonialsQuery } from "@/sanity/lib/queries";
import Testimonials from "./Testimonials";

export default async function TestimonialsData() {
  const testimonials = await client.fetch(testimonialsQuery);

  console.log("SANITY TESTIMONIALS:", testimonials);

  const data = testimonials.map((item) => ({
    id: item._id,
    name: item.name,
    trip: item.trip,
    quote: item.quote,
    rating: item.rating,
    location: item.location,
    videoUrl: item.videoUrl,
  }));

  console.log("TESTIMONIAL VIDEO URL:", data[0]?.videoUrl);

  return <Testimonials testimonials={data} />;
}

