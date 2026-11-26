"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

const chapters = [
  { id: "topo", label: "A chegada", short: "01" },
  { id: "convite", label: "O sentimento", short: "02" },
  { id: "rota", label: "A costa", short: "03" },
  { id: "como", label: "A experiência", short: "04" },
  { id: "trabalho", label: "A comunidade", short: "05" },
  { id: "valores", label: "O modelo", short: "06" },
  { id: "projecao", label: "A projeção", short: "07" },
  { id: "carreira", label: "O caminho", short: "08" },
  { id: "contato", label: "A próxima onda", short: "09" },
]

export function SurfProgress() {
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState(chapters[0].id)
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeId))

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const nextProgress = Math.round(Math.min(1, Math.max(0, window.scrollY / maximum)) * 100)
      setProgress((current) => current === nextProgress ? current : nextProgress)

      const readingLine = window.innerHeight * 0.42
      const currentChapter = chapters.reduce((closest, chapter) => {
        const section = document.getElementById(chapter.id)
        if (!section) return closest
        const distance = Math.abs(section.getBoundingClientRect().top - readingLine)
        return distance < closest.distance ? { id: chapter.id, distance } : closest
      }, { id: chapters[0].id, distance: Number.POSITIVE_INFINITY })

      setActiveId((current) => current === currentChapter.id ? current : currentChapter.id)
    }

    const scheduleUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <aside className="surf-progress" aria-label="Progresso da jornada">
      <div className="surf-progress-readout" aria-live="polite" aria-atomic="true">
        <span className="surf-progress-count">{chapters[activeIndex].short}<span>/09</span></span>
        <span className="surf-progress-label">{chapters[activeIndex].label}</span>
      </div>
      <nav className="surf-progress-nav" aria-label="Etapas da jornada">
        <div className="surfboard-track" aria-hidden="true">
          <span className="surfboard-fill" style={{ height: `${progress}%` }} />
        </div>
        {chapters.map((chapter, index) => (
          <a
            className={`surf-progress-stop${activeId === chapter.id ? " is-active" : ""}`}
            href={`#${chapter.id}`}
            key={chapter.id}
            aria-label={`${chapter.short} · ${chapter.label}`}
            aria-current={activeId === chapter.id ? "location" : undefined}
            style={{ "--stop-position": `${(index / (chapters.length - 1)) * 100}%` } as React.CSSProperties}
          >
            <span className="sr-only">{chapter.label}</span>
          </a>
        ))}
      </nav>
      <span className="surf-progress-hint" aria-hidden="true"><ArrowDown /> Siga a onda</span>
    </aside>
  )
}
