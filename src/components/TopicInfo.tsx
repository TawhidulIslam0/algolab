import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock3, Code2, Copy, Check, Lightbulb, Layers3 } from 'lucide-react';
import type { Topic } from '../data/topics';
import { getImplementation, languages, type Language } from '../data/implementations';

export default function TopicInfo({ topic }: { topic: Topic }) {
  const [language, setLanguage] = useState<Language>('TypeScript');
  const [copied, setCopied] = useState(false);
  const implementations = useMemo(() => getImplementation(topic), [topic]);
  const currentCode = implementations[language];

  const copyCode = async () => {
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
        <Metric icon={<Clock3 />} label="Time Complexity" value={topic.time} />
        <Metric icon={<Layers3 />} label="Space Complexity" value={topic.space} />
        <Metric icon={<BookOpen />} label="Category" value={topic.category} />
      </div>

      <div className="lesson-grid">
        <article className="lesson-card explanation-card">
          <div className="card-kicker">
            <Lightbulb size={15} /> HOW IT WORKS
          </div>
          <h3>Build the mental model first.</h3>
          <p>{topic.explanation}</p>

          <div className="step-list">
            {topic.steps.map((step, index) => (
              <div className="lesson-step" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="lesson-card implementation-card">
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
              <span>algorithm.ts</span>
              <span>Readable example</span>
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
        </article>
      </div>

      <div className="lesson-bottom-grid">
        <article className="detail-card">
          <div className="card-kicker">
            <CheckCircle2 size={15} /> COMPLEXITY
          </div>
          <div className="complexity-row">
            <div>
              <span>Time</span>
              <strong>{topic.time}</strong>
            </div>
            <div>
              <span>Space</span>
              <strong>{topic.space}</strong>
            </div>
          </div>
          <p>
            Complexity describes how the amount of work or memory changes as the input grows. Use the visualization to see why the cost changes.
          </p>
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
