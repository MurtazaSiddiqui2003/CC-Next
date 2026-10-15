import "./globals.css";

export const metadata = {
  title: "Murtaza Siddiqui — Digital Creator & Builder",
  description:
    "I build thoughtful digital experiences, e-commerce websites, brands, and creative content for people with ideas worth bringing to life.",
  openGraph: {
    title: "Murtaza Siddiqui — Digital Creator & Builder",
    description: "Digital experiences. Creative ideas. Real-world solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
