import { useTranslation } from 'react-i18next';

import { useLisbonTime } from '@/hooks/useLisbonTime';

export default function HeroClock() {
  const { t } = useTranslation();
  const { time, timezone } = useLisbonTime();

  return (
    <div className="hero-clock" aria-live="polite">
      <span className="clock-pill">{`${timezone} (${t('hero.clockLabel')})`}</span>
      <span className="clock-readout">{`${time} ${timezone}`}</span>
    </div>
  );
}
