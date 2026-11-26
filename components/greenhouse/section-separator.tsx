type SectionSeparatorProps = {
  color: string
}

export function SectionSeparator({ color }: SectionSeparatorProps) {
  return (
    <svg className="sep" viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0H1200V0C1000 44 850 6 600 28S200 50 0 0Z" fill={color} />
    </svg>
  )
}
