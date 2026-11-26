"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import {
  clampAnnualTripTarget,
  getFunnelValues,
  INITIAL_ANNUAL_TRIP_TARGET,
  type ScenarioIndex,
} from "@/lib/greenhouse-calculator"
import { CareerSection } from "./career-section"
import { ContactSection } from "./contact-section"
import { HeroSection } from "./hero-section"
import { InvitationSection } from "./invitation-section"
import { ProcessSection } from "./process-section"
import { ProjectionSection } from "./projection-section"
import { RouteSection } from "./route-section"
import { SiteNavigation } from "./site-navigation"
import { ValueSection } from "./value-section"
import { WorkSection } from "./work-section"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const WHATSAPP_NUMBER = "5522000000000"

export function GreenhouseLanding() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [annualTrips, setAnnualTrips] = useState(INITIAL_ANNUAL_TRIP_TARGET)
  const [selectedScenario, setSelectedScenario] = useState<ScenarioIndex>(0)
  const [selectedMonth, setSelectedMonth] = useState(3)
  const [formStatus, setFormStatus] = useState("")
  const funnel = getFunnelValues()

  useEffect(() => {
    const page = pageRef.current
    const route = page?.querySelector<HTMLElement>("#rota")
    const track = route?.querySelector<HTMLElement>(".track")
    if (!route || !track) return

    const horizontalMotion = window.matchMedia("(min-width: 800px) and (prefers-reduced-motion: no-preference)")
    let frame = 0

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
    const updatePosition = () => {
      if (!route.classList.contains("hx")) return
      const travel = distance()
      const progress = Math.min(1, Math.max(0, -route.getBoundingClientRect().top / Math.max(1, travel)))
      track.style.transform = `translate3d(${(-travel * progress).toFixed(1)}px, 0, 0)`
    }
    const schedulePosition = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updatePosition()
      })
    }
    const resizeRoute = () => {
      if (!horizontalMotion.matches) {
        route.classList.remove("hx")
        route.style.height = ""
        track.style.transform = ""
        return
      }

      route.classList.add("hx")
      route.style.height = `${distance() + window.innerHeight}px`
      updatePosition()
    }

    window.addEventListener("scroll", schedulePosition, { passive: true })
    window.addEventListener("resize", resizeRoute)
    horizontalMotion.addEventListener("change", resizeRoute)
    resizeRoute()

    return () => {
      window.removeEventListener("scroll", schedulePosition)
      window.removeEventListener("resize", resizeRoute)
      horizontalMotion.removeEventListener("change", resizeRoute)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useGSAP(() => {
    const page = pageRef.current
    if (!page) return

    const motion = gsap.matchMedia()
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero h1, .hero p, .hero .cta, .hero .stats", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power2.out",
      })

      page.querySelectorAll<HTMLElement>("section:not(.rota) .bg, .photo-image-layer").forEach((layer) => {
        const trigger = layer.parentElement
        if (!trigger) return
        gsap.fromTo(layer, { yPercent: -6 }, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
        })
      })

      gsap.from(".nv", {
        height: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".niveis", start: "top 80%" },
      })
    })

    return () => motion.revert()
  }, { scope: pageRef })

  const updateAnnualTrips = (value: number) => {
    setAnnualTrips(clampAnnualTripTarget(value))
  }

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `Olá! Quero ser consultor do Surf Trip Club. Nome: ${String(data.get("nome") ?? "")}. Cidade: ${String(data.get("cid") ?? "")}. Experiência: ${String(data.get("exp") ?? "")}. E-mail: ${String(data.get("mail") ?? "")}. WhatsApp: ${String(data.get("zap") ?? "")}.`

    if (WHATSAPP_NUMBER === "5522000000000") {
      setFormStatus("O formulário está pronto, mas falta configurar o número comercial real do WhatsApp da Greenhouse.")
      return
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    setFormStatus("Recebido. Falta só enviar a mensagem no WhatsApp.")
  }

  return (
    <div className="page-shell" ref={pageRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteNavigation />
      <main id="conteudo">
        <HeroSection />
        <InvitationSection />
        <RouteSection />
        <ProcessSection />
        <WorkSection rates={funnel.rates} counts={funnel.counts} />
        <ValueSection
          annualTrips={annualTrips}
          selectedScenario={selectedScenario}
          onAnnualTripsChange={updateAnnualTrips}
          onScenarioSelect={setSelectedScenario}
        />
        <ProjectionSection
          selectedScenario={selectedScenario}
          selectedMonth={selectedMonth}
          onScenarioSelect={setSelectedScenario}
          onMonthSelect={setSelectedMonth}
        />
        <CareerSection />
        <ContactSection status={formStatus} onSubmit={submitContact} />
      </main>
      <footer>
        <p>Greenhouse Saqua · Surf Trip Club · Saquarema, Rio de Janeiro.</p>
        <p className="footer-note">Fontes: Apresentação Visual Saquarema 2026–2027 e Projeção e Funil Surf Trips. Metas ilustrativas, condições sujeitas à formalização; imagens ilustrativas.</p>
      </footer>
    </div>
  )
}
