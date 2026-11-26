"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { FUNNEL_STAGES, formatPercent } from "@/lib/greenhouse-calculator"

type WorkSectionProps = {
  rates: number[]
  counts: number[]
}

function FunnelCount({ value, animate }: { value: number; animate: boolean }) {
  const [displayedValue, setDisplayedValue] = useState(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!animate || hasAnimated.current) {
      setDisplayedValue(value)
      return
    }

    hasAnimated.current = true
    let frame = 0
    let startTime: number | null = null

    const tick = (time: number) => {
      if (startTime === null) startTime = time
      const progress = Math.min(1, (time - startTime) / 1000)
      setDisplayedValue(Math.round(value * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setDisplayedValue(value)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animate, value])

  return <b className="num">{displayedValue.toLocaleString("pt-BR")}</b>
}

export function WorkSection({ rates, counts }: WorkSectionProps) {
  const funnelRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const funnel = funnelRef.current
    if (!funnel) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      setEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(funnel)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="trab" id="trabalho" aria-labelledby="work-title">
      <div className="split">
        <div>
          <h2 id="work-title">Toda boa trip começa com alguém que junta pessoas.</h2>
          <p>O papel do consultor não é empurrar uma viagem. É reconhecer quem compartilha essa energia, conectar a Greenhouse a criadores de surf, praia, esporte e viagem, e fazer um grupo sair da conversa e chegar à água. A referência parte de 10 novos contatos por semana.</p>
          <div className="crit">
            <div><h3>Público</h3><p>Seguidores no Brasil ou no exterior que interagem com surf e viagens em grupo.</p></div>
            <div><h3>Engajamento</h3><p>Comentários e perguntas que mostram interesse nas experiências.</p></div>
            <div><h3>Disponibilidade</h3><p>Data para visitar a Greenhouse, produzir conteúdo e divulgar o cupom.</p></div>
            <div><h3>Potencial de viagem</h3><p>Experiência em organizar encontros ou mobilizar um grupo.</p></div>
          </div>
          <p>Priorize indicações e quem já conhece a Greenhouse ou demonstrou interesse.</p>
        </div>
        <div className={`fun${entered ? "" : " pre"}`} id="fun" ref={funnelRef} aria-labelledby="f-title">
          <h3 id="f-title" aria-label={`Funil para fechar ${counts[4].toLocaleString("pt-BR")} ${counts[4] === 1 ? "Surf Trip" : "Surf Trips"} por mês`}>Funil para fechar {counts[4].toLocaleString("pt-BR")} {counts[4] === 1 ? "Surf Trip" : "Surf Trips"} por mês</h3>
          <p>{counts[0]} abordagens por mês. As taxas abaixo são calculadas sobre o total de abordagens, conforme o plano comercial.</p>
          <div className="funnel-rows" role="list" aria-label="Etapas do funil de prospecção">
            {FUNNEL_STAGES.map((stage, index) => {
              const count = counts[index] ?? 0
              const rate = rates[index] ?? 0
              const width = Math.min(100, Math.max(0, rate))

              return (
                <div className="fr" key={stage} role="listitem" aria-label={`${stage}: ${count} (${formatPercent(rate)}%)`}>
                  <div className="l">
                    <span>{index === 0 ? stage : `${stage} · ${formatPercent(rate)}% das abordagens`}</span>
                    <FunnelCount value={count} animate={entered} />
                  </div>
                  <div className="t" aria-hidden="true">
                    <i style={{ "--w": `${width}%` } as CSSProperties} />
                  </div>
                </div>
              )
            })}
          </div>
          <p className="aviso">Uma viagem conta como fechada quando o grupo atinge o mínimo de pagantes do destino. Metas de referência do plano comercial.</p>
        </div>
      </div>
    </section>
  )
}
