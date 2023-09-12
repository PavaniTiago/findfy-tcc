import Header from '@/components/header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FindFy',
  description: 'Plataforma de streaming com inteligência artifical',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`overflow-hidden ${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
