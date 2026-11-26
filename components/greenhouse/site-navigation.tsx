const navigationLinks = [
  { href: "#convite", label: "O clube" },
  { href: "#rota", label: "Destinos" },
  { href: "#trabalho", label: "Como funciona" },
  { href: "#valores", label: "Simulador" },
  { href: "#carreira", label: "Carreira" },
]

export function SiteNavigation() {
  return (
    <header className="site-nav">
      <a className="site-brand" href="#topo" aria-label="Greenhouse Saqua, Surf Trip Club">
        <span className="brand-mark" aria-hidden="true">GH</span>
        <span className="brand-copy">
          <strong>GREENHOUSE SAQUA</strong>
          <small>SURF TRIP CLUB</small>
        </span>
      </a>
      <nav aria-label="Navegação principal">
        {navigationLinks.map((link) => (
          <a href={link.href} key={link.href}>{link.label}</a>
        ))}
      </nav>
      <a className="nav-cta" href="#contato">
        Quero participar <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}
