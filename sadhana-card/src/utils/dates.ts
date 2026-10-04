const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function formatDayLabel(month: number, day: number): string {
  return `${day}-${MONTH_NAMES[month]}`
}

export function monthTitle(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year} Sadhana Card`
}

export function toMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

export function parseMonthKey(key: string): { year: number; month: number } {
  const [y, m] = key.split('-')
  return { year: Number(y), month: Number(m) - 1 }
}

/** Split month days into three columns (matches common paper sadhana cards). */
export function columnDayRanges(totalDays: number): [number, number, number] {
  const first = Math.floor(totalDays / 3) + 1
  const second = first
  const third = totalDays - first - second
  return [first, second, third]
}

export function buildColumns(
  year: number,
  month: number,
): { days: number[]; label: (day: number) => string }[] {
  const total = daysInMonth(year, month)
  const [c1, c2, c3] = columnDayRanges(total)
  const label = (day: number) => formatDayLabel(month, day)

  const col1: number[] = []
  const col2: number[] = []
  const col3: number[] = []

  let day = 1
  for (let i = 0; i < c1; i++) col1.push(day++)
  for (let i = 0; i < c2; i++) col2.push(day++)
  for (let i = 0; i < c3; i++) col3.push(day++)

  return [
    { days: col1, label },
    { days: col2, label },
    { days: col3, label },
  ]
}
