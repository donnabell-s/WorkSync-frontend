// Utilities for parsing recurrence and computing occurrences
import type { Booking } from "../types";

export const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
};

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
export const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

const decodeUnicodeEscapes = (input: string) =>
  input.replace(/\\u([0-9a-fA-F]{4})/g, (_match, code) => String.fromCharCode(parseInt(code, 16)));

const parseMaybeJson = (raw: any): any | null => {
  if (raw == null) return null;
  let cur: any = raw;
  for (let i = 0; i < 3 && typeof cur === 'string'; i++) {
    let s = cur.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      s = s.slice(1, -1);
    }
    const candidates = [s];
    if (s.includes('\\"')) candidates.push(s.replace(/\\\"/g, '"'));
    if (/\\u[0-9a-fA-F]{4}/.test(s)) {
      const decoded = decodeUnicodeEscapes(s);
      candidates.push(decoded);
      if (decoded.includes('\\"')) candidates.push(decoded.replace(/\\\"/g, '"'));
    }
    let parsed = false;
    for (const candidate of candidates) {
      try {
        cur = JSON.parse(candidate);
        parsed = true;
        break;
      } catch {
        continue;
      }
    }
    if (!parsed) break;
  }
  if (typeof cur === 'string') return null;
  return cur;
};

const normalizeDaysOfWeek = (rawDays: any): number[] | undefined => {
  const normalizeDay = (d: any): number | undefined => {
    if (typeof d === 'number') {
      if (d >= 0 && d <= 6) return d;
      if (d >= 1 && d <= 7) return d % 7;
    }
    const asStr = String(d).trim();
    if (/^\d+$/.test(asStr)) {
      const n = parseInt(asStr, 10);
      if (!isNaN(n)) return n >= 0 && n <= 6 ? n : n % 7;
    }
    const name = asStr.toLowerCase();
    const map: Record<string, number> = {
      sun: 0, sunday: 0,
      mon: 1, monday: 1,
      tue: 2, tues: 2, tuesday: 2,
      wed: 3, weds: 3, wednesday: 3,
      thu: 4, thur: 4, thurs: 4, thursday: 4,
      fri: 5, friday: 5,
      sat: 6, saturday: 6,
    };
    return map[name];
  };
  if (!Array.isArray(rawDays)) return undefined;
  const out = rawDays.map(normalizeDay).filter((v): v is number => typeof v === 'number');
  return out.length ? out : undefined;
};

export type ParsedRecurrence = {
  isRecurring: boolean;
  pattern: 'daily' | 'weekly' | 'monthly' | '';
  interval: number;
  endDate: Date | null;
  daysOfWeek?: number[];
  dates?: Date[];
};

export const parseRecurrence = (raw: any): ParsedRecurrence | null => {
  const obj = parseMaybeJson(raw) ?? (typeof raw === 'object' ? raw : null);
  if (!obj) return null;
  const pattern = String((obj.pattern ?? obj.Pattern ?? '') || '').toLowerCase() as ParsedRecurrence['pattern'];
  const interval = Number(obj.interval ?? obj.Interval ?? 1) || 1;
  const endDateRaw = obj.endDate ?? obj.EndDate ?? null;
  const endDate = endDateRaw ? new Date(String(endDateRaw).replace(/\s+/g, '')) : null;
  const daysOfWeek = normalizeDaysOfWeek(obj.daysOfWeek ?? obj.DaysOfWeek);
  const datesRaw = obj.dates ?? obj.Dates;
  const dates: Date[] | undefined = Array.isArray(datesRaw)
    ? datesRaw.map((d: any) => new Date(String(d).replace(/\s+/g, ''))).filter((d: Date) => !isNaN(d.getTime()))
    : undefined;
  const isRecurring = Boolean(obj.isRecurring ?? obj.IsRecurring ?? false);
  return { isRecurring, pattern, interval, endDate, daysOfWeek, dates };
};

export const occursOnDate = (booking: Booking, target: Date): boolean => {
  const startStr: string | undefined = (booking as any).startDatetime ?? (booking as any).startDateTime;
  if (!startStr) return false;
  const start = startOfDay(new Date(startStr));
  const occDate = startOfDay(target);
  const rec = parseRecurrence((booking as any).recurrence);
  const withinRange = (end: Date | null) => (!end || occDate <= endOfDay(end)) && occDate >= start;

  if (!rec || rec.isRecurring === false) return toYMD(occDate) === toYMD(start);

  // For daily patterns, ignore dates array and use inclusive range semantics
  if (rec.pattern === 'daily') {
    return withinRange(rec.endDate);
  }

  // For weekly/monthly, require within range and then pattern match
  if (!withinRange(rec.endDate)) return false;

  if (rec.pattern === 'weekly') {
    const dows = rec.daysOfWeek && rec.daysOfWeek.length ? rec.daysOfWeek : [start.getDay()];
    return dows.includes(occDate.getDay());
  }
  if (rec.pattern === 'monthly') {
    return occDate.getDate() === start.getDate();
  }

  // Unknown pattern: use explicit dates if present, else only the start date
  if (rec.dates && rec.dates.length > 0) {
    return rec.dates.some(d => toYMD(startOfDay(d)) === toYMD(occDate));
  }
  return toYMD(occDate) === toYMD(start);
};

export const expandOccurrences = (booking: Booking, windowStart: Date, windowEnd: Date): Date[] => {
  const startStr: string | undefined = (booking as any).startDatetime ?? (booking as any).startDateTime;
  if (!startStr) return [];
  const start = startOfDay(new Date(startStr));
  const rec = parseRecurrence((booking as any).recurrence);

  const clampStart = startOfDay(windowStart);
  const clampEnd = endOfDay(windowEnd);
  if (!rec || rec.isRecurring === false) {
    const d = startOfDay(new Date(start));
    return (d >= clampStart && d <= clampEnd) ? [d] : [];
  }
  // Compute by pattern within min(start, windowStart) to min(end, windowEnd)
  const end = rec.endDate ? endOfDay(rec.endDate) : endOfDay(new Date(start));
  const seriesStart = start > clampStart ? start : clampStart;
  const seriesEnd = end < clampEnd ? end : clampEnd;
  if (seriesEnd < seriesStart) return [];

  const out: Date[] = [];
  if (rec.pattern === 'daily') {
    let cur = new Date(seriesStart);
    // ensure we begin from start if seriesStart before start
    if (cur < start) cur = new Date(start);
    while (cur <= seriesEnd) {
      out.push(startOfDay(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  }
  if (rec.pattern === 'weekly') {
    const dows = rec.daysOfWeek && rec.daysOfWeek.length ? rec.daysOfWeek : [start.getDay()];
    let cur = new Date(seriesStart);
    if (cur < start) cur = new Date(start);
    while (cur <= seriesEnd) {
      if (dows.includes(cur.getDay())) out.push(startOfDay(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  }
  if (rec.pattern === 'monthly') {
    const dom = start.getDate();
    let cur = new Date(start.getFullYear(), start.getMonth(), dom);
    while (cur <= seriesEnd) {
      const candidate = new Date(cur.getFullYear(), cur.getMonth(), dom);
      // clamp to last day of month if needed
      const lastDay = new Date(candidate.getFullYear(), candidate.getMonth() + 1, 0).getDate();
      const occ = new Date(candidate.getFullYear(), candidate.getMonth(), Math.min(dom, lastDay));
      if (occ >= seriesStart && occ <= seriesEnd) out.push(startOfDay(occ));
      // advance one month
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, dom);
    }
    return out;
  }
  // Unknown pattern: fall back to explicit dates if present
  if (rec.dates && rec.dates.length > 0) {
    return rec.dates
      .map(d => startOfDay(new Date(d)))
      .filter(d => d >= clampStart && d <= clampEnd);
  }
  return [];
};
