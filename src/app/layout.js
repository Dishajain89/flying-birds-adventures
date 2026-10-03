import { Poppins, Inter, Bungee_Inline, Josefin_Sans } from "next/font/google";
import "@/styles/globals.scss";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ConditionalLayout from "@/components/layout/ConditionalLayout/ConditionalLayout";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const bungeeInline = Bungee_Inline({
  subsets: ["latin"],
  variable: "--font-bungee-inline",
  weight: "400",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Flying Birds Adventure",
  description: "Explore Incredible India with Flying Birds Adventure",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${bungeeInline.variable} ${josefinSans.variable}`}>
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