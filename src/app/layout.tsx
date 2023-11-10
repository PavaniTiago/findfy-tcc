'use client'

import Header from '@/components/header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from './SessionProvider'
import { MyContextProvider } from './context/context'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
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
      <body className={`${inter.className}`}>
        <MyContextProvider>
          <SessionProvider>
            <Header />
            {children}
          </SessionProvider>
        </MyContextProvider>
      </body>
    </html>
  )
}
