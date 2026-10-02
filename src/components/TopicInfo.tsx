import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock3, Code2, Copy, Check, Lightbulb, Layers3 } from 'lucide-react';
import type { Topic } from '../data/topics';
import { getImplementation, languages, type Language } from '../data/implementations';
import { getComplexity } from '../data/complexity';

export default function TopicInfo({ topic }: { topic: Topic }) {
  const [language, setLanguage] = useState<Language>('TypeScript');
  const [copied, setCopied] = useState(false);
  const implementations = useMemo(() => getImplementation(topic), [topic]);
  const currentCode = implementations?.[language] ?? null;
  const hasImplementation = Boolean(implementations);
  const complexity = useMemo(() => getComplexity(topic), [topic]);

  const copyCode = async () => {
    if (!currentCode) return;
    await navigator.clipboard?.writeText(currentCode.join('\n'));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section className="lesson-area" id="learn">
      <div className="lesson-heading">
        <div>
          <div className="breadcrumb">
            {topic.category}
            <span>/</span>
            {topic.section}
          </div>
          <h2>{topic.title}</h2>
          <p>{topic.description}</p>
        </div>
        <span className={`difficulty ${topic.difficulty.toLowerCase()}`}>{topic.difficulty}</span>
      </div>

      <div className="metrics">
        <Metric icon={<Clock3 />} label="Best Time" value={complexity.best} />
        <Metric icon={<Clock3 />} label="Average Time" value={complexity.average} />
        <Metric icon={<Clock3 />} label="Worst Time" value={complexity.worst} />
        <Metric icon={<Layers3 />} label="Space" value={complexity.space} />
      </div>

      <div className="lesson-grid">
        <article className="lesson-card explanation-card">
          <div className="card-kicker">
            <Lightbulb size={15} /> HOW IT WORKS
          </div>
          <h3>How to solve it, step by step.</h3>
          <p>{topic.explanation}</p>

          <div className="step-list">
            {topic.steps.map((step, index) => (
              <div className="lesson-step" key={`${topic.id}-${index}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </article>

        {hasImplementation && currentCode && <article className="lesson-card implementation-card">
          <div className="code-heading">
            <div className="card-kicker">
              <Code2 size={15} /> IMPLEMENTATION
            </div>
            <div className="language-tabs" role="tablist" aria-label="Programming language">
              {languages.map(item => (
                <button
                  key={item}
                  className={language === item ? 'selected' : ''}
                  onClick={() => { setLanguage(item); setCopied(false); }}
                  role="tab"
                  aria-selected={language === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="code-window">
            <div className="code-window-bar">
              <span>{topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.{language === 'Python' ? 'py' : language === 'Java' ? 'java' : language === 'C++' ? 'cpp' : language === 'TypeScript' ? 'ts' : 'js'}</span>
              <button className="copy-code" onClick={copyCode}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}</button>
            </div>
            <pre>
              <code>
                {currentCode.map((line, index) => (
                  <span className="code-line" key={`${index}-${line}`}>
                    <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                    <span>{line || ' '}</span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </article>}
      </div>

      <div className="lesson-bottom-grid">
        <article className="detail-card">
          <div className="card-kicker">
            <CheckCircle2 size={15} /> COMPLEXITY
          </div>
          <div className="complexity-row complexity-four">
            <div><span>Best</span><strong>{complexity.best}</strong></div>
            <div><span>Average</span><strong>{complexity.average}</strong></div>
            <div><span>Worst</span><strong>{complexity.worst}</strong></div>
            <div><span>Space</span><strong>{complexity.space}</strong></div>
          </div>
          {complexity.operation && <p className="operation-note"><strong>Operations:</strong> {complexity.operation}</p>}
          {complexity.note && <p className="complexity-note">{complexity.note}</p>}
          <p>Complexity describes how the amount of work or memory changes as the input grows. The best, average, and worst cases are shown separately whenever the algorithm has meaningful case differences.</p>
        </article>

        <article className="detail-card">
          <div className="card-kicker">
            <BookOpen size={15} /> INTERVIEW NOTES
          </div>
          <h3>What should you explain?</h3>
          <p>
            Start with the invariant or rule, describe the state that changes, then give the time and space complexity. That demonstrates understanding instead of memorization.
          </p>
          <div className="tag-list">
            {topic.tags.map(tag => <span key={tag}>#{tag}</span>)}
          </div>
        </article>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="metric">
      <span className="metric-icon">{icon}</span>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </div>
  );
}
