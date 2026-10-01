import { useMemo, useState } from 'react';
import { Github, Menu, Moon, Search, Sparkles, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Visualizer from './components/Visualizer';
import TopicInfo from './components/TopicInfo';
import { categoryOrder, topics, totalModules } from './data/topics';
import type { Topic } from './data/topics';

export default function App() {
  const [selectedId, setSelectedId] = useState('bubble-sort');
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const selected = useMemo<Topic>(() => {
    return topics.find(topic => topic.id === selectedId) ?? topics[0];
  }, [selectedId]);

  const selectTopic = (topic: Topic) => {
    setSelectedId(topic.id);
    setMobileOpen(false);
    window.setTimeout(() => {
      document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 20);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-brand">
          <div className="header-logo"><Sparkles size={16} /></div>
          <strong>AlgoLab</strong>
        </div>

        <nav className="header-nav">
          <a className="active" href="#visualizer">Visualizer</a>
          <a href="#learn">Learn</a>
          <a href="#complexity">Complexity</a>
        </nav>

        <div className="header-actions">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <button aria-label="Theme">
            <Moon size={17} />
          </button>
        </div>

        <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </header>

      <div className="page-layout">
        <div className={`mobile-backdrop ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />
        <div className={`sidebar-drawer ${mobileOpen ? 'open' : ''}`}>
          <div className="mobile-sidebar-head">
            <span>Explore DSA</span>
            <button onClick={() => setMobileOpen(false)}><X size={18} /></button>
          </div>
          <Sidebar
            topics={topics}
            categoryOrder={categoryOrder}
            selected={selectedId}
            query={query}
            onQuery={setQuery}
            onSelect={selectTopic}
          />
        </div>

        <main className="content">
          <section className="visualizer-page-heading">
            <div>
              <div className="eyebrow"><span /> INTERACTIVE LEARNING</div>
              <h1>Algorithm Visualizer</h1>
              <p>Interactive visual representations of data structures and algorithms.</p>
            </div>
            <div className="module-summary">
              <strong>{totalModules}</strong>
              <span>interactive modules</span>
            </div>
          </section>

          <div className="mobile-search">
            <Search size={16} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search for algorithms..."
            />
          </div>

          <section className="desktop-sidebar-and-content">
            <div className="desktop-sidebar">
              <Sidebar
                topics={topics}
                categoryOrder={categoryOrder}
                selected={selectedId}
                query={query}
                onQuery={setQuery}
                onSelect={selectTopic}
              />
            </div>

            <div className="main-column">
              <section className="selected-module" id="visualizer">
                <div className="module-topline">
                  <div>
                    <span className="module-path">{selected.category} / {selected.section}</span>
                    <h2>{selected.title}</h2>
                  </div>
                  <span className={`difficulty ${selected.difficulty.toLowerCase()}`}>{selected.difficulty}</span>
                </div>
                <Visualizer topic={selected} />
                <TopicInfo topic={selected} />
              </section>

              <section className="complexity-section" id="complexity">
                <div className="section-heading">
                  <span className="eyebrow">COMPLEXITY</span>
                  <h2>Understand how algorithms scale.</h2>
                  <p>Use these common growth classes as a reference while you work through the visualizations.</p>
                </div>
                <div className="complexity-table">
                  <div><strong>O(1)</strong><span>Constant</span><small>Direct access, stack push/pop</small></div>
                  <div><strong>O(log n)</strong><span>Logarithmic</span><small>Binary search</small></div>
                  <div><strong>O(n)</strong><span>Linear</span><small>Linear search, traversal</small></div>
                  <div><strong>O(n log n)</strong><span>Linearithmic</span><small>Merge sort, heap sort</small></div>
                  <div><strong>O(n²)</strong><span>Quadratic</span><small>Bubble, selection, insertion sort</small></div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>

      <footer className="site-footer">
        <div><strong>AlgoLab</strong><span>Interactive visualization tools for mastering data structures and algorithms.</span></div>
        <span>Built for students, interview prep, and self-learners.</span>
      </footer>
    </div>
  );
}
