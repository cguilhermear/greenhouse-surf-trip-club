"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  formatCurrency,
  getFinancialMetrics,
  getProjectionRows,
  OFFICIAL_PLAN_VALUES,
  SCENARIO_ASSUMPTIONS,
  SCENARIOS,
  type ScenarioIndex,
} from "@/lib/greenhouse-calculator"

type ProjectionSectionProps = {
  selectedScenario: ScenarioIndex
  selectedMonth: number
  onScenarioSelect: (scenario: ScenarioIndex) => void
  onMonthSelect: (month: number) => void
}

const MONTHS = ["1º mês", "2º mês", "3º mês", "4º mês", "5º mês", "6º mês"]

export function ProjectionSection({ selectedScenario, selectedMonth, onScenarioSelect, onMonthSelect }: ProjectionSectionProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [plotHeight, setPlotHeight] = useState(300)
  const [hasMounted, setHasMounted] = useState(false)
  const projections = useMemo(() => getProjectionRows(), [])
  const selectedRows = projections[selectedScenario]
  const maxProjection = Math.max(1, ...projections.flatMap((scenario) => scenario.map((month) => month.total)))
  const { tripCommission, influencerReferenceIncome } = getFinancialMetrics()
  const tripCounts = OFFICIAL_PLAN_VALUES.sixMonthTrips
  const totalTrips = tripCounts.reduce<number>((total, count) => total + count, 0)
  const scenario = SCENARIO_ASSUMPTIONS[selectedScenario]
  const totalIncome = selectedRows.reduce((total, month) => total + month.total, 0)
  const selectedMonthData = selectedRows[selectedMonth]
  const selectedTravelIncome = selectedMonthData.tripCount * scenario.payingGuestsPerTrip * tripCommission
  const selectedInfluencerIncome = scenario.influencersPerMonth * influencerReferenceIncome
  const selectedMonthTotal = selectedTravelIncome + selectedInfluencerIncome

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const updateHeight = () => setPlotHeight(Math.max(120, chart.clientHeight - 80))
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(chart)
    return () => observer.disconnect()
  }, [])

  useEffect(() => setHasMounted(true), [])

  return (
    <section className="light proj" id="projecao" aria-labelledby="projection-title">
      <span className="eyebrow">PLANO COMERCIAL · REFERÊNCIA 2026–2027</span>
      <h2 id="projection-title">Uma projeção de seis meses, sem números escondidos.</h2>
      <p>O plano prevê 13 Surf Trips, começando em 13/02/2027, com quatro saídas no 4º mês, cinco no 5º e quatro no 6º. Alterar o cenário muda apenas as metas oficiais de pagantes e influenciadores.</p>
      <div className="tabs" role="group" aria-label="Cenário oficial da projeção">
        {SCENARIOS.map((scenarioName, index) => (
          <button
            type="button"
            key={scenarioName}
            aria-pressed={selectedScenario === index}
            onClick={() => onScenarioSelect(index as ScenarioIndex)}
          >
            {scenarioName}
          </button>
        ))}
      </div>
      <p className="scenario-detail" aria-live="polite">{scenario.influencersPerMonth} influenciadores por mês · {scenario.payingGuestsPerTrip} pagantes elegíveis por viagem.</p>
      <div className="chart" id="chart" ref={chartRef} role="group" aria-label="Projeção mensal oficial de rendimentos">
        {selectedRows.map((month, index) => {
          const barHeight = hasMounted ? (month.total / maxProjection) * plotHeight : 0
          const totalLabel = month.total === 0
            ? "R$ 0"
            : `R$ ${(month.total / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`

          return (
            <button
              className="mc"
              type="button"
              key={MONTHS[index]}
              aria-label={`${MONTHS[index]}: ${formatCurrency(month.total)}`}
              aria-pressed={selectedMonth === index}
              onClick={() => onMonthSelect(index)}
            >
              <span className="v">{totalLabel}</span>
              <span className="st" style={{ height: `${barHeight}px` }} aria-hidden="true">
                <span className="sv" style={{ flexGrow: month.tripIncome }} />
                <span className="si" style={{ flexGrow: month.influencerIncome }} />
              </span>
              <span className="ml">{MONTHS[index]}</span>
            </button>
          )
        })}
      </div>
      <div className="leg" aria-hidden="true"><span>Influenciadores</span><span className="lv">Surf Trips</span></div>
      <div className="rd" aria-live="polite" aria-atomic="true">
        {selectedMonth + 1}º mês: {selectedMonthData.tripCount} {selectedMonthData.tripCount === 1 ? "viagem" : "viagens"}. Influenciadores {formatCurrency(selectedInfluencerIncome)} + viagens {formatCurrency(selectedTravelIncome)} = {formatCurrency(selectedMonthTotal)}.
      </div>
      <div className="tot">
        <div><span className="num">{formatCurrency(totalIncome)}</span>ganho potencial em 6 meses</div>
        <div><span className="num">{formatCurrency(totalIncome / 6)}</span>média estimada por mês</div>
        <div><span className="num">{totalTrips}</span><span>Surf Trips previstas</span></div>
      </div>
      <p className="aviso">Projeção de referência alinhada ao material oficial. A comissão das viagens é paga após a execução; metas ilustrativas, não salário nem ganho garantido.</p>
    </section>
  )
}
