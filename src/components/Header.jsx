import { useState } from "react"
import AnalyzeTab from "../features/AnalyzeTab";

const Header = () => {
      const TABS = [ // TODO: ADD MORE
          {id: "analyze", label: "Codebase Analysis"},
      ]

          const TAB_COMPONENTS = {
  analyze: AnalyzeTab,
};
  
    const [activeTab, setActiveTab] = useState("analyze")
    const ActiveComp = TAB_COMPONENTS[activeTab];
  return (
    <div className="workspace">
      <header className="header">
        <div>
          <div className="logo-text">Developer Workspace</div>
          <div className="logo-sub">AI-Powered Engineering Tool</div>
        </div>
      </header>
      <nav className="tabs-bar">
        {TABS.map(t => (
            <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ""}`}
            onClick={() => setActiveTab(t.id)}>
                {t.icon} {t.label}
            </button>
        ))}
    </nav>

    <main className="main">
      <ActiveComp />
    </main>
    </div>
  )
}

export default Header