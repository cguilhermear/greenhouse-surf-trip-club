import { ScenicBackground } from "./scenic-background"

export function HeroSection() {
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <ScenicBackground source="/images/hero.jpg" priority position="68% 40%" />
      <span className="eyebrow hero-eyebrow">SAQUAREMA · RIO DE JANEIRO · BRASIL</span>
      <h1 id="hero-title">Seu público quer surfar. Nós levamos até a onda.</h1>
      <p>Uma operação de experiências de surf em grupo, com Saquarema como base e quatro destinos na costa do Rio.</p>
      <div className="cta">
        <a className="btn" href="#contato">Quero ser consultor</a>
        <a className="btn ghost" href="#valores">Simular minha meta anual</a>
      </div>
      <div className="stats" aria-label="Metas e destinos do plano comercial">
        <div><span className="num">4</span>destinos no calendário</div>
        <div><span className="num">12</span>Surf Trips/ano por influenciador · meta</div>
        <div><span className="num">10</span>pagantes por viagem · referência</div>
      </div>
      <span className="cap">Itaúna, Saquarema · imagem ilustrativa</span>
    </section>
  )
}
