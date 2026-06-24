import { Bebas_Neue, Nunito } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import LenisProvider from "./components/LenisProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata = {
  title: "FuelBar — Premium Protein Bars",
  description:
    "25% Whey Protein · No Added Sugar · No Soya · Sweetened with Jaggery, Dates & Honey. Pan-India Delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${nunito.variable}`}>
      <body>
        <LenisProvider>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Navbar />
                <CartDrawer />
                {children}
                <Footer />
                <WhatsAppFloat />
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

