export const metadata = {
  title: "Selma App",
  description: "Site de statistiques sportives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
