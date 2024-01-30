import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa, Inter, Pacifico } from "next/font/google";
import React from "react";
import ThemeProviders from "@/providers/theme-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import CartProvider from "@/providers/cart-provider";
import UserProvider from "@/providers/user-provider";
import ProductProvider from "@/providers/product-provider";
import { Analytics } from "@vercel/analytics/react";
import ContextProvider from "@/providers/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReStock",
  description: "Your Final Destination for Used PC Parts",
};
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <ReduxProvider>
        <ContextProvider>
          <ThemeProviders>
            <body
              className={`${inter.className} ${comfortaa.variable}  ${pacifico.variable} box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25) h-fit bg-gradient-to-r from-zinc-300 via-neutral-300 to-slate-300 dark:from-zinc-700 dark:via-neutral-700 dark:to-slate-700`}
            >
              <ProductProvider>
                <UserProvider>
                  <CartProvider>
                    {children} <Analytics />
                  </CartProvider>
                </UserProvider>
              </ProductProvider>
            </body>
          </ThemeProviders>
        </ContextProvider>
      </ReduxProvider>
    </html>
  );
}
