function ResultPanel({result, loading}) {
    if (loading) return(
        <div style={{ padding: "2rem", textAlign: "center"}}>
            <div className="pulse-dot" />
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.75rem"}}> Analyzing</p>
        </div>
    );
    if (!result) return null;
  return (
    <div className="result-panel">
        <div className="result-content">{result}</div>
    </div>
  )
}

export default ResultPanel