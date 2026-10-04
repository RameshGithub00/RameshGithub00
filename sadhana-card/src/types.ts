export type MonthKey = `${number}-${string}` // e.g. "2026-09"

export interface SadhanaProfile {
  name: string
  subject: string
  defaultCount: number
  ekadashiCount: number
}

export interface MonthRecord {
  /** day of month (1–31) → count text (e.g. "5" or "Ekadashi 16") */
  entries: Record<number, string>
}

export interface StoredData {
  profile: SadhanaProfile
  months: Record<MonthKey, MonthRecord>
}

export const DEFAULT_PROFILE: SadhanaProfile = {
  name: '',
  subject: 'Chanting',
  defaultCount: 5,
  ekadashiCount: 16,
}
