import { useEffect, useMemo, useState } from 'react';
import {
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  SkipBack,
  SkipForward,
  Plus,
  Minus,
  Search,
  Trash2,
} from 'lucide-react';
import type { TraceStep } from '../types';
import type { Topic } from '../data/topics';

const DEFAULT_VALUES = [7, 3, 8, 2, 6, 4, 5];

function pushStep(
  steps: TraceStep[],
  values: number[],
  active: number[],
  message: string,
  line: number,
  variables: Record<string, string> = {},
  sorted: number[] = [],
) {
  steps.push({
    values: [...values],
    active,
    sorted,
    message,
    line,
    variables,
  });
}

function makeSortSteps(input: number[], algorithm: string): TraceStep[] {
  const a = [...input];
  const steps: TraceStep[] = [];
  const sorted: number[] = [];

  pushStep(steps, a, [], `Start ${algorithm} with an unsorted array.`, 1);

  if (algorithm === 'Bubble Sort') {
    for (let end = a.length - 1; end > 0; end -= 1) {
      let swapped = false;

      for (let i = 0; i < end; i += 1) {
        pushStep(
          steps,
          a,
          [i, i + 1],
          `Compare ${a[i]} and ${a[i + 1]}.`,
          4,
          { i: String(i), j: String(i + 1) },
          sorted,
        );

        if (a[i] > a[i + 1]) {
          [a[i], a[i + 1]] = [a[i + 1], a[i]];
          swapped = true;

          pushStep(
            steps,
            a,
            [i, i + 1],
            `Swap the pair because ${a[i]} is now smaller than ${a[i + 1]}.`,
            6,
            { i: String(i), j: String(i + 1) },
            sorted,
          );
        }
      }

      sorted.unshift(end);
      pushStep(steps, a, [], `${a[end]} has reached its final position.`, 8, {}, sorted);

      if (!swapped) {
        break;
      }
    }
  } else if (algorithm === 'Selection Sort') {
    for (let i = 0; i < a.length - 1; i += 1) {
      let minimum = i;

      for (let j = i + 1; j < a.length; j += 1) {
        pushStep(
          steps,
          a,
          [minimum, j],
          `Compare the current minimum ${a[minimum]} with ${a[j]}.`,
          5,
          { i: String(i), min: String(minimum), j: String(j) },
          sorted,
        );

        if (a[j] < a[minimum]) {
          minimum = j;
        }
      }

      if (minimum !== i) {
        [a[i], a[minimum]] = [a[minimum], a[i]];
        pushStep(
          steps,
          a,
          [i, minimum],
          `Place the smallest remaining value at index ${i}.`,
          8,
          { i: String(i), min: String(minimum) },
          sorted,
        );
      }

      sorted.push(i);
    }

    sorted.push(a.length - 1);
  } else if (algorithm === 'Insertion Sort') {
    for (let i = 1; i < a.length; i += 1) {
      let j = i;
      const key = a[i];

      pushStep(
        steps,
        a,
        [i],
        `Take ${key} as the key and compare it with the sorted prefix.`,
        3,
        { i: String(i), key: String(key) },
        sorted,
      );

      while (j > 0 && a[j - 1] > key) {
        pushStep(
          steps,
          a,
          [j - 1, j],
          `${a[j - 1]} is larger than ${key}, so shift it right.`,
          5,
          { j: String(j) },
          sorted,
        );

        a[j] = a[j - 1];
        j -= 1;
      }

      a[j] = key;
      sorted.push(i);
    }
  } else if (algorithm === 'Merge Sort') {
    const mergeSort = (left: number, right: number) => {
      if (right - left <= 1) {
        return;
      }

      const middle = Math.floor((left + right) / 2);
      mergeSort(left, middle);
      mergeSort(middle, right);

      let i = left;
      let j = middle;
      const merged: number[] = [];

      while (i < middle && j < right) {
        pushStep(
          steps,
          a,
          [i, j],
          `Compare the front values of the two sorted halves.`,
          9,
          { left: String(a[i]), right: String(a[j]) },
        );

        if (a[i] <= a[j]) {
          merged.push(a[i]);
          i += 1;
        } else {
          merged.push(a[j]);
          j += 1;
        }
      }

      while (i < middle) {
        merged.push(a[i]);
        i += 1;
      }

      while (j < right) {
        merged.push(a[j]);
        j += 1;
      }

      merged.forEach((value, offset) => {
        a[left + offset] = value;
      });

      pushStep(
        steps,
        a,
        Array.from({ length: right - left }, (_, offset) => left + offset),
        `Write the merged sorted run back into the array.`,
        12,
      );
    };

    mergeSort(0, a.length);
  } else if (algorithm === 'Quick Sort') {
    const quickSort = (left: number, right: number) => {
      if (left >= right) {
        return;
      }

      const pivot = a[right];
      let store = left;

      for (let j = left; j < right; j += 1) {
        pushStep(
          steps,
          a,
          [j, right],
          `Compare ${a[j]} with pivot ${pivot}.`,
          5,
          { left: String(left), i: String(store), j: String(j), pivot: String(pivot) },
        );

        if (a[j] < pivot) {
          [a[store], a[j]] = [a[j], a[store]];
          store += 1;
        }
      }

      [a[store], a[right]] = [a[right], a[store]];
      pushStep(steps, a, [store], `Place pivot ${pivot} at index ${store}.`, 8, {
        pivot: String(pivot),
        index: String(store),
      });

      quickSort(left, store - 1);
      quickSort(store + 1, right);
    };

    quickSort(0, a.length - 1);
  } else {
    const heapify = (length: number, root: number) => {
      let largest = root;
      const left = root * 2 + 1;
      const right = root * 2 + 2;

      if (left < length && a[left] > a[largest]) {
        largest = left;
      }

      if (right < length && a[right] > a[largest]) {
        largest = right;
      }

      if (largest !== root) {
        [a[root], a[largest]] = [a[largest], a[root]];
        pushStep(steps, a, [root, largest], `Swap to restore the max-heap property.`, 7, {
          root: String(root),
          largest: String(largest),
        });
        heapify(length, largest);
      }
    };

    for (let i = Math.floor(a.length / 2) - 1; i >= 0; i -= 1) {
      heapify(a.length, i);
    }

    for (let end = a.length - 1; end > 0; end -= 1) {
      [a[0], a[end]] = [a[end], a[0]];
      sorted.unshift(end);
      pushStep(steps, a, [0, end], `Move the largest heap value to index ${end}.`, 10, {}, sorted);
      heapify(end, 0);
    }
  }

  pushStep(
    steps,
    a,
    [],
    `${algorithm} is complete. The array is sorted.`,
    99,
    {},
    Array.from({ length: a.length }, (_, index) => index),
  );

  return steps;
}

