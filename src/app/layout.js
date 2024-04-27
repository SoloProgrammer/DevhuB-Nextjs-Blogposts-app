import { Inter } from "next/font/google";
import "./globals.css";
import "./highlight-js.css";
import "./globalicons.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeContextprovider } from "@/context/ThemeContext";
import MUIThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import AuthUser from "@/components/Auth/AuthUser";
const inter = Inter({ subsets: ["latin"] });
import "react-loading-skeleton/dist/skeleton.css";
import ToastProvider from "@/providers/ToastProvider";

export const metadata = {
  title: "DevhuB - Home",
  description: "Discover creative ideas, stories & best articles about development",
  openGraph:{
    images:['/og_image.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <ThemeContextprovider>
              <MUIThemeProvider>
                <ToastProvider>
                  <div className="container">
                    <div className="wrapper">
                      <Navbar />
                      <div className="children">{children}</div>
                      <Footer />
                    </div>
                    <AuthUser />
                  </div>
                </ToastProvider>
              </MUIThemeProvider>
            </ThemeContextprovider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
