import "@/styles/globals.css";
import type { Metadata } from "next";
import { Comfortaa, Inter, Pacifico } from "next/font/google";
import React from "react";
import ThemeProviders from "@/providers/theme/theme-provider";
import { ReduxProvider } from "@/providers/store/redux-provider";
import CartProvider from "@/providers/components/cart-provider";
import UserProvider from "@/providers/components/user-provider";
import ProductProvider from "@/providers/components/product-provider";
import { Analytics } from "@vercel/analytics/react";
import ContextProvider from "@/providers/store/context-provider";
import ReactQueryProvider from "@/providers/react-query/react-query-provider";
import CheckUserProvider from "@/providers/security/check-user";
import RouteTracker from "@/security/path-track/path-track";
import Layout from "@/app/layout/layout";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { globalBgConfig } from "@/color/global-bg-config";
import { NextUiProviders } from "@/providers/theme/next-ui-provider";

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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <ReactQueryProvider>
        <ReduxProvider>
          <ContextProvider>
            <ThemeProviders>
              <body
                className={`${inter.className} ${comfortaa.variable}  ${pacifico.variable} ${globalBgConfig}  min-h-screen bg-no-repeat bg-cover bg-fixed `}
              >
                <CheckUserProvider>
                  <ProductProvider>
                    <UserProvider>
                      <CartProvider>
                        <RouteTracker>
                          <NextUiProviders>
                            <Layout>{children}</Layout>
                          </NextUiProviders>
                          {modal}
                        </RouteTracker>
                        <Analytics />
                      </CartProvider>
                    </UserProvider>
                  </ProductProvider>
                </CheckUserProvider>
              </body>
            </ThemeProviders>
          </ContextProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </html>
  );
}
