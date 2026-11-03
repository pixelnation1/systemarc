"use client";
import { useState } from "react";
import Link from "next/link";
import { buildScenarios } from "@/lib/build-scenarios";

export function WorkflowExplorer() {
  const [selected, setSelected] = useState(0);
  const scenario = buildScenarios[selected];
  return <div className="arc-explorer">
    <div className="arc-choice-row" aria-label="Choose a business goal">{buildScenarios.map((item, i) => <button key={item.id} type="button" aria-pressed={selected === i} aria-controls="workflow-result" onClick={() => setSelected(i)}>{item.label}<span aria-hidden="true">↗</span></button>)}</div>
    <div id="workflow-result" className="arc-explorer-body" aria-live="polite">
      <div className="arc-explorer-copy"><span className="arc-kicker">Your next possibility / 0{selected + 1}</span><h3>{scenario.name}</h3><p>{scenario.description}</p><div className="arc-outcome"><span>THE GOAL</span><p>{scenario.outcome}</p></div><Link className="arc-primary" href={`/start-a-project?scenario=${scenario.id}`}>Build something like this <span aria-hidden="true">↗</span></Link><Link className="arc-text-link" href={scenario.href}>Explore this service →</Link></div>
      <div className="arc-demo"><div className="arc-demo-top"><span className="arc-dot" />SystemArc / {scenario.solution}<span className="arc-demo-label">Concept preview</span></div><div className="arc-demo-inner"><p className="arc-kicker">A clearer view of the work</p><div className="arc-demo-title">Everything has a next step.</div><div className="arc-demo-table">{scenario.rows.map(([label, state], i) => <div key={label}><span className="arc-demo-check">{String(i + 1).padStart(2, "0")}</span><strong>{label}</strong><span className="arc-status">{state}</span></div>)}</div><ol className="arc-flow">{scenario.stages.map((stage, i) => <li key={stage}><span>{i + 1}</span>{stage}</li>)}</ol><p className="arc-demo-note">Illustrative experience. Your tools, permissions, and workflow shape the final build.</p></div></div>
    </div>
  </div>;
}
