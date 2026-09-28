import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AETHER — Beyond the ordinary",
  description: "A study in motion, light, and possibility. An immersive film controlled by your scroll.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
