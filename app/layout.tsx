import "./globals.css";

export const metadata = {
  title: "Trump Market Watch",
  description: "Trump statements, disclosures and market reaction in JST"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
