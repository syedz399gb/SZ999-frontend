import "./globals.css";

export const metadata = {
  title: "SZ-999 | Online Gaming Lobby",
  description: "SZ-999 Mobile Gaming Dashboard - Aviator, Teen Patti, Slots & Crash Games",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-[#07090d]">
      <body className="min-h-screen bg-[#07090d] text-gray-100 flex justify-center antialiased">
        {children}
      </body>
    </html>
  );
}
