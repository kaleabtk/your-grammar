import "./globals.css";

export const metadata = {
  title: "Your Grammar",
  description: "Check your sentence grammar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
