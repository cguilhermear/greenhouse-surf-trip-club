"use client"

import { type PointerEvent } from "react"
import { ArrowDown, ArrowUpRight, Waves } from "lucide-react"
import { ScenicBackground } from "./scenic-background"

export function HeroSection() {
  const guideCurrent = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

  return (
    <section
      className="hero"
      id="topo"
      aria-labelledby="hero-title"
      onPointerMove={guideCurrent}
    >
      <ScenicBackground source="/images/praia.jpg" priority position="5% 48%" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-photo-note">
          <span className="hero-note-mark"><Waves aria-hidden="true" /></span>
          <span>Saquarema, RJ<br /><b>onde tudo começa</b></span>
        </div>
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><i aria-hidden="true" /> GREENHOUSE SURF TRIP CLUB</span>
          <h1 id="hero-title">O mar chama.<br /><em>A galera fica.</em></h1>
          <p>Saquarema é o encontro. O surf é a desculpa. O que a gente leva pra casa — e já quer viver de novo — é a história que nasce entre uma onda e outra.</p>
          <div className="hero-actions">
            <a className="hero-primary" href="#contato">Quero levar minha galera <ArrowUpRight aria-hidden="true" /></a>
            <a className="hero-secondary" href="#convite">
              Entrar na experiência <ArrowDown aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof" aria-label="O espírito da viagem">
            <span>Mar de verdade</span><i aria-hidden="true" /><span>Gente boa</span><i aria-hidden="true" /><span>Vontade de voltar</span>
          </div>
        </div>
      </div>
      <div className="hero-bottomline">
        <span>22°55&apos; S · 42°30&apos; W</span>
        <span className="hero-bottom-message">A primeira onda é só o começo.</span>
        <span>ARRASTE PARA SENTIR A MARÉ <ArrowDown aria-hidden="true" /></span>
      </div>
      <div className="hero-wave-curtain" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0 0h1440v690c-126 39-223 85-358 47-117-33-193-124-331-113-130 11-225 127-360 134C244 766 111 677 0 711V0Z" />
        </svg>
      </div>
    </section>
  )
}
