import { ScenicBackground } from "./scenic-background"
import { SectionSeparator } from "./section-separator"

const steps = [
  { number: "01", title: "Juntar a galera", description: "Você aproxima criadores e pessoas que sonham em viver o surf de perto." },
  { number: "02", title: "Montar o encontro", description: "A turma escolhe a data, organiza as reservas e confirma o grupo mínimo." },
  { number: "03", title: "Entrar no mar", description: "A Greenhouse cuida da operação, da logística e dos instrutores." },
  { number: "04", title: "Querer voltar", description: "A experiência continua na memória — e a próxima oferta pode chegar em cerca de 90 dias." },
]

export function ProcessSection() {
  return (
    <section className="como" id="como" aria-labelledby="process-title">
      <SectionSeparator color="#1B5E70" />
      <ScenicBackground source="/images/onda.jpg" />
      <h2 id="process-title">Uma trip boa não começa na praia. Começa quando alguém chama.</h2>
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
