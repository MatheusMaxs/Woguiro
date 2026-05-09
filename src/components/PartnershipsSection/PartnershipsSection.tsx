import { useTranslation } from 'react-i18next';

const PARTNERSHIP_CARD_COUNT = 3;

export default function PartnershipsSection() {
  const { t } = useTranslation();

  return (
    <section className="home-section partnerships-section" id="partnerships-section">
      <div className="section-shell partnerships-shell">
        <div className="section-ghost section-ghost--left" aria-hidden="true">
          {t('partnerships.ghost')}
        </div>

        <div className="section-meta-row" data-reveal>
          <span>{t('partnerships.metaStart')}</span>
          <span>{t('partnerships.metaMiddle')}</span>
          <span>{t('partnerships.metaEnd')}</span>
        </div>

        <div className="partnerships-heading" data-reveal>
          <p className="section-kicker">{t('partnerships.kicker')}</p>
          <h2 className="section-title section-title--works">{t('partnerships.title')}</h2>
          <p className="section-body">{t('partnerships.description')}</p>
        </div>

        <div className="partnerships-grid" data-reveal-group>
          {Array.from({ length: PARTNERSHIP_CARD_COUNT }, (_, index) => (
            <article key={index} className="partnership-card" data-reveal-item>
              <span>{String(index + 1).padStart(2, '0')} / {t(`partnerships.cards.${index}.label`)}</span>
              <h3>{t(`partnerships.cards.${index}.title`)}</h3>
              <p>{t(`partnerships.cards.${index}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
