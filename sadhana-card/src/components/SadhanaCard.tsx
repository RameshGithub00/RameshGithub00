import { Fragment } from 'react'
import { buildColumns, monthTitle } from '../utils/dates'
import type { SadhanaProfile, MonthRecord } from '../types'

interface SadhanaCardProps {
  year: number
  month: number
  profile: SadhanaProfile
  record: MonthRecord
  onEntryChange: (day: number, value: string) => void
  onProfileChange: (patch: Partial<SadhanaProfile>) => void
  onMarkEkadashi: (day: number) => void
}

export function SadhanaCard({
  year,
  month,
  profile,
  record,
  onEntryChange,
  onProfileChange,
  onMarkEkadashi,
}: SadhanaCardProps) {
  const columns = buildColumns(year, month)
  const maxRows = Math.max(...columns.map((c) => c.days.length))

  return (
    <article className="sadhana-card" aria-label={monthTitle(year, month)}>
      <h1 className="card-title">{monthTitle(year, month)}</h1>

      <div className="card-meta">
        <label className="meta-field">
          <span>Name:</span>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onProfileChange({ name: e.target.value })}
            placeholder="Your name"
          />
        </label>
        <label className="meta-field">
          <span>Subject:</span>
          <input
            type="text"
            value={profile.subject}
            onChange={(e) => onProfileChange({ subject: e.target.value })}
          />
        </label>
      </div>

      <div className="grid-wrap">
        <table className="sadhana-grid">
          <thead>
            <tr>
              {columns.map((_, i) => (
                <th key={`h-${i}`} colSpan={2} className="col-group">
                  <div className="pair-head">
                    <span>Date</span>
                    <span>Count</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }, (_, row) => (
              <tr key={row}>
                {columns.map((col, colIdx) => {
                  const day = col.days[row]
                  if (day === undefined) {
                    return (
                      <Fragment key={`${colIdx}-empty-${row}`}>
                        <td className="cell date empty" />
                        <td className="cell count empty" />
                      </Fragment>
                    )
                  }
                  const value = record.entries[day] ?? ''
                  return (
                    <Fragment key={`${colIdx}-${day}`}>
                      <td className="cell date">{col.label(day)}</td>
                      <td className="cell count">
                        <input
                          type="text"
                          className="count-input"
                          value={value}
                          onChange={(e) => onEntryChange(day, e.target.value)}
                          onContextMenu={(e) => {
                            e.preventDefault()
                            onMarkEkadashi(day)
                          }}
                          title="Right-click to mark Ekadashi"
                          aria-label={`Count for ${col.label(day)}`}
                        />
                      </td>
                    </Fragment>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="hint print-hide">
        Tip: right-click a count cell to apply Ekadashi ({profile.ekadashiCount}).
      </p>
    </article>
  )
}
