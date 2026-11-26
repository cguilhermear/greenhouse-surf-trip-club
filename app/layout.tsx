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
  title: "Greenhouse Surf Trip Club — O mar chama. A galera fica.",
  description:
    "Saquarema é o encontro. O surf é a desculpa. Conheça a Greenhouse Surf Trip Club: viagens de surf em grupo, comunidade e novas rotas pelo litoral do Rio.",
  openGraph: {
    title: "Greenhouse Surf Trip Club — O mar chama. A galera fica.",
    description:
      "Uma jornada de surf, estrada e gente boa em Saquarema e na Região dos Lagos.",
    locale: "pt_BR",
    siteName: "Greenhouse Surf Trip Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenhouse Surf Trip Club — O mar chama. A galera fica.",
    description:
      "Uma jornada de surf, estrada e gente boa em Saquarema e na Região dos Lagos.",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#082d2b",
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
