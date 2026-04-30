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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      fallbackCopy(value);
    }

    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
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
                <span className="contact-copy-status" aria-live="polite">
                  {copiedKey ? t('contact.copied') : ''}
                </span>
              </div>

              <div className="contact-channel-list">
                {CONTACT_LINKS.map((link) => {
                  const isCopied = copiedKey === link.labelKey;

                  return (
                    <button
                      key={link.href}
                      type="button"
                      className={`contact-channel-link${isCopied ? ' is-copied' : ''}`}
                      aria-label={`${t('contact.copy')} ${link.value}`}
                      data-cursor="link"
                      onClick={() => handleCopy(link.copyValue, link.labelKey)}
                    >
                      <span>{t(link.labelKey)}</span>
                      <strong>
                        <span>{link.value}</span>
                        <svg className="contact-copy-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <rect className="contact-copy-icon-box" x="5" y="5" width="14" height="14" rx="2" />
                        </svg>
                      </strong>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
