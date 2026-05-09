const PARTNERSHIP_CARDS = [
  {
    label: 'Marcas',
    title: 'Conteudo comercial com linguagem autoral.',
    body: 'Fotografia, UGC, produto e motion pensados para campanhas organicas ou pagas sem perder identidade visual.',
  },
  {
    label: 'Artistas',
    title: 'Imagem, ritmo e narrativa para lancamentos.',
    body: 'Capas, reels, videos curtos e direcao visual para artistas que precisam de presenca consistente.',
  },
  {
    label: 'Producoes',
    title: 'Colaboracoes flexiveis para equipas criativas.',
    body: 'Captacao, edicao, direcao e apoio visual remoto ou presencial, com entregas preparadas para multiplas plataformas.',
  },
];

export default function PartnershipsSection() {
  return (
    <section className="home-section partnerships-section" id="partnerships-section">
      <div className="section-shell partnerships-shell">
        <div className="section-ghost section-ghost--left" aria-hidden="true">
          Allies
        </div>

        <div className="section-meta-row" data-reveal>
          <span>Parcerias</span>
          <span>Marcas / artistas / equipas</span>
          <span>Colaboracao ativa</span>
        </div>

        <div className="partnerships-heading" data-reveal>
          <p className="section-kicker">Secao de parcerias</p>
          <h2 className="section-title section-title--works">Projetos que crescem com direcao visual.</h2>
          <p className="section-body">
            Aberto a parcerias com marcas, artistas e equipas que procuram imagem cinematografica, conteudo social e uma estetica consistente do conceito ao corte final.
          </p>
        </div>

        <div className="partnerships-grid" data-reveal-group>
          {PARTNERSHIP_CARDS.map((card, index) => (
            <article key={card.label} className="partnership-card" data-reveal-item>
              <span>{String(index + 1).padStart(2, '0')} / {card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
