import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google"
import type { Metadata, Viewport } from "next"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "800"],
  variable: "--font-bricolage",
  display: "swap",
})

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-hanken",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Greenhouse Surf Trip Club",
  description:
    "Consultoria de surf trips da Greenhouse: destinos, comissões, projeções transparentes e oportunidades para consultores de viagens de surfe.",
  openGraph: {
    title: "Greenhouse Surf Trip Club",
    description:
      "Conheça o programa de consultoria de surf trips da Greenhouse, com viagens para Saquarema e projeções ilustrativas.",
    locale: "pt_BR",
    siteName: "Greenhouse Surf Trip Club",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Greenhouse Surf Trip Club",
    description:
      "Consultoria de surf trips, destinos e oportunidades para consultores de viagens de surfe.",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b2e34",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${bricolage.variable} ${hanken.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
