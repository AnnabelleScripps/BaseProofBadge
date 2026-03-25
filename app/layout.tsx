import './globals.css';
import { Providers } from './providers';
import {
  APP_DESCRIPTION,
  APP_ID,
  APP_NAME,
  APP_URL,
  OG_IMAGE_URL,
  TALENT_VERIFICATION,
} from '@/lib/contract';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta
          name="keywords"
          content="Base, Base mini app, tasks, notes, onchain, productivity"
        />
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="theme-color" content="#0b1020" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="base:app_id" content={APP_ID} />
        <meta
          name="talentapp:project_verification"
          content={TALENT_VERIFICATION}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:url" content={APP_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:alt" content={`${APP_NAME} preview`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={APP_NAME} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <link rel="canonical" href={APP_URL} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
