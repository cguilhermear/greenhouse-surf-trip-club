import Image from "next/image"

export function InvitationSection() {
  return (
    <section className="light" id="convite" aria-labelledby="invitation-title">
      <div className="split">
        <div>
          <span className="eyebrow">UMA COMUNIDADE QUE VOLTA</span>
          <h2 id="invitation-title">Uma viagem por mês. Um motivo para voltar.</h2>
          <p>O consultor aproxima influenciadores da Greenhouse. Eles convidam sua comunidade para surfar em Saquarema, e a próxima oferta nasce da experiência compartilhada.</p>
          <div className="grid3">
            <div><span className="num">12</span>Surf Trips por ano · meta por influenciador</div>
            <div><span className="num">10</span>pagantes por viagem · meta de referência</div>
            <div><span className="num">≈90</span>dias entre ofertas para estimular o retorno</div>
          </div>
        </div>
        <div className="photo" aria-hidden="true">
          <div className="photo-image-layer">
            <Image src="/images/praia.jpg" alt="" fill sizes="(max-width: 800px) 88vw, 42vw" className="photo-image" />
          </div>
        </div>
      </div>
    </section>
  )
}
