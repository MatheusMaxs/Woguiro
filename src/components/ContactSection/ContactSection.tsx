import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CONTACT_EMAIL, CONTACT_LINKS } from '@/data/homeContent';

function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function ContactSection() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      fallbackCopy(CONTACT_EMAIL);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="home-section contact-section" id="contact-section">
      <div className="section-shell contact-shell">
        <div className="section-ghost" aria-hidden="true">
          {t('contact.ghost')}
        </div>

        <div className="section-meta-row" data-reveal>
          <span>{t('contact.eyebrow')}</span>
          <span>{t('contact.meta')}</span>
          <span>{t('contact.availability')}</span>
        </div>

        <div className="contact-panel" data-reveal-group>
          <div className="contact-primary-panel" data-reveal-item>
            <p className="section-kicker">{t('contact.eyebrow')}</p>
            <h2 className="section-title section-title--contact">{t('contact.title')}</h2>
            <p className="section-body">{t('contact.description')}</p>

            <div className="contact-action-row">
              <a className="primary-button" href={`mailto:${CONTACT_EMAIL}`} data-cursor="link">
                {t('contact.primary')}
              </a>
              <a
                className="ghost-button"
                href="https://instagram.com/woguiro"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                {t('contact.secondary')}
              </a>
            </div>
          </div>

          <div className="contact-secondary-panel" data-reveal-item>
            <div className="contact-info-card">
              <span className="contact-info-label">{t('contact.availability')}</span>
              <strong className="contact-info-value">{t('contact.availabilityValue')}</strong>
              <p className="contact-info-note">{t('contact.reply')}</p>
            </div>

            <div className="contact-channel-panel">
              <div className="contact-channel-head">
                <span>{t('contact.channels')}</span>
                <button type="button" className="meta-link" data-cursor="link" onClick={handleCopy}>
                  {copied ? t('contact.copied') : t('contact.copy')}
                </button>
              </div>

              <div className="contact-channel-list">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="contact-channel-link"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    data-cursor="link"
                  >
                    <span>{t(link.labelKey)}</span>
                    <strong>{link.value}</strong>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