function makeSearchSteps(input: number[], target: number, binary: boolean): TraceStep[] {
  const values = binary ? [...input].sort((a, b) => a - b) : [...input];
  const steps: TraceStep[] = [];

  if (binary) {
    let low = 0;
    let high = values.length - 1;

    while (low <= high) {
      const middle = Math.floor((low + high) / 2);

      pushStep(
        steps,
        values,
        [middle],
        `Check the middle value ${values[middle]}.`,
        5,
        { low: String(low), mid: String(middle), high: String(high) },
      );

      if (values[middle] === target) {
        pushStep(steps, values, [middle], `Found ${target} at index ${middle}.`, 6, {
          index: String(middle),
        });
        return steps;
      }

      if (values[middle] < target) {
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }

    pushStep(steps, values, [], `${target} is not present in the array.`, 12);
    return steps;
  }

  for (let index = 0; index < values.length; index += 1) {
    const found = values[index] === target;

    pushStep(
      steps,
      values,
      [index],
      found
        ? `Index ${index} contains ${target}. The search succeeds.`
        : `Index ${index} contains ${values[index]}, so keep scanning.`,
      4,
      { i: String(index), target: String(target) },
    );

    if (found) {
      break;
    }
  }

  if (!steps.some(step => step.message.includes('succeeds'))) {
    pushStep(steps, values, [], `${target} is not present in the array.`, 8);
  }

  return steps;
}

export default function Visualizer({ topic }: { topic: Topic }) {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [input, setInput] = useState(DEFAULT_VALUES.join(', '));
  const [target, setTarget] = useState(6);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [stack, setStack] = useState([42, 18, 73]);
  const [queue, setQueue] = useState([12, 27, 41]);
  const [list, setList] = useState([12, 28, 41, 67]);
  const [treeValues, setTreeValues] = useState([50, 30, 70, 20, 40, 60, 80]);
  const [graphVisited, setGraphVisited] = useState<number[]>([]);
  const [message, setMessage] = useState('Ready. Change the input, then step through the algorithm.');

  const isSort = topic.kind === 'sort';
  const isSearch = topic.kind === 'search';
  const isGraph = topic.kind === 'graph';
  const isTree = topic.kind === 'tree';
  const binary = topic.id === 'binary-search';

  const steps = useMemo(() => {
    if (isSort) {
      return makeSortSteps(values, topic.title);
    }

    if (isSearch) {
      return makeSearchSteps(values, target, binary);
    }

    return [];
  }, [binary, isSearch, isSort, target, topic.title, values]);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
    setMessage('Ready. Change the input, then step through the algorithm.');
    setGraphVisited([]);
  }, [topic.id]);

  useEffect(() => {
    if (!playing || !steps.length) {
      return;
    }

    const timer = window.setInterval(() => {
      setStep(current => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 750 / speed);

    return () => window.clearInterval(timer);
  }, [playing, speed, steps.length]);

  const current = steps[step];

  const loadInput = () => {
    const parsed = input
      .split(/[\s,]+/)
      .map(Number)
      .filter(Number.isFinite)
      .slice(0, 14);

    if (parsed.length) {
      setValues(parsed);
      setStep(0);
      setPlaying(false);
      setMessage(`Loaded ${parsed.length} values.`);
    }
  };

  const randomize = () => {
    const next = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setValues(next);
    setInput(next.join(', '));
    setStep(0);
    setPlaying(false);
  };

  if (isSort || isSearch) {
    return (
      <div className="visualizer-card">
        <VisualizerHeader topic={topic} message={current?.message ?? message} onReset={() => setStep(0)} />

        <div className="control-panel">
          <label>
            <span>Input array</span>
            <input
              value={input}
              onChange={event => setInput(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && loadInput()}
              aria-label="Input array"
            />
          </label>

          {isSearch && (
            <label className="small-control">
              <span>Target</span>
              <input
                type="number"
                value={target}
                onChange={event => setTarget(Number(event.target.value))}
              />
            </label>
          )}

          <button className="primary-button" onClick={loadInput}>
            <Play size={15} /> Run
          </button>

          <button className="secondary-button" onClick={randomize}>
            <Shuffle size={15} /> Randomize
          </button>
        </div>

        <div className="visual-stage array-stage">
          <div className="stage-label">{binary ? 'Sorted input' : 'Array state'}</div>
          <div className="array-visual">
            {(current?.values ?? values).map((value, index) => {
              const active = current?.active.includes(index);
              const sorted = current?.sorted?.includes(index);
              const isI = current?.variables.i === String(index);
              const isJ = current?.variables.j === String(index);

              return (
                <div className="array-slot" key={`${index}-${value}`}>
                  <div className={`array-value ${active ? 'active' : ''} ${sorted ? 'sorted' : ''}`}>
                    {value}
                  </div>
                  <span className="array-index">{index}</span>
                  {isI && <b className="array-pointer">i</b>}
                  {isJ && <b className="array-pointer second">j</b>}
                </div>
              );
            })}
          </div>
        </div>

        <TraceControls
          step={step}
          total={steps.length}
          playing={playing}
          speed={speed}
          onFirst={() => setStep(0)}
          onPrevious={() => setStep(value => Math.max(0, value - 1))}
          onPlay={() => setPlaying(value => !value)}
          onNext={() => setStep(value => Math.min(Math.max(steps.length - 1, 0), value + 1))}
          onReset={() => {
            setStep(0);
            setPlaying(false);
          }}
          onSpeed={setSpeed}
        />

        <div className="trace-status">
          <div>
            <span>Current line</span>
            <strong>{current?.line ?? '—'}</strong>
          </div>
          {Object.entries(current?.variables ?? {}).map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic.kind === 'stack') {
    return (
      <StructureLab
        topic={topic}
        values={stack}
        setValues={setStack}
        mode="stack"
      />
    );
  }

  if (topic.kind === 'queue') {
    return (
      <StructureLab
        topic={topic}
        values={queue}
        setValues={setQueue}
        mode="queue"
      />
    );
  }

  if (topic.kind === 'list') {
    return <ListLab topic={topic} values={list} setValues={setList} />;
  }

  if (isTree) {
    return <TreeLab topic={topic} values={treeValues} setValues={setTreeValues} />;
  }

  if (isGraph) {
    return <GraphLab topic={topic} visited={graphVisited} setVisited={setGraphVisited} />;
  }

  return <ConceptLab topic={topic} />;
}

function VisualizerHeader({
  topic,
  message,
  onReset,
}: {
  topic: Topic;
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="visualizer-header">
      <div>
        <div className="live-badge">
          <span /> LIVE VISUALIZATION
        </div>
        <h3>{topic.title}</h3>
        <p>{message}</p>
      </div>
      <button className="icon-button" onClick={onReset} aria-label="Reset visualization">
        <RotateCcw size={16} />
      </button>
    </div>
  );
}

function TraceControls({
  step,
  total,
  playing,
  speed,
  onFirst,
  onPrevious,
  onPlay,
  onNext,
  onReset,
  onSpeed,
}: {
  step: number;
  total: number;
  playing: boolean;
  speed: number;
  onFirst: () => void;
  onPrevious: () => void;
  onPlay: () => void;
  onNext: () => void;
  onReset: () => void;
  onSpeed: (value: number) => void;
}) {
  const progress = total ? ((step + 1) / total) * 100 : 0;

  return (
    <div className="trace-controls">
      <div className="trace-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="control-row">
        <div className="transport">
          <button onClick={onFirst} title="First step">
            <SkipBack size={15} />
          </button>
          <button onClick={onPrevious} title="Previous step">
            <SkipBack size={15} />
          </button>
          <button className="play-button" onClick={onPlay} title={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button onClick={onNext} title="Next step">
            <SkipForward size={15} />
          </button>
          <button onClick={onReset} title="Reset">
            <RotateCcw size={15} />
          </button>
        </div>

        <div className="speed-control">
          <span>Speed</span>
          <select value={speed} onChange={event => onSpeed(Number(event.target.value))}>
            <option value="0.5">0.5×</option>
            <option value="1">1×</option>
            <option value="1.5">1.5×</option>
            <option value="2">2×</option>
          </select>
        </div>

        <span className="step-counter">
          Step <b>{total ? step + 1 : 0}</b> / {total}
        </span>
      </div>
    </div>
  );
}

function StructureLab({
  topic,
  values,
  setValues,
  mode,
}: {
  topic: Topic;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
  mode: 'stack' | 'queue';
}) {
  const [lastAction, setLastAction] = useState('Ready for an operation.');

  const add = () => {
    const value = Math.floor(Math.random() * 90) + 10;
    setValues(current => [...current, value]);
    setLastAction(
      mode === 'stack'
        ? `push(${value}) puts ${value} on the top.`
        : `enqueue(${value}) puts ${value} at the rear.`,
    );
  };

  const remove = () => {
    if (!values.length) {
      setLastAction(`Cannot remove: the ${mode} is empty.`);
      return;
    }

    const removed = mode === 'stack' ? values[values.length - 1] : values[0];
    setValues(current => (mode === 'stack' ? current.slice(0, -1) : current.slice(1)));
    setLastAction(
      mode === 'stack'
        ? `pop() removes ${removed} from the top.`
        : `dequeue() removes ${removed} from the front.`,
    );
  };

  const peek = mode === 'stack' ? values[values.length - 1] : values[0];

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={lastAction} onReset={() => setValues([])} />

      <div className={`structure-stage ${mode}`}>
        <div className="stage-label">{mode === 'stack' ? 'TOP →' : 'FRONT →'}</div>
        <div className="structure-visual">
          {values.map((value, index) => (
            <div className="structure-cell" key={`${value}-${index}`}>
              <strong>{value}</strong>
              <span>
                {mode === 'stack'
                  ? index === values.length - 1
                    ? 'top'
                    : ''
                  : index === 0
                    ? 'front'
                    : index === values.length - 1
                      ? 'rear'
                      : ''}
              </span>
            </div>
          ))}
          {!values.length && <div className="empty-structure">null</div>}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={add}>
          <Plus size={15} /> {mode === 'stack' ? 'Push' : 'Enqueue'}
        </button>
        <button className="secondary-button" onClick={remove}>
          <Minus size={15} /> {mode === 'stack' ? 'Pop' : 'Dequeue'}
        </button>
        <button className="secondary-button" onClick={() => setLastAction(`${mode === 'stack' ? 'peek()' : 'front()'} = ${peek ?? 'null'}.`)}>
          <Search size={15} /> Peek
        </button>
        <button className="secondary-button" onClick={() => setLastAction(values.length ? 'The structure is not empty.' : 'The structure is empty.')}>
          Is Empty?
        </button>
      </div>
    </div>
  );
}

function ListLab({
  topic,
  values,
  setValues,
}: {
  topic: Topic;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState('head points to the first node; each next pointer continues the chain.');

  const insert = () => {
    const value = Math.floor(Math.random() * 90) + 10;
    setValues(current => [value, ...current]);
    setMessage(`Inserted ${value} at the head. The head pointer now references the new node.`);
  };

  const remove = () => {
    if (!values.length) {
      setMessage('The head is null, so there is nothing to delete.');
      return;
    }

    setValues(current => current.slice(1));
    setMessage('Deleted the head node and moved head to head.next.');
    setSelected(null);
  };

  const reverse = () => {
    setValues(current => [...current].reverse());
    setMessage('Every link is conceptually reversed, so the previous tail becomes the new head.');
  };

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([12, 28, 41, 67])} />

      <div className="linked-stage">
        <div className="pointer-label">HEAD</div>
        <div className="linked-visual">
          {values.map((value, index) => (
            <div className="linked-unit" key={`${value}-${index}`}>
              <button className={`linked-node ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)}>
                <strong>{value}</strong>
                <span>next</span>
              </button>
              {index < values.length - 1 ? <span className="link-arrow">→</span> : <span className="null-arrow">→ null</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={insert}>
          <Plus size={15} /> Insert head
        </button>
        <button className="secondary-button" onClick={remove}>
          <Trash2 size={15} /> Delete head
        </button>
        <button className="secondary-button" onClick={() => setMessage(values.length ? `Traversal: ${values.join(' → ')} → null` : 'Traversal stops immediately because head is null.')}>
          Traverse
        </button>
        <button className="secondary-button" onClick={reverse}>
          Reverse
        </button>
      </div>
    </div>
  );
}

function TreeLab({
  topic,
  values,
  setValues,
}: {
  topic: Topic;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [message, setMessage] = useState('Click a value to inspect a node, or insert a new value into the BST.');
  const [active, setActive] = useState<number | null>(null);

  const insert = () => {
    const value = Math.floor(Math.random() * 90) + 10;
    if (values.includes(value)) {
      setMessage(`${value} already exists, so the BST does not create a duplicate node.`);
      return;
    }
    setValues(current => [...current, value]);
    setMessage(`Insert ${value}: compare at each node and follow left for smaller or right for larger.`);
  };

  const traversal = () => {
    const sorted = [...values].sort((a, b) => a - b);
    setMessage(`${topic.title}: ${sorted.join(' → ')}`);
  };

  const positions = [
    { left: 50, top: 12 },
    { left: 30, top: 37 },
    { left: 70, top: 37 },
    { left: 18, top: 64 },
    { left: 40, top: 64 },
    { left: 60, top: 64 },
    { left: 82, top: 64 },
  ];

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([50, 30, 70, 20, 40, 60, 80])} />

      <div className="tree-stage">
        <svg className="tree-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="18" x2="30" y2="42" />
          <line x1="50" y1="18" x2="70" y2="42" />
          <line x1="30" y1="43" x2="18" y2="69" />
          <line x1="30" y1="43" x2="40" y2="69" />
          <line x1="70" y1="43" x2="60" y2="69" />
          <line x1="70" y1="43" x2="82" y2="69" />
        </svg>

        {values.slice(0, 7).map((value, index) => (
          <button
            className={`tree-node ${active === value ? 'active' : ''}`}
            style={{ left: `${positions[index].left}%`, top: `${positions[index].top}%` }}
            key={`${value}-${index}`}
            onClick={() => {
              setActive(value);
              setMessage(`Node ${value}: its position is determined by the BST ordering rule.`);
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={insert}>
          <Plus size={15} /> Insert
        </button>
        <button className="secondary-button" onClick={traversal}>
          <Search size={15} /> Trace traversal
        </button>
        <button className="secondary-button" onClick={() => setMessage(`Height is approximately ${Math.ceil(Math.log2(Math.max(values.length, 1) + 1)) - 1} levels for this balanced-looking example.`)}>
          Measure height
        </button>
      </div>
    </div>
  );
}

function GraphLab({
  topic,
  visited,
  setVisited,
}: {
  topic: Topic;
  visited: number[];
  setVisited: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [message, setMessage] = useState('Choose a vertex or run the algorithm to see the traversal order.');
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [4, 5],
  ];

  const run = () => {
    const adjacency: number[][] = Array.from({ length: 6 }, () => []);
    edges.forEach(([a, b]) => {
      adjacency[a].push(b);
      adjacency[b].push(a);
    });

    const order: number[] = [];
    const seen = new Set<number>();

    if (topic.id === 'dfs') {
      const dfs = (node: number) => {
        if (seen.has(node)) return;
        seen.add(node);
        order.push(node);
        adjacency[node].forEach(dfs);
      };
      dfs(0);
    } else {
      const queue = [0];
      seen.add(0);
      while (queue.length) {
        const node = queue.shift()!;
        order.push(node);
        adjacency[node].forEach(next => {
          if (!seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        });
      }
    }

    setVisited([]);
    let index = 0;
    const timer = window.setInterval(() => {
      setVisited(current => [...current, order[index]]);
      index += 1;
      if (index >= order.length) {
        window.clearInterval(timer);
        setMessage(`${topic.title} finished: ${order.join(' → ')}`);
      }
    }, 400);
  };

  const positions = [
    [14, 50],
    [36, 25],
    [36, 75],
    [62, 18],
    [62, 50],
    [82, 75],
  ];

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setVisited([])} />

      <div className="graph-stage">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map(([a, b], index) => (
            <line
              key={index}
              x1={positions[a][0]}
              y1={positions[a][1]}
              x2={positions[b][0]}
              y2={positions[b][1]}
            />
          ))}
        </svg>

        {positions.map(([left, top], index) => (
          <button
            className={`graph-node ${visited.includes(index) ? 'visited' : ''}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            key={index}
            onClick={() => {
              setVisited(current => current.includes(index) ? current : [...current, index]);
              setMessage(`Visited vertex ${index}.`);
            }}
          >
            {index}
          </button>
        ))}
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={run}>
          <Play size={15} /> Run {topic.title}
        </button>
        <button className="secondary-button" onClick={() => setVisited([])}>
          <RotateCcw size={15} /> Reset
        </button>
        <div className="visit-order">
          <span>Visited</span>
          <strong>{visited.length ? visited.join(' → ') : '—'}</strong>
        </div>
      </div>
    </div>
  );
}

function ConceptLab({ topic }: { topic: Topic }) {
  const [value, setValue] = useState(6);

  const labels =
    topic.section === 'Advanced Trees'
      ? ['root', 'left', 'right', 'leaf', 'leaf']
      : topic.section === 'Applications'
        ? ['input', 'decision', 'branch', 'result']
        : topic.category === 'Stack'
          ? ['top', 'operator', 'operand', 'operand']
          : ['0', '1', '2', '3', '4', '5'];

  return (
    <div className="visualizer-card">
      <VisualizerHeader
        topic={topic}
        message="This module uses the same interactive lesson shell as the core visualizers. Adjust the example, inspect the state, then read the explanation below."
        onReset={() => setValue(6)}
      />

      <div className="concept-stage">
        <div className="concept-summary">
          <span className="stage-label">INTERACTIVE MODEL</span>
          <h4>{topic.title}</h4>
          <p>{topic.description}</p>
        </div>

        <div className="concept-controls">
          <label>
            <span>Example size</span>
            <input
              type="range"
              min="3"
              max="10"
              value={value}
              onChange={event => setValue(Number(event.target.value))}
            />
          </label>
          <strong>{value}</strong>
        </div>

        <div className="concept-model">
          {Array.from({ length: Math.min(value, labels.length) }, (_, index) => (
            <div className={index === Math.floor(value / 2) ? 'model-cell active' : 'model-cell'} key={index}>
              <strong>{labels[index]}</strong>
              <span>state {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
