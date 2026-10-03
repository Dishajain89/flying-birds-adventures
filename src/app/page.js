import Faq from "@/components/common/Faq/Faq";
import GallerySlider from "@/components/common/GallerySlider/GallerySlider";
import Hero from "@/components/section/Hero/Hero";
import InternationalTripsData from "@/components/section/InternationalTrips/InternationalTripData";
import OneDayTripsData from "@/components/section/OneDayTrips/OneDayTripsData";
import PopularDestinationsData from "@/components/section/PopularDestination/PopularDestinationData";
import TestimonialsData from "@/components/section/Testimonials/TestimonialsData";
import WhyUs from "@/components/section/WhyUs/WhyUs";
import CustomizedConnect from "@/components/ui/CustomizedConnect/CustomizedConnect";




export default function Home() {
  return (
    <div >
     <Hero />
     <PopularDestinationsData/>
     <OneDayTripsData/>
     <CustomizedConnect/>
     <InternationalTripsData/>
     <WhyUs/>
     <TestimonialsData/>
     <GallerySlider/>
     <Faq/>
    </div>
  );
}
