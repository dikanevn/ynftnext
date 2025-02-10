import '@solana/wallet-adapter-react-ui/styles.css'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="p-1">
        {children}
      </body>
    </html>
  )
}
