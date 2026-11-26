"use client"

import { useState } from "react"
import Image from "next/image"

const moments = [
  {
    time: "ANTES DO MAR",
    title: "A viagem começa no grupo.",
    description: "A playlist já está pronta, as pranchas vão no carro e alguém manda: ‘quem vai nessa?’ A expectativa também faz parte da trip.",
    image: "/images/praia.jpg",
    alt: "Amigos reunidos à beira-mar com pranchas de surf",
  },
  {
    time: "DENTRO D’ÁGUA",
    title: "Cada um encontra sua onda.",
    description: "Com orientação de quem conhece o mar, o primeiro drop e a próxima tentativa viram parte da mesma história — sem pressa, no seu ritmo.",
    image: "/images/hero.jpg",
    alt: "Surfista atravessando uma onda no fim da tarde",
  },
  {
    time: "DEPOIS DA SESSÃO",
    title: "O melhor ainda continua.",
    description: "A areia sai do pé. A resenha, não. A galera volta pra casa com novos amigos e um motivo muito bom pra combinar a próxima.",
    image: "/images/destino-saquarema.jpg",
    alt: "O mar e as montanhas de Saquarema em uma tarde de surf",
  },
]

export function InvitationSection() {
  const [activeMoment, setActiveMoment] = useState(0)
  const moment = moments[activeMoment]

  return (
    <section className="light invitation" id="convite" aria-labelledby="invitation-title">
      <div className="invitation-layout">
        <div className="invitation-copy">
          <span className="eyebrow"><i aria-hidden="true" /> MAIS QUE UMA VIAGEM</span>
          <h2 id="invitation-title">O destino é Saquarema. <em>O motivo pra voltar é a galera.</em></h2>
          <p>Surf não é só a onda que você pega. É o café antes, a primeira queda, o almoço que vira tarde e aquela turma que já começa a planejar a próxima antes de tirar a areia da mochila.</p>
          <div className="invitation-stats" aria-label="Referências do plano comercial">
            <div><span className="num">12</span><span>Surf Trips por ano · meta por influenciador</span></div>
            <div><span className="num">10</span><span>pagantes por viagem · referência</span></div>
            <div><span className="num">≈90</span><span>dias até a próxima oferta · referência</span></div>
          </div>
          <a className="text-link" href="#rota">Ver a costa que nos espera <span aria-hidden="true">↗</span></a>
        </div>

        <div className="experience-card">
          <div className="experience-image">
            <Image
              key={moment.image}
              src={moment.image}
              alt={moment.alt}
              fill
              sizes="(max-width: 900px) 90vw, 48vw"
              quality={94}
              className="experience-photo"
            />
            <span className="experience-time"><i aria-hidden="true" /> {moment.time}</span>
            <span className="experience-index">0{activeMoment + 1}<span> / 03</span></span>
          </div>
          <div className="experience-caption" aria-live="polite" aria-atomic="true">
            <div>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          </div>
          <div className="experience-controls" role="group" aria-label="Momentos da surftrip">
            {moments.map((item, index) => (
              <button
                type="button"
                key={item.time}
                aria-pressed={activeMoment === index}
                onClick={() => setActiveMoment(index)}
              >
                <span>0{index + 1}</span>{item.time === "DENTRO D’ÁGUA" ? "NA ÁGUA" : item.time === "DEPOIS DA SESSÃO" ? "PÓS-MAR" : "A CHEGADA"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
