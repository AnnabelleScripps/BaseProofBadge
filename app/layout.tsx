import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "BaseProofBadge - On-chain Proof & Badge System",
  description: "Generate on-chain verification badges and record user actions for transparent, traceable participation history.",
  keywords: ["Base", "NFT", "Badge", "Proof", "Web3", "Blockchain"],
  authors: [{ name: "BaseProofBadge" }],
  openGraph: {
    title: "BaseProofBadge",
    description: "Generate on-chain verification badges and record user actions",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BaseProofBadge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseProofBadge",
    description: "Generate on-chain verification badges and record user actions",
    images: ["/og-image.png"],
  },
  other: {
    "base:app_id": "69c0b42b76e804b2a67a9f91",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69c0b42b76e804b2a67a9f91" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
