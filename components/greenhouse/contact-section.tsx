import type { FormEvent } from "react"
import { ScenicBackground } from "./scenic-background"
import { SectionSeparator } from "./section-separator"

type ContactSectionProps = {
  status: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function ContactSection({ status, onSubmit }: ContactSectionProps) {
  return (
      <section className="fim" id="contato" aria-labelledby="contact-title">
        <SectionSeparator color="#E9F3F0" />
        <ScenicBackground source="/images/hero.jpg" position="30% 50%" />
        <div className="split">
          <div>
            <h2 id="contact-title">Você conhece a galera. A gente cuida do resto.</h2>
            <p>Quer ser consultor e levar sua comunidade para viver o surf em Saquarema? Deixe seus dados para a conversa inicial com a Greenhouse.</p>
          </div>
          <form onSubmit={onSubmit}>
            <label htmlFor="contact-name">Nome<input id="contact-name" name="nome" required autoComplete="name" /></label>
            <label htmlFor="contact-phone">WhatsApp<input id="contact-phone" name="zap" type="tel" required autoComplete="tel" placeholder="(22) 90000-0000" /></label>
            <label htmlFor="contact-email">E-mail<input id="contact-email" name="mail" type="email" required autoComplete="email" /></label>
            <label htmlFor="contact-city">Cidade<input id="contact-city" name="cid" required autoComplete="address-level2" /></label>
            <label htmlFor="contact-experience">Sua experiência
              <select id="contact-experience" name="exp">
                <option>Vendas</option>
                <option>Influência e conteúdo</option>
                <option>Turismo e viagens</option>
                <option>Surf ou esporte</option>
                <option>Outra</option>
              </select>
            </label>
            <button className="btn" type="submit">Enviar e falar no WhatsApp</button>
            <div className="ok" role="status" aria-live="polite">{status}</div>
          </form>
        </div>
      </section>
  )
}
