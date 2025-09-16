import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";

export const metadata = {
  metadataBase: new URL("https://postgres-prisma.vercel.app"),
  title: "Velora Capital",
  description: "Manage, create, and analyze loans—all in one place.",
};

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} bg-background text-primary`}>
        <main className="relative flex min-h-screen flex-col items-center pt-16 sm:pt-20 lg:pt-24 px-4">
          <div className="w-full max-w-7xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
