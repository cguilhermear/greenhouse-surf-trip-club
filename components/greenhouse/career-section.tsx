const levels = [
  { name: "Júnior", income: "R$ 2 a 4 mil por mês", height: "30%" },
  { name: "Pleno", income: "R$ 5 a 9 mil por mês", height: "55%" },
  { name: "Sênior", income: "R$ 9 a 14 mil por mês", height: "80%" },
  { name: "Líder regional", income: "A negociar", height: "100%" },
]

export function CareerSection() {
  return (
    <section className="light" id="carreira" aria-labelledby="career-title">
      <div className="car">
        <div>
          <h2 id="career-title">Uma carreira que pode começar com uma viagem.</h2>
          <p>Aprenda a reunir pessoas e crescer com a comunidade. O caminho começa com três semanas de treinamento e 60 reuniões comerciais no total.</p>
          <div className="sem">
            <div><span>Semana 1</span><b className="num">10 reuniões</b></div>
            <div><span>Semana 2</span><b className="num">20 reuniões</b></div>
            <div><span>Semana 3</span><b className="num">30 reuniões</b></div>
          </div>
          <p className="aviso">Faixas são metas ilustrativas de ganhos, não salários garantidos.</p>
        </div>
        <div className="niveis" aria-label="Níveis de carreira e metas ilustrativas de renda">
          {levels.map((level) => (
            <div className="nv" key={level.name} style={{ height: level.height }}>
              <b>{level.name}</b>
              <span>{level.income}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
