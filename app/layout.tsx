import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids Furniture Kenya | Little spaces, big dreams",
  description: "Discover thoughtfully made children's beds, study furniture, storage and more from Kids Furniture Kenya.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
