import Image from "next/image"

type ScenicBackgroundProps = {
  source: string
  priority?: boolean
  position?: string
}

export function ScenicBackground({ source, priority = false, position }: ScenicBackgroundProps) {
  return (
    <div className="bg" aria-hidden="true">
      <Image
        src={source}
        alt=""
        fill
        sizes="100vw"
        quality={94}
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        className="scenic-image"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}
