import { useEffect, useState } from 'react';

interface LisbonTimeState {
  time: string;
  timezone: string;
}

function getTimezoneLabel(now: Date) {
  const offsetLabel = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Lisbon',
    timeZoneName: 'shortOffset',
  })
    .formatToParts(now)
    .find((part) => part.type === 'timeZoneName')?.value;

  return offsetLabel?.includes('+1') ? 'WEST' : 'WET';
}

export function useLisbonTime() {
  const [state, setState] = useState<LisbonTimeState>({
    time: '--:--:--',
    timezone: 'WET',
  });

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Lisbon',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const update = () => {
      const now = new Date();
      setState({
        time: formatter.format(now),
        timezone: getTimezoneLabel(now),
      });
    };

    update();
    const intervalId = window.setInterval(update, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return state;
}
