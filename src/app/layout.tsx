import type { Metadata } from "next"
import { Roboto, Roboto_Condensed, Roboto_Mono } from "next/font/google"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"

import "./globals.css"

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

export const metadata: Metadata = {
  title: {
    default: "Lipari Consulting",
    template: "%s | Lipari Consulting"
  },
  description: "Il valore in ognuno di noi."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO: `lang` should follow whatever locale the backend resolves once
  // content is fetched from there instead of the local fixture.
  return (
    <html
      lang="it"
      className={`${roboto.variable} ${robotoMono.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="text-brand-blue-950 flex min-h-full flex-col bg-slate-100 font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
