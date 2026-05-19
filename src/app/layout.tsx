import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/components/pwa/PWARegister";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "APPetit+",
    template: "%s | APPetit+",
  },
  description: "Nutrição inteligente com acompanhamento especializado. Receitas, planos alimentares e conteúdos educativos.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "APPetit+",
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: "APPetit+",
    description: "Nutrição inteligente com acompanhamento especializado.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#223B2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable}>
      <body className="min-h-svh bg-surface text-foreground antialiased">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
