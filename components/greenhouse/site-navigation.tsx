import { ArrowUpRight, Waves } from "lucide-react"

const navigationLinks = [
  { href: "#convite", label: "A experiência" },
  { href: "#rota", label: "Roteiro" },
  { href: "#como", label: "Como acontece" },
  { href: "#valores", label: "Projeção" },
]

export function SiteNavigation() {
  return (
    <header className="site-nav">
      <a className="site-brand" href="#topo" aria-label="Greenhouse Surf Trip Club — voltar ao início">
        <span className="brand-mark" aria-hidden="true"><Waves /></span>
        <span className="brand-copy">
          <strong>GREENHOUSE</strong>
          <small>SURF TRIP CLUB · SAQUAREMA</small>
        </span>
      </a>
      <nav aria-label="Navegação principal">
        {navigationLinks.map((link) => (
          <a href={link.href} key={link.href}>{link.label}</a>
        ))}
      </nav>
      <a className="nav-cta" href="#contato">
        Entrar no clube <ArrowUpRight aria-hidden="true" />
      </a>
    </header>
  )
}
