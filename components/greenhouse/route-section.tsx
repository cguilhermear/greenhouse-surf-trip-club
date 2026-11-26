import Image from "next/image"
import { ArrowDownRight, Waves } from "lucide-react"

const destinations = [
  { name: "Saquarema", note: "Nossa casa · todos os níveis", group: 3, image: "/images/destino-saquarema.jpg", tag: "A BASE" },
  { name: "Búzios", note: "Mar calmo para começar", group: 7, image: "/images/destino-buzios.jpg", tag: "NOVA MARÉ" },
  { name: "Arraial do Cabo", note: "Dias de água azul", group: 7, image: "/images/destino-arraial-do-cabo.jpg", tag: "PÉ NA AREIA" },
  { name: "Cabo Frio", note: "Surf e cidade em movimento", group: 7, image: "/images/destino-cabo-frio.jpg", tag: "NA ESTRADA" },
]

export function RouteSection() {
  return (
    <section className="rota" id="rota" aria-labelledby="route-title">
      <div className="stick">
        <div className="route-head head">
          <div>
            <span className="eyebrow"><i aria-hidden="true" /> O LITORAL COMO QUINTAL</span>
            <h2 id="route-title">Uma costa inteira. <em>Quatro jeitos de entrar no mar.</em></h2>
            <p>Saquarema é ponto de encontro. O resto da Região dos Lagos abre novas rotas, novas ondas e novas histórias pra dividir.</p>
          </div>
          <span className="route-compass" aria-hidden="true"><Waves /><span>RJ<br />BR</span></span>
        </div>
        <div className="route-progress" aria-hidden="true"><span /></div>
        <div className="track" role="group" aria-label="Destinos das surf trips">
          {destinations.map((destination, index) => (
            <article className="pn" key={destination.name}>
              <Image
                src={destination.image}
                alt=""
                fill
                sizes="(min-width: 1100px) 390px, (min-width: 800px) 42vw, 84vw"
                quality={92}
                className="pn-image"
              />
              <div className="pn-topline"><span>{destination.tag}</span><span>0{index + 1} <ArrowDownRight aria-hidden="true" /></span></div>
              <div className="pn-copy">
                <small>{destination.note}</small>
                <h3 className="pn-title">{destination.name}</h3>
                <div className="pn-group"><span className="num">{destination.group}</span><span>pessoas confirmam<br />o grupo</span></div>
              </div>
            </article>
          ))}
          <article className="pn est">
            <div className="pn-topline"><span>A MARÉ MUDA</span><span>05 <Waves aria-hidden="true" /></span></div>
            <div>
              <small>Uma viagem para cada fase</small>
              <h3 className="pn-title">O ano também<br />surfa em ciclos.</h3>
            </div>
            <ul>
              <li><b>Nov — Fev</b><span>Iniciação · do zero ao intermediário</span></li>
              <li><b>Mar — Jul</b><span>Performance · foco em avançados</span></li>
              <li><b>Ago — Out</b><span>Evolução · intermediários e iniciantes</span></li>
            </ul>
            <p className="season-note">O mar manda: instrutores definem o local, o horário e a segurança.</p>
          </article>
        </div>
        <p className="route-cue"><span>ROLE PARA ATRAVESSAR A COSTA</span><span>01 — 05</span></p>
      </div>
    </section>
  )
}
