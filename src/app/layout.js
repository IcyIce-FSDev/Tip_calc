"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { Provider } from "react-redux"; // Import Provider
import store from "../../lib/redux/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tip Calculator",
  description: "Tip calculator challenge by frontendmentor.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
