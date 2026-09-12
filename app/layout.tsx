import './globals.css'

export const metadata = {
  title: 'AgroSense AI',
  description: 'AI Farming Copilot for African Smallholder Farmers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}