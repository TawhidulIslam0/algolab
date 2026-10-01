import { ChevronDown, ChevronRight, Search, Sparkles, X } from 'lucide-react';
import type { Topic } from '../data/topics';

type Props = {
  topics: Topic[];
  categoryOrder: string[];
  selected: string;
  query: string;
  onQuery: (value: string) => void;
  onSelect: (topic: Topic) => void;
};

export default function Sidebar({ topics, categoryOrder, selected, query, onQuery, onSelect }: Props) {
  const grouped = categoryOrder.map(category => ({
    category,
    sections: Array.from(
      new Set(
        topics
          .filter(topic => topic.category === category)
          .map(topic => topic.section),
      ),
    ),
  }));

  return (
    <aside className="sidebar-panel">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Sparkles size={17} />
        </div>
        <div>
          <strong>AlgoLab</strong>
          <span>DSA Visualizer</span>
        </div>
      </div>

      <div className="sidebar-search">
        <Search size={15} />
        <input
          value={query}
          onChange={event => onQuery(event.target.value)}
          placeholder="Search for algorithms..."
          aria-label="Search algorithms"
        />
        {query && (
          <button onClick={() => onQuery('')} aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="sidebar-scroll">
        {grouped.map(({ category, sections }) => {
          const categoryTopics = topics.filter(topic => topic.category === category);
          const visibleTopics = categoryTopics.filter(topic =>
            `${topic.title} ${topic.section} ${topic.tags.join(' ')}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          );

          if (!visibleTopics.length) return null;

          return (
            <section className="sidebar-category" key={category}>
              <div className="sidebar-category-title">
                <span>{category}</span>
                <b>{visibleTopics.length}</b>
              </div>

              {sections.map(section => {
                const items = visibleTopics.filter(topic => topic.section === section);
                if (!items.length) return null;

                return (
                  <div className="sidebar-section" key={section}>
                    <div className="sidebar-section-title">
                      <span>{section}</span>
                      <span className="section-line" />
                    </div>
                    {items.map(topic => (
                      <button
                        key={topic.id}
                        className={`sidebar-topic ${selected === topic.id ? 'active' : ''}`}
                        onClick={() => onSelect(topic)}
                      >
                        <span className="topic-dot" />
                        <span>{topic.title}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <span>Interactive modules</span>
        <strong>{topics.length}</strong>
      </div>
    </aside>
  );
}
