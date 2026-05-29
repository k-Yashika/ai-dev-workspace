import { useState } from "react"
import { callService } from "../services/Service";
import ResultPanel from "../components/ResultPanel";

const EXAMPLE_REPO = `React + Express SaaS Application
Files: src/App.jsx, src/components/Auth.jsx, src/components/Dashboard.jsx,
server/index.js, server/routes/auth.js, server/routes/api.js, server/middleware/auth.js,
server/models/User.js, server/models/Product.js,
package.json, .env.example, db/schema.sql

Dependencies: react@18, react-router-dom, axios, express, jsonwebtoken, crypto (built-in), sqlite3`;

function AnalyzeTab() {
    const [input, setInput] = useState(EXAMPLE_REPO)
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)

    const run = async () => {
        setLoading(true); setResult("");
        try {
            const output = await callService(
                `You are a senior software architect. Analyze the given codebase description:
                ${input}
                Return:
                1. Architecture Summary - what pattern is used (MVC, microservices, monolith, etc.)
                2. Tech Stack - List every detected technology with a one-line purpose
                3. File Relationship - How key files connect and depend on each other
                4. Data Flow - How data moves through the system (request -> response cycle)
                5. Recommendations - 3 concrete improvements
                
                `
            );
            setResult(output);
        } catch (e){
            setResult(`Error: ${e.message}`);
        }
        setLoading(false);
    }
  return (
    <div className="tab-content">
        <div>
            <label>Paste repo structure, file list or code snippets</label>
            <textarea className="code-input" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Github URL, file tree, or code..." rows={8}/>
            <div className="action-row">
                <button className="btn-primary" onClick={run} disabled={loading || !input.trim()}>
                    {loading ? "Analyzing..." : "Analyze Architecture"}
                 </button>
                 <button className="btn-ghost" onClick={() => setInput(EXAMPLE_REPO)}>
                    Load Example
                 </button>
            </div>
        </div>
        <ResultPanel result={result} loading={loading}/>
    </div>
  )
}

export default AnalyzeTab