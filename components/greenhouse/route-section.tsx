import Image from "next/image"

const destinations = [
  { name: "Saquarema", note: "Base principal · todos os níveis", group: 3, image: "/images/destino-saquarema.jpg" },
  { name: "Búzios", note: "Iniciantes o ano inteiro", group: 7, image: "/images/destino-buzios.jpg" },
  { name: "Arraial do Cabo", note: "Iniciantes o ano inteiro", group: 7, image: "/images/destino-arraial-do-cabo.jpg" },
  { name: "Cabo Frio", note: "Iniciantes o ano inteiro", group: 7, image: "/images/destino-cabo-frio.jpg" },
]

export function RouteSection() {
  return (
    <section className="rota" id="rota" aria-labelledby="route-title">
      <div className="stick">
        <div className="head">
          <h2 id="route-title">Quatro destinos, uma costa só.</h2>
          <p>Saquarema é a base. Os outros três ampliam o calendário e a oferta.</p>
        </div>
        <div className="track">
          {destinations.map((destination) => (
            <article className="pn" key={destination.name}>
              <Image src={destination.image} alt="" fill sizes="(min-width: 800px) 430px, 88vw" className="pn-image" />
              <div>
                <small>{destination.note}</small>
                <h3 className="pn-title">{destination.name}</h3>
              </div>
              <div><span className="num">{destination.group}</span> pessoas confirmam o grupo</div>
            </article>
          ))}
          <article className="pn est">
            <div>
              <small>Uma viagem para cada fase</small>
              <h3 className="pn-title">Estações do surfista</h3>
            </div>
            <ul>
              <li><b>Nov a fev</b> · iniciação: do zero e intermediários</li>
              <li><b>Mar a jul</b> · performance: foco em avançados</li>
              <li><b>Ago a out</b> · evolução: intermediários e iniciantes</li>
            </ul>
            <p className="season-note">O mar manda: instrutores definem local, horário e segurança.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
