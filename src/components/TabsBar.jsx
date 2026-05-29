import { useState } from "react"

const TabsBar = () => {
    const TABS = [
        {id: "analyze", label: "Codebase Analysis"},
    ]

  const [activeTab, setActiveTab] = useState("analyze")
  return (
    <nav className="tabs-bar">
        {TABS.map(t => (
            <button key={t.id} className={`tabs-btn ${activeTab === t.id ? 'active' : ""}`}
            onClick={() => setActiveTab(t.id)}>
                {t.icon} {t.label}
            </button>
        ))}
    </nav>
  )
}

export default TabsBar