import "@/styles/globals.scss";
import BirdPageTransition from "@/components/common/BirdPageTransition/BirdPageTransition";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ConditionalLayout from "@/components/layout/ConditionalLayout/ConditionalLayout";

export const metadata = {
  title: "Flying Birds Adventures",
  description: "Explore Incredible India with Flying Birds Adventure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BirdPageTransition />
        <ConditionalLayout
          navbar={<Navbar />}
          footer={<Footer />}
        >
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}