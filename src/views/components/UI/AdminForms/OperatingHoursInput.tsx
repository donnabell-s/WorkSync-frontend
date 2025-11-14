import React, { useEffect, useMemo, useState } from 'react';
import InputLabel from './InputLabel';

export interface OperatingHoursDto {
  weekdays: { open: string; close: string };
  weekends: { open: string; close: string };
}

interface OperatingHoursInputProps {
  label?: string;
  value?: OperatingHoursDto | string | null;
  onChange?: (value: OperatingHoursDto) => void;
  className?: string;
}

const DEFAULT_OH: OperatingHoursDto = {
  weekdays: { open: '09:00', close: '18:00' },
  weekends: { open: '10:00', close: '16:00' },
};

function normalizeTime(t?: string): string {
  if (!t) return '';
  let s = String(t).trim();
  // Case 1: HH:mm:ss or H:mm:ss
  let m = s.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (m) {
    let hh = parseInt(m[1], 10);
    let mm = parseInt(m[2], 10);
    hh = Math.min(Math.max(hh, 0), 23);
    mm = Math.min(Math.max(mm, 0), 59);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }
  // Case 2: h:mm AM/PM or h:mm:ss AM/PM
  m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (m) {
    let hh = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    const ap = m[4].toUpperCase();
    if (ap === 'PM' && hh < 12) hh += 12;
    if (ap === 'AM' && hh === 12) hh = 0;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }
  // Case 3: HH:mm or H:mm
  m = s.match(/^(\d{1,2}):(\d{1,2})$/);
  if (m) {
    let hh = parseInt(m[1], 10);
    let mm = parseInt(m[2], 10);
    hh = Math.min(Math.max(hh, 0), 23);
    mm = Math.min(Math.max(mm, 0), 59);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }
  // Case 4: HH or H
  m = s.match(/^(\d{1,2})$/);
  if (m) {
    let hh = parseInt(m[1], 10);
    hh = Math.min(Math.max(hh, 0), 23);
    return `${String(hh).padStart(2, '0')}:00`;
  }
  // Fallback: remove trailing am/pm if present and retry simple HH:mm
  s = s.replace(/\s*(am|pm)$/i, '');
  m = s.match(/^(\d{1,2}):(\d{1,2})$/);
  if (m) {
    let hh = parseInt(m[1], 10);
    let mm = parseInt(m[2], 10);
    hh = Math.min(Math.max(hh, 0), 23);
    mm = Math.min(Math.max(mm, 0), 59);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }
  return s; // last resort, return cleaned string
}

function normalizeOH(oh: OperatingHoursDto): OperatingHoursDto {
  return {
    weekdays: {
      open: normalizeTime(oh.weekdays?.open) || DEFAULT_OH.weekdays.open,
      close: normalizeTime(oh.weekdays?.close) || DEFAULT_OH.weekdays.close,
    },
    weekends: {
      open: normalizeTime(oh.weekends?.open) || DEFAULT_OH.weekends.open,
      close: normalizeTime(oh.weekends?.close) || DEFAULT_OH.weekends.close,
    },
  };
}

function parseValue(v: OperatingHoursDto | string | null | undefined): OperatingHoursDto {
  const coerce = (p: any): OperatingHoursDto | null => {
    if (!p || typeof p !== 'object') return null;
    // Support various casings: Weekdays/Weekends, Open/Close, lower/upper
    const getProp = (obj: any, key: string) => {
      if (!obj || typeof obj !== 'object') return undefined;
      const direct = obj[key];
      if (typeof direct !== 'undefined') return direct;
      const lowerKey = key.toLowerCase();
      for (const k of Object.keys(obj)) {
        if (String(k).toLowerCase() === lowerKey) return (obj as any)[k];
      }
      return undefined;
    };
    const wdRaw = getProp(p, 'weekdays') ?? getProp(p, 'Weekdays');
    const weRaw = getProp(p, 'weekends') ?? getProp(p, 'Weekends');
    const wdOpen = getProp(wdRaw, 'open') ?? getProp(wdRaw, 'Open');
    const wdClose = getProp(wdRaw, 'close') ?? getProp(wdRaw, 'Close');
    const weOpen = getProp(weRaw, 'open') ?? getProp(weRaw, 'Open');
    const weClose = getProp(weRaw, 'close') ?? getProp(weRaw, 'Close');
    const candidate: OperatingHoursDto = {
      weekdays: { open: wdOpen, close: wdClose } as any,
      weekends: { open: weOpen, close: weClose } as any,
    };
    return normalizeOH(candidate);
  };

  if (!v) return { ...DEFAULT_OH };
  if (typeof v === 'string') {
    try {
      // handle possibly double-encoded JSON
      let parsed: any = v;
      for (let i = 0; i < 2; i++) {
        if (typeof parsed === 'string') {
          try { parsed = JSON.parse(parsed); continue; } catch { break; }
        }
        break;
      }
      const coerced = coerce(parsed);
      if (coerced) return coerced;
    } catch {}
    return { ...DEFAULT_OH };
  }
  if (typeof v === 'object') {
    const coerced = coerce(v);
    if (coerced) return coerced;
  }
  return { ...DEFAULT_OH };
}

const OperatingHoursInput: React.FC<OperatingHoursInputProps> = ({ label = 'Operating Hours', value, onChange, className }) => {
  const [filled, setFilled] = useState<boolean>(false);
  const [oh, setOh] = useState<OperatingHoursDto>(() => parseValue(value));

  useEffect(() => {
    setOh(parseValue(value));
  }, [value]);

  useEffect(() => {
    setFilled(Boolean(oh.weekdays.open || oh.weekdays.close || oh.weekends.open || oh.weekends.close));
  }, [oh]);

  const timeOptions = useMemo(() => {
    const opts: string[] = [];
    for (let h = 0; h <= 23; h++) {
      for (const m of [0, 30]) {
        opts.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }
    return opts;
  }, []);

  const update = (path: 'weekdays.open' | 'weekdays.close' | 'weekends.open' | 'weekends.close', val: string) => {
    // Compute next from current state, then update local state and notify parent
    const next: OperatingHoursDto = JSON.parse(JSON.stringify(oh));
    const [group, key] = path.split('.') as ['weekdays' | 'weekends', 'open' | 'close'];
    next[group][key] = val;
    setOh(next);
    onChange?.(next);
  };

  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <InputLabel label={label} filled={filled} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="min-w-28 text-[#6B7280]">Weekdays Open</span>
          <select value={oh.weekdays.open} onChange={(e) => update('weekdays.open', e.target.value)} className="w-full flex-grow border border-zinc-300 rounded-md p-2 focus:outline-zinc-300 focus:outline-2">
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="min-w-28 text-[#6B7280]">Weekdays Close</span>
          <select value={oh.weekdays.close} onChange={(e) => update('weekdays.close', e.target.value)} className="w-full flex-grow border border-zinc-300 rounded-md p-2 focus:outline-zinc-300 focus:outline-2">
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="min-w-28 text-[#6B7280]">Weekends Open</span>
          <select value={oh.weekends.open} onChange={(e) => update('weekends.open', e.target.value)} className="w-full flex-grow border border-zinc-300 rounded-md p-2 focus:outline-zinc-300 focus:outline-2">
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="min-w-28 text-[#6B7280]">Weekends Close</span>
          <select value={oh.weekends.close} onChange={(e) => update('weekends.close', e.target.value)} className="w-full flex-grow border border-zinc-300 rounded-md p-2 focus:outline-zinc-300 focus:outline-2">
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OperatingHoursInput;
