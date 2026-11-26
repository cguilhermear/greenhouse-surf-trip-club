import { ShieldCheck } from "lucide-react"
import {
  formatCurrency,
  formatPercent,
  getAnnualProjection,
  getFinancialMetrics,
  MAX_ANNUAL_TRIP_TARGET,
  OFFICIAL_PLAN_VALUES,
  SCENARIO_ASSUMPTIONS,
  SCENARIOS,
  type ScenarioIndex,
} from "@/lib/greenhouse-calculator"
import { ScenicBackground } from "./scenic-background"

type ValueSectionProps = {
  annualTrips: number
  selectedScenario: ScenarioIndex
  onAnnualTripsChange: (value: number) => void
  onScenarioSelect: (scenario: ScenarioIndex) => void
}

export function ValueSection({ annualTrips, selectedScenario, onAnnualTripsChange, onScenarioSelect }: ValueSectionProps) {
  const { tripCommission, influencerReferenceIncome, influencerShare } = getFinancialMetrics()
  const scenario = SCENARIO_ASSUMPTIONS[selectedScenario]
  const annualProjection = getAnnualProjection(annualTrips, selectedScenario)
  const greenhouseShare = OFFICIAL_PLAN_VALUES.greenhouseReceiptPerGuest

  return (
    <section className="val" id="valores" aria-labelledby="price-title">
      <ScenicBackground source="/images/praia.jpg" position="center 60%" />
      <span className="eyebrow">PREMISSAS DO PLANO COMERCIAL</span>
      <h2 id="price-title">Números oficiais. Cenários claros.</h2>
      <p>O pacote padrão tem preço sugerido de {formatCurrency(OFFICIAL_PLAN_VALUES.clientPrice)} por pessoa. A comissão do consultor é calculada sobre o valor que a Greenhouse recebe.</p>
      <div className="share-meter" role="img" aria-label={`${formatCurrency(greenhouseShare)} recebidos pela Greenhouse e ${formatCurrency(influencerShare)} recebidos pelo influenciador, sobre o preço sugerido de ${formatCurrency(OFFICIAL_PLAN_VALUES.clientPrice)}`}>
        <span className="share-meter-greenhouse" style={{ width: `${(greenhouseShare / OFFICIAL_PLAN_VALUES.clientPrice) * 100}%` }} />
        <span className="share-meter-influencer" style={{ width: `${(influencerShare / OFFICIAL_PLAN_VALUES.clientPrice) * 100}%` }} />
      </div>
      <div className="share-legend">
        <span><i className="share-swatch greenhouse-swatch" aria-hidden="true" />Greenhouse recebe {formatCurrency(greenhouseShare)}</span>
        <span><i className="share-swatch influencer-swatch" aria-hidden="true" />Influenciador recebe {formatCurrency(influencerShare)}</span>
      </div>
      <div className="earn">
        <article>
          <h3>Comissão por viagem</h3>
          <span className="num">{formatCurrency(tripCommission)}</span>
          <p>{formatPercent(OFFICIAL_PLAN_VALUES.consultantCommissionPercent)}% dos {formatCurrency(OFFICIAL_PLAN_VALUES.greenhouseReceiptPerGuest)} recebidos pela Greenhouse, por participante elegível vendido por você. Pagamento após a viagem.</p>
        </article>
        <article>
          <h3>Chegada do influenciador</h3>
          <span className="num">R$ 100–200</span>
          <p>Faixa conforme audiência: 5–10 mil seguidores, R$ 100; acima de 10 mil até 100 mil, R$ 150; acima de 100 mil até 1 milhão, R$ 200.</p>
        </article>
        <article>
          <h3>Cupom de hospedagem</h3>
          <span className="num">{formatPercent(OFFICIAL_PLAN_VALUES.lodgingCouponCommissionPercent)}%</span>
          <p>Sobre reservas pagas pelo cupom. A meta de {formatCurrency(OFFICIAL_PLAN_VALUES.lodgingSalesTargetPerInfluencer)} gera {formatCurrency((OFFICIAL_PLAN_VALUES.lodgingSalesTargetPerInfluencer * OFFICIAL_PLAN_VALUES.lodgingCouponCommissionPercent) / 100)} para o consultor.</p>
        </article>
      </div>

      <div className="simulator" aria-labelledby="simulator-title">
        <div className="simulator-head">
          <div>
            <span className="eyebrow eyebrow-light">SIMULADOR DE CENÁRIO</span>
            <h3 id="simulator-title">E se você fechar {annualTrips}{" "}{annualTrips === 1 ? "viagem" : "viagens"} no ano?</h3>
            <p>Altere sua meta anual. Comissão, público por viagem e referência de influenciadores seguem os números oficiais.</p>
          </div>
          <span className="official-badge"><ShieldCheck aria-hidden="true" /> Premissas oficiais travadas</span>
        </div>

        <div className="scenario-options" role="group" aria-label="Selecione um cenário oficial">
          {SCENARIOS.map((scenarioName, index) => {
            const assumptions = SCENARIO_ASSUMPTIONS[index as ScenarioIndex]
            const scenarioIndex = index as ScenarioIndex

            return (
              <button
                className="scenario-option"
                type="button"
                key={scenarioName}
                aria-pressed={selectedScenario === scenarioIndex}
                onClick={() => onScenarioSelect(scenarioIndex)}
              >
                <span className="scenario-name">{scenarioName}</span>
                <strong>{assumptions.payingGuestsPerTrip} pagantes</strong>
                <span>{assumptions.influencersPerMonth} influenciadores/mês</span>
              </button>
            )
          })}
        </div>

        <div className="annual-control">
          <div className="annual-control-heading">
            <label htmlFor="annual-trips-range">Sua meta anual de Surf Trips</label>
            <div className="annual-number-field">
              <label className="sr-only" htmlFor="annual-trips-number">Número de Surf Trips no ano</label>
              <input
                id="annual-trips-number"
                type="number"
                inputMode="numeric"
                min="0"
                max={MAX_ANNUAL_TRIP_TARGET}
                step="1"
                value={annualTrips}
                onChange={(event) => onAnnualTripsChange(Number(event.target.value))}
              />
              <span>por ano</span>
            </div>
          </div>
          <input
            className="annual-range"
            id="annual-trips-range"
            type="range"
            min="0"
            max={MAX_ANNUAL_TRIP_TARGET}
            step="1"
            value={annualTrips}
            aria-valuetext={`${annualTrips} ${annualTrips === 1 ? "Surf Trip por ano" : "Surf Trips por ano"}`}
            aria-describedby="annual-trip-limit"
            onChange={(event) => onAnnualTripsChange(Number(event.target.value))}
          />
          <div className="range-scale" aria-hidden="true"><span>0</span><span>{MAX_ANNUAL_TRIP_TARGET} · meta de 4 por mês</span></div>
          <p id="annual-trip-limit" className="control-hint">A quantidade de viagens é uma hipótese sua, não uma condição garantida do programa.</p>
        </div>

        <div className="annual-result" aria-live="polite" aria-atomic="true">
          <div className="annual-result-main">
            <span>Potencial ilustrativo em 12 meses</span>
            <strong className="num annual-total">{formatCurrency(annualProjection.totalIncome)}</strong>
            <span className="annual-average">Média aproximada de {formatCurrency(annualProjection.monthlyAverage)} por mês · cenário {scenario.label}</span>
          </div>
          <div className="annual-breakdown">
            <div className="annual-breakdown-item">
              <span>Comissão de Surf Trips</span>
              <strong className="num">{formatCurrency(annualProjection.tripIncome)}</strong>
              <small>{annualProjection.annualTrips} viagens × {scenario.payingGuestsPerTrip} pagantes elegíveis × {formatCurrency(tripCommission)}</small>
            </div>
            <div className="annual-breakdown-item">
              <span>Referência com influenciadores</span>
              <strong className="num">{formatCurrency(annualProjection.influencerIncome)}</strong>
              <small>{scenario.influencersPerMonth} por mês × {formatCurrency(influencerReferenceIncome)} por parceiro × 12</small>
            </div>
          </div>
        </div>

        <details className="simulator-notes">
          <summary>Como esta simulação é calculada</summary>
          <div>
            <p>Viagens: {formatCurrency(tripCommission)} por participante elegível das suas vendas, pagos depois da execução da Surf Trip.</p>
            <p>Influenciadores: referência de {formatCurrency(influencerReferenceIncome)} por parceiro — {formatCurrency(OFFICIAL_PLAN_VALUES.influencerArrivalReference)} pela chegada na faixa de 10 mil a 100 mil seguidores, mais {formatCurrency((OFFICIAL_PLAN_VALUES.lodgingSalesTargetPerInfluencer * OFFICIAL_PLAN_VALUES.lodgingCouponCommissionPercent) / 100)} se a meta de reservas pelo cupom for atingida. A chegada varia de R$ 100 a R$ 200 conforme o porte da audiência.</p>
            <p>O cálculo anualiza o cenário por 12 meses e não desconta impostos, custos, cancelamentos ou períodos sem operação. Metas ilustrativas, não salário nem ganho garantido; condições de pagamento e recorrência dependem de formalização.</p>
          </div>
        </details>
      </div>
    </section>
  )
}
