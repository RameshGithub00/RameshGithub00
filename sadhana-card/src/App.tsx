import { useMemo, useRef, useState } from 'react'
import { SadhanaCard } from './components/SadhanaCard'
import { useSadhanaStorage } from './hooks/useSadhanaStorage'
import { daysInMonth, monthTitle } from './utils/dates'
import { summarizeEntries } from './utils/parseCount'
import './App.css'

function todayParts() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() }
}

function App() {
  const [{ year, month }, setView] = useState(todayParts)
  const fileRef = useRef<HTMLInputElement>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const {
    profile,
    monthRecord,
    setProfile,
    setEntry,
    fillEmptyWithDefault,
    clearMonth,
    importData,
    exportData,
  } = useSadhanaStorage(year, month)

  const stats = useMemo(
    () => summarizeEntries(monthRecord.entries),
    [monthRecord.entries],
  )

  const totalDays = daysInMonth(year, month)

  const shiftMonth = (delta: number) => {
    setView((prev) => {
      const d = new Date(prev.year, prev.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const markEkadashi = (day: number) => {
    setEntry(day, `Ekadashi ${profile.ekadashiCount}`)
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sadhana-backup-${year}-${String(month + 1).padStart(2, '0')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportFile = (file: File) => {
    file.text().then((text) => {
      try {
        const parsed = JSON.parse(text)
        importData(parsed)
      } catch {
        window.alert('Could not read backup file.')
      }
    })
  }

  return (
    <div className="app">
      <header className="toolbar print-hide">
        <div className="toolbar-left">
          <h2 className="app-name">Sadhana Recorder</h2>
          <p className="app-tagline">Daily chanting log — saved on this device</p>
        </div>
        <div className="toolbar-actions">
          <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">
            ←
          </button>
          <span className="month-label">{monthTitle(year, month).replace(' Sadhana Card', '')}</span>
          <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
            →
          </button>
          <button type="button" onClick={() => setView(todayParts())}>Today</button>
          <button type="button" onClick={() => fillEmptyWithDefault()}>
            Fill empty ({profile.defaultCount})
          </button>
          <button type="button" onClick={() => window.print()}>Print</button>
          <button type="button" onClick={handleExport}>Export</button>
          <button type="button" onClick={() => fileRef.current?.click()}>Import</button>
          <button type="button" onClick={() => setSettingsOpen((o) => !o)}>
            Settings
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleImportFile(f)
              e.target.value = ''
            }}
          />
        </div>
      </header>

      {settingsOpen && (
        <section className="settings print-hide">
          <label>
            Default daily count
            <input
              type="number"
              min={0}
              value={profile.defaultCount}
              onChange={(e) =>
                setProfile({ defaultCount: Number(e.target.value) || 0 })
              }
            />
          </label>
          <label>
            Ekadashi count
            <input
              type="number"
              min={0}
              value={profile.ekadashiCount}
              onChange={(e) =>
                setProfile({ ekadashiCount: Number(e.target.value) || 0 })
              }
            />
          </label>
          <button
            type="button"
            className="danger"
            onClick={() => {
              if (window.confirm('Clear all entries for this month?')) clearMonth()
            }}
          >
            Clear this month
          </button>
        </section>
      )}

      <section className="stats print-hide">
        <span>
          Logged: <strong>{stats.filledDays}</strong> / {totalDays} days
        </span>
        <span>
          Total count: <strong>{stats.totalCount}</strong>
        </span>
      </section>

      <SadhanaCard
        year={year}
        month={month}
        profile={profile}
        record={monthRecord}
        onEntryChange={setEntry}
        onProfileChange={setProfile}
        onMarkEkadashi={markEkadashi}
      />
    </div>
  )
}

export default App
