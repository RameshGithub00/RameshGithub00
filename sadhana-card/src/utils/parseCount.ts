/** Extract the numeric total from a count cell (e.g. "5", "Ekadashi 16"). */
export function parseCountValue(text: string): number | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  const match = trimmed.match(/(\d+(?:\.\d+)?)\s*$/)
  if (!match) return null
  return Number(match[1])
}

export function summarizeEntries(entries: Record<number, string>): {
  filledDays: number
  totalCount: number
} {
  let filledDays = 0
  let totalCount = 0
  for (const value of Object.values(entries)) {
    const n = parseCountValue(value)
    if (n !== null) {
      filledDays += 1
      totalCount += n
    }
  }
  return { filledDays, totalCount }
}
