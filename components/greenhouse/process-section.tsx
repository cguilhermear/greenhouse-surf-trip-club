import { ScenicBackground } from "./scenic-background"
import { SectionSeparator } from "./section-separator"

const steps = [
  { number: "1", title: "Captar", description: "Prospecção, apresentação e formalização com o influenciador." },
  { number: "2", title: "Vender", description: "Divulgação, reservas e confirmação do grupo no mínimo de pagantes." },
  { number: "3", title: "Viajar", description: "A Greenhouse executa a viagem, com instrutores e logística." },
  { number: "4", title: "Voltar", description: "Pagamento após a viagem e nova oferta ao grupo em cerca de 90 dias." },
]

export function ProcessSection() {
  return (
    <section className="como" id="como" aria-labelledby="process-title">
      <SectionSeparator color="#1B5E70" />
      <ScenicBackground source="/images/onda.jpg" />
      <h2 id="process-title">Como funciona, do primeiro papo à próxima viagem.</h2>
      <div className="atos">
        {steps.map((step) => (
          <article className="ato" key={step.number}>
            <span className="num">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
