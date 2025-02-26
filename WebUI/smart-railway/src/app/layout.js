import "./globals.css";

export const metadata = {
  title: "SMART RAILWAY",
  description: "Rail Gateway & Surveillance Control System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}