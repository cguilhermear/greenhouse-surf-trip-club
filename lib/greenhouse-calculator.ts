export const OFFICIAL_PLAN_VALUES = {
  clientPrice: 1300,
  greenhouseReceiptPerGuest: 1000,
  consultantCommissionPercent: 15,
  influencerArrivalReference: 150,
  lodgingCouponCommissionPercent: 15,
  lodgingSalesTargetPerInfluencer: 2000,
  outreachMessagesPerMonth: 40,
  funnelRates: [100, 70, 50, 30, 10],
  sixMonthTrips: [0, 0, 0, 4, 5, 4],
} as const

export const SCENARIOS = ["Base", "Ótimo", "Excelente"] as const
export type ScenarioIndex = 0 | 1 | 2

export const SCENARIO_ASSUMPTIONS = [
  { label: "Base", payingGuestsPerTrip: 10, influencersPerMonth: 4 },
  { label: "Ótimo", payingGuestsPerTrip: 15, influencersPerMonth: 6 },
  { label: "Excelente", payingGuestsPerTrip: 20, influencersPerMonth: 8 },
] as const

export const INITIAL_ANNUAL_TRIP_TARGET = 20
export const MAX_ANNUAL_TRIP_TARGET = 48

export const FUNNEL_STAGES = [
  "Mensagens de prospecção enviadas",
  "Influenciadores que respondem",
  "Conversas ou reuniões",
  "Propostas enviadas com data definida",
  "Surf Trips fechadas",
] as const

export function clampAnnualTripTarget(value: number): number {
  if (!Number.isFinite(value)) return INITIAL_ANNUAL_TRIP_TARGET
  return Math.min(MAX_ANNUAL_TRIP_TARGET, Math.max(0, Math.round(value)))
}

export function formatCurrency(value: number): string {
  return `R$ ${Math.round(value).toLocaleString("pt-BR")}`
}

export function formatPercent(value: number): string {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
}

export function getFinancialMetrics() {
  const tripCommission = (OFFICIAL_PLAN_VALUES.greenhouseReceiptPerGuest * OFFICIAL_PLAN_VALUES.consultantCommissionPercent) / 100
  const influencerReferenceIncome = OFFICIAL_PLAN_VALUES.influencerArrivalReference
    + (OFFICIAL_PLAN_VALUES.lodgingSalesTargetPerInfluencer * OFFICIAL_PLAN_VALUES.lodgingCouponCommissionPercent) / 100
  const influencerShare = OFFICIAL_PLAN_VALUES.clientPrice - OFFICIAL_PLAN_VALUES.greenhouseReceiptPerGuest

  return { tripCommission, influencerReferenceIncome, influencerShare }
}

export function getFunnelValues() {
  const rates = [...OFFICIAL_PLAN_VALUES.funnelRates]
  return {
    rates,
    counts: rates.map((rate) => Math.round((OFFICIAL_PLAN_VALUES.outreachMessagesPerMonth * rate) / 100)),
  }
}

export type ProjectionMonth = {
  tripIncome: number
  influencerIncome: number
  total: number
  tripCount: number
}

export function getProjectionRows(): ProjectionMonth[][] {
  const { tripCommission, influencerReferenceIncome } = getFinancialMetrics()

  return SCENARIO_ASSUMPTIONS.map((scenario) =>
    OFFICIAL_PLAN_VALUES.sixMonthTrips.map((tripCount) => ({
      tripIncome: tripCount * scenario.payingGuestsPerTrip * tripCommission,
      influencerIncome: scenario.influencersPerMonth * influencerReferenceIncome,
      total: tripCount * scenario.payingGuestsPerTrip * tripCommission
        + scenario.influencersPerMonth * influencerReferenceIncome,
      tripCount,
    })),
  )
}

export function getAnnualProjection(annualTripTarget: number, scenarioIndex: ScenarioIndex) {
  const trips = clampAnnualTripTarget(annualTripTarget)
  const scenario = SCENARIO_ASSUMPTIONS[scenarioIndex]
  const { tripCommission, influencerReferenceIncome } = getFinancialMetrics()
  const tripIncome = trips * scenario.payingGuestsPerTrip * tripCommission
  const influencerIncome = scenario.influencersPerMonth * influencerReferenceIncome * 12
  const totalIncome = tripIncome + influencerIncome

  return {
    annualTrips: trips,
    payingGuests: trips * scenario.payingGuestsPerTrip,
    tripIncome,
    influencerIncome,
    totalIncome,
    monthlyAverage: totalIncome / 12,
  }
}
