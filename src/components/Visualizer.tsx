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

  // Strictly bounded to Stack topics & Polish Notations
  if (topic.kind === 'stack' || topic.category === 'Stack' || topic.section === 'Stack' || topic.id === 'stack' || topic.title === 'Push & Pop' || topic.title === 'Peek' || topic.title === 'Is Empty' || topic.title === 'Is Full') {
    return (
      <StackLab
        topic={topic}
        values={stack}
        setValues={setStack}
      />
    );
  }

  if (topic.id === 'postfix' || topic.title === 'Postfix') {
    return <PostfixEvaluationLab topic={topic} />;
  }

  if (topic.id === 'prefix' || topic.title === 'Prefix') {
    return <PrefixEvaluationLab topic={topic} />;
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

  // Specialized Pattern & Method Labs
  if (topic.id === 'matrix' || topic.title.includes('Matrix')) {
    return <MatrixLab topic={topic} />;
  }

  if (topic.id === 'dynamic-array' || topic.title.includes('Dynamic Array')) {
    return <DynamicArrayLab topic={topic} />;
  }

  if (topic.id === 'static-array' || topic.title.includes('Static Array')) {
    return <StaticArrayLab topic={topic} />;
  }

  if (topic.id === 'array-adt' || topic.title.includes('Array Data Structure')) {
    return <ArrayAdtLab topic={topic} />;
  }

  if (topic.id === 'two-pointers' || topic.title.includes('Two Pointers')) {
    return <TwoPointersLab topic={topic} />;
  }

  if (topic.id === 'sliding-window' || topic.title.includes('Sliding Window')) {
    return <SlidingWindowLab topic={topic} />;
  }

  if (topic.id === 'prefix-sum' || topic.title.includes('Prefix Sum')) {
    return <PrefixSumLab topic={topic} />;
  }

  if (topic.id === 'array-access' || topic.title.includes('Array Access')) {
    return <ArrayAccessLab topic={topic} />;
  }

  if (topic.id === 'array-update' || topic.title.includes('Array Update')) {
    return <ArrayUpdateLab topic={topic} />;
  }

  if (topic.id === 'array-insert' || topic.title.includes('Array Insert')) {
    return <ArrayInsertLab topic={topic} />;
  }

  if (topic.id === 'array-delete' || topic.title.includes('Array Delete')) {
    return <ArrayDeleteLab topic={topic} />;
  }

  if (topic.id === 'array-map' || topic.title === 'Map') {
    return <ArrayMapLab topic={topic} />;
  }

  if (topic.id === 'array-filter' || topic.title === 'Filter') {
    return <ArrayFilterLab topic={topic} />;
  }

  if (topic.id === 'array-reduce' || topic.title === 'Reduce') {
    return <ArrayReduceLab topic={topic} />;
  }

  if (topic.id === 'array-slice-splice' || topic.title.includes('Slice & Splice')) {
    return <ArraySliceSpliceLab topic={topic} />;
  }

  if (topic.id === 'vector-capacity' || topic.title.includes('Vector Capacity')) {
    return <DynamicArrayLab topic={topic} />;
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

// ----------------------------------------------------------------------
// Dedicated Vertical Stack & Polish Notation Labs
// ----------------------------------------------------------------------

function StackLab({
  topic,
  values,
  setValues,
}: {
  topic: Topic;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [lastAction, setLastAction] = useState('Ready for stack operations (LIFO).');
  const MAX_CAPACITY = 6;

  const push = () => {
    if (values.length >= MAX_CAPACITY) {
      setLastAction(`Stack Overflow! Capacity is ${MAX_CAPACITY}.`);
      return;
    }
    const value = Math.floor(Math.random() * 90) + 10;
    setValues(current => [...current, value]);
    setLastAction(`push(${value}) placed ${value} at the top of the stack.`);
  };

  const pop = () => {
    if (!values.length) {
      setLastAction('Stack Underflow! The stack is empty.');
      return;
    }
    const removed = values[values.length - 1];
    setValues(current => current.slice(0, -1));
    setLastAction(`pop() removed ${removed} from the top of the stack.`);
  };

  const peek = () => {
    if (!values.length) {
      setLastAction('peek(): Stack is empty (null).');
      return;
    }
    const topVal = values[values.length - 1];
    setLastAction(`peek(): Top element is ${topVal}.`);
  };

  const checkEmpty = () => {
    setLastAction(values.length === 0 ? 'isEmpty(): True, stack has no elements.' : `isEmpty(): False, stack contains ${values.length} item(s).`);
  };

  const checkFull = () => {
    setLastAction(values.length >= MAX_CAPACITY ? `isFull(): True, stack reached capacity (${MAX_CAPACITY}).` : `isFull(): False, space available (${values.length}/${MAX_CAPACITY}).`);
  };

  const displayStack = [...values].reverse();

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={lastAction} onReset={() => setValues([42, 18, 73])} />

      <div className="visual-stage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px', padding: '20px' }}>
        <div className="stage-label" style={{ marginBottom: '10px' }}>VERTICAL STACK (LIFO) — CAPACITY: {values.length}/{MAX_CAPACITY}</div>
        
        <div style={{
          width: '180px',
          minHeight: '220px',
          borderLeft: '4px solid var(--border)',
          borderRight: '4px solid var(--border)',
          borderBottom: '4px solid var(--border)',
          borderTop: 'none',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '10px',
          gap: '6px',
          background: 'var(--surface-2)',
          position: 'relative'
        }}>
          {displayStack.map((val, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={idx}
                style={{
                  width: '150px',
                  height: '40px',
                  background: isTop ? 'var(--accent)' : 'var(--surface)',
                  color: isTop ? '#fff' : 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                  position: 'relative',
                  boxShadow: isTop ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                <span>{val}</span>
                {isTop && (
                  <span style={{
                    position: 'absolute',
                    right: '-55px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    background: 'var(--accent-soft)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    TOP
                  </span>
                )}
              </div>
            );
          })}
          {!values.length && (
            <div style={{ color: 'var(--muted)', fontStyle: 'italic', marginTop: '70px', fontSize: '13px' }}>
              Stack is empty
            </div>
          )}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={push}><Plus size={15} /> Push</button>
        <button className="secondary-button" onClick={pop}><Minus size={15} /> Pop</button>
        <button className="secondary-button" onClick={peek}><Search size={15} /> Peek</button>
        <button className="secondary-button" onClick={checkEmpty}>Is Empty?</button>
        <button className="secondary-button" onClick={checkFull}>Is Full?</button>
      </div>
    </div>
  );
}

function PostfixEvaluationLab({ topic }: { topic: Topic }) {
  const expression = ['2', '3', '*', '5', '+'];
  const [stepIdx, setStepIdx] = useState(0);
  const [stack, setStack] = useState<number[]>([]);
  const [message, setMessage] = useState('Postfix Evaluation (RPN): Scan left to right. Push operands; on operator, pop two operands, compute, and push result.');

  const runStep = () => {
    if (stepIdx >= expression.length) {
      setMessage(`Evaluation complete! Final result = ${stack[0] ?? '—'}`);
      return;
    }
    const token = expression[stepIdx];
    if (!isNaN(Number(token))) {
      const num = Number(token);
      setStack(curr => [...curr, num]);
      setMessage(`Token '${token}' is an operand. Push ${num} onto stack.`);
    } else {
      setStack(curr => {
        if (curr.length < 2) return curr;
        const b = curr[curr.length - 1];
        const a = curr[curr.length - 2];
        let res = 0;
        if (token === '+') res = a + b;
        if (token === '-') res = a - b;
        if (token === '*') res = a * b;
        if (token === '/') res = Math.floor(a / b);
        setMessage(`Token '${token}' is an operator. Pop ${b} and ${a}, compute ${a} ${token} ${b} = ${res}, push ${res}.`);
        return [...curr.slice(0, -2), res];
      });
    }
    setStepIdx(s => s + 1);
  };

  const displayStack = [...stack].reverse();

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => { setStepIdx(0); setStack([]); setMessage('Reset postfix evaluation.'); }} />

      <div className="visual-stage" style={{ minHeight: '340px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="stage-label">EXPRESSION TOKENS: {expression.join(' ')} (Token index: {stepIdx})</div>
        
        <div style={{ display: 'flex', gap: '8px', margin: '15px 0' }}>
          {expression.map((tok, i) => (
            <div key={i} style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: i === stepIdx ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: i === stepIdx ? 'var(--accent-soft)' : 'var(--surface-2)',
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace"
            }}>
              {tok}
            </div>
          ))}
        </div>

        <div className="stage-label" style={{ marginTop: '10px' }}>EVALUATION STACK (VERTICAL LIFO)</div>
        <div style={{
          width: '160px',
          minHeight: '160px',
          borderLeft: '4px solid var(--border)',
          borderRight: '4px solid var(--border)',
          borderBottom: '4px solid var(--border)',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '8px',
          gap: '5px',
          background: 'var(--surface-2)',
          marginTop: '10px',
          position: 'relative'
        }}>
          {displayStack.map((val, idx) => {
            const isTop = idx === 0;
            return (
              <div key={idx} style={{
                width: '130px',
                height: '36px',
                background: isTop ? 'var(--accent)' : 'var(--surface)',
                color: isTop ? '#fff' : 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontFamily: "'DM Mono', monospace",
                position: 'relative'
              }}>
                <span>{val}</span>
                {isTop && <span style={{ position: 'absolute', right: '-45px', fontSize: '10px', fontWeight: 700, color: 'var(--accent)' }}>TOP</span>}
              </div>
            );
          })}
          {!stack.length && <div style={{ color: 'var(--muted)', fontStyle: 'italic', marginTop: '50px', fontSize: '12px' }}>Stack is empty</div>}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={runStep}><Play size={15} /> Next Step</button>
      </div>
    </div>
  );
}

function PrefixEvaluationLab({ topic }: { topic: Topic }) {
  const expression = ['+', '*', '2', '3', '5'];
  const [stepIdx, setStepIdx] = useState(0);
  const [stack, setStack] = useState<number[]>([]);
  const [message, setMessage] = useState('Prefix Evaluation: Scan right to left. Push operands; on operator, compute and push result.');

  const runStep = () => {
    const reversedTokens = [...expression].reverse();
    if (stepIdx >= reversedTokens.length) {
      setMessage(`Prefix evaluation complete! Final result = ${stack[0] ?? '—'}`);
      return;
    }
    const token = reversedTokens[stepIdx];
    if (!isNaN(Number(token))) {
      const num = Number(token);
      setStack(curr => [...curr, num]);
      setMessage(`Scan right-to-left: Token '${token}' is an operand. Push ${num} onto stack.`);
    } else {
      setStack(curr => {
        if (curr.length < 2) return curr;
        const a = curr[curr.length - 1];
        const b = curr[curr.length - 2];
        let res = 0;
        if (token === '+') res = a + b;
        if (token === '-') res = a - b;
        if (token === '*') res = a * b;
        if (token === '/') res = Math.floor(a / b);
        setMessage(`Scan right-to-left: Operator '${token}'. Pop ${a} and ${b}, compute ${a} ${token} ${b} = ${res}, push ${res}.`);
        return [...curr.slice(0, -2), res];
      });
    }
    setStepIdx(s => s + 1);
  };

  const displayStack = [...stack].reverse();

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => { setStepIdx(0); setStack([]); setMessage('Reset prefix evaluation.'); }} />

      <div className="visual-stage" style={{ minHeight: '340px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="stage-label">PREFIX TOKENS: {expression.join(' ')} (Scanning Right-to-Left)</div>
        
        <div style={{ display: 'flex', gap: '8px', margin: '15px 0' }}>
          {expression.map((tok, i) => (
            <div key={i} style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface-2)',
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace"
            }}>
              {tok}
            </div>
          ))}
        </div>

        <div className="stage-label" style={{ marginTop: '10px' }}>EVALUATION STACK (VERTICAL LIFO)</div>
        <div style={{
          width: '160px',
          minHeight: '160px',
          borderLeft: '4px solid var(--border)',
          borderRight: '4px solid var(--border)',
          borderBottom: '4px solid var(--border)',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '8px',
          gap: '5px',
          background: 'var(--surface-2)',
          marginTop: '10px',
          position: 'relative'
        }}>
          {displayStack.map((val, idx) => {
            const isTop = idx === 0;
            return (
              <div key={idx} style={{
                width: '130px',
                height: '36px',
                background: isTop ? 'var(--accent)' : 'var(--surface)',
                color: isTop ? '#fff' : 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontFamily: "'DM Mono', monospace",
                position: 'relative'
              }}>
                <span>{val}</span>
                {isTop && <span style={{ position: 'absolute', right: '-45px', fontSize: '10px', fontWeight: 700, color: 'var(--accent)' }}>TOP</span>}
              </div>
            );
          })}
          {!stack.length && <div style={{ color: 'var(--muted)', fontStyle: 'italic', marginTop: '50px', fontSize: '12px' }}>Stack is empty</div>}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={runStep}><Play size={15} /> Next Step (Right-to-Left)</button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Original StructureLab (for Queues), ListLab, TreeLab, GraphLab, etc.
// ----------------------------------------------------------------------

function StructureLab({
  topic,
  values,
  setValues,
  mode,
}: {
  topic: Topic;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
  mode: 'queue';
}) {
  const [lastAction, setLastAction] = useState('Ready for queue operations (FIFO).');

  const add = () => {
    const value = Math.floor(Math.random() * 90) + 10;
    setValues(current => [...current, value]);
    setLastAction(`enqueue(${value}) puts ${value} at the rear.`);
  };

  const remove = () => {
    if (!values.length) {
      setLastAction('Queue is empty.');
      return;
    }
    const removed = values[0];
    setValues(current => current.slice(1));
    setLastAction(`dequeue() removes ${removed} from the front.`);
  };

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={lastAction} onReset={() => setValues([])} />

      <div className={`structure-stage queue`}>
        <div className="stage-label">FRONT → REAR</div>
        <div className="structure-visual">
          {values.map((value, index) => (
            <div className="structure-cell" key={`${value}-${index}`}>
              <strong>{value}</strong>
              <span>{index === 0 ? 'front' : index === values.length - 1 ? 'rear' : ''}</span>
            </div>
          ))}
          {!values.length && <div className="empty-structure">null</div>}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={add}><Plus size={15} /> Enqueue</button>
        <button className="secondary-button" onClick={remove}><Minus size={15} /> Dequeue</button>
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

function MatrixLab({ topic }: { topic: Topic }) {
  const [matrix, setMatrix] = useState([
    [12, 45, 78],
    [34, 56, 90],
    [23, 67, 89],
  ]);
  const [activeCell, setActiveCell] = useState<[number, number] | null>([0, 0]);
  const [message, setMessage] = useState('Click any cell in the 2D grid to inspect its row [r] and column [c]. O(1) direct access.');

  const randomize = () => {
    setMatrix(
      Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => Math.floor(Math.random() * 90) + 10)
      )
    );
    setActiveCell([0, 0]);
    setMessage('Randomized 3x3 matrix values.');
  };

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={randomize} />

      <div className="visual-stage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <div className="stage-label">2D MATRIX GRID (3 × 3)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 85px)', gap: '10px', marginTop: '20px' }}>
          {matrix.map((row, r) =>
            row.map((val, c) => {
              const isActive = activeCell && activeCell[0] === r && activeCell[1] === c;
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => {
                    setActiveCell([r, c]);
                    setMessage(`Cell matrix[${r}][${c}] contains ${val}. Access time is O(1).`);
                  }}
                  style={{
                    height: '65px',
                    borderRadius: '10px',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: isActive ? 'var(--accent-soft)' : 'var(--surface-2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px',
                  }}
                >
                  <span>{val}</span>
                  <span style={{ fontSize: '9px', color: 'var(--muted-2)' }}>[{r}][{c}]</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={randomize}>
          <Shuffle size={15} /> Randomize Matrix
        </button>
      </div>
    </div>
  );
}

function DynamicArrayLab({ topic }: { topic: Topic }) {
  const [data, setData] = useState([10, 25, 42]);
  const [capacity, setCapacity] = useState(4);
  const [message, setMessage] = useState('Dynamic arrays double their backing capacity when size reaches capacity.');

  const push = () => {
    const val = Math.floor(Math.random() * 90) + 10;
    if (data.length >= capacity) {
      const newCap = capacity * 2;
      setData(curr => [...curr, val]);
      setCapacity(newCap);
      setMessage(`Capacity reached! Resized & doubled capacity to ${newCap}. Added ${val}.`);
    } else {
      setData(curr => [...curr, val]);
      setMessage(`Added ${val} in O(1) amortized time. Size: ${data.length + 1} / Capacity: ${capacity}`);
    }
  };

  const pop = () => {
    if (!data.length) return;
    setData(curr => curr.slice(0, -1));
    setMessage(`Removed last item. Size: ${data.length - 1} / Capacity: ${capacity}`);
  };

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => { setData([10, 25, 42]); setCapacity(4); }} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">DYNAMIC ARRAY / VECTOR (SIZE: {data.length} | CAPACITY: {capacity})</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {Array.from({ length: capacity }, (_, i) => {
            const val = data[i];
            const hasVal = val !== undefined;
            return (
              <div className="array-slot" key={i}>
                <div className={`array-value ${hasVal ? 'active' : ''}`} style={{ opacity: hasVal ? 1 : 0.4, borderStyle: hasVal ? 'solid' : 'dashed' }}>
                  {hasVal ? val : 'ø'}
                </div>
                <span className="array-index">{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={push}><Plus size={15} /> Append</button>
        <button className="secondary-button" onClick={pop}><Minus size={15} /> Pop</button>
      </div>
    </div>
  );
}

function StaticArrayLab({ topic }: { topic: Topic }) {
  const CAPACITY = 6;
  const [data, setData] = useState([12, 34, 56, 78]);
  const [message, setMessage] = useState('Static arrays have a fixed capacity and cannot grow automatically.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setData([12, 34, 56, 78])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">STATIC ARRAY (FIXED CAPACITY = {CAPACITY})</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {Array.from({ length: CAPACITY }, (_, i) => {
            const val = data[i];
            const hasVal = val !== undefined;
            return (
              <div className="array-slot" key={i}>
                <div className={`array-value ${hasVal ? 'active' : ''}`} style={{ opacity: hasVal ? 1 : 0.4 }}>
                  {hasVal ? val : 'null'}
                </div>
                <span className="array-index">idx {i}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          if (data.length < CAPACITY) setData(curr => [...curr, Math.floor(Math.random() * 90) + 10]);
          else setMessage('Array is full.');
        }}><Plus size={15} /> Set Item</button>
        <button className="secondary-button" onClick={() => setData(curr => curr.slice(0, -1))}><Trash2 size={15} /> Clear Last</button>
      </div>
    </div>
  );
}

function ArrayAdtLab({ topic }: { topic: Topic }) {
  const [data, setData] = useState([21, 43, 65, 87, 99]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(2);
  const [message, setMessage] = useState('Contiguous memory allows O(1) random access.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setData([21, 43, 65, 87, 99])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">ARRAY DATA STRUCTURE</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {data.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className={`array-value ${selectedIndex === i ? 'active' : ''}`} onClick={() => { setSelectedIndex(i); setMessage(`Accessed index ${i}: value is ${val}. O(1) time.`); }} style={{ cursor: 'pointer' }}>
                {val}
              </div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TwoPointersLab({ topic }: { topic: Topic }) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(6);
  const values = [2, 5, 8, 12, 16, 23, 38];
  const target = 30;
  const sum = values[left] + values[right];

  const stepForward = () => {
    if (sum === target) {
      setMessage(`Found pair! ${values[left]} + ${values[right]} = ${target}`);
    } else if (sum < target) {
      if (left < right) setLeft(l => l + 1);
      setMessage(`Sum ${sum} < target ${target}, move left pointer right.`);
    } else {
      if (right > left) setRight(r => r - 1);
      setMessage(`Sum ${sum} > target ${target}, move right pointer left.`);
    }
  };

  const [message, setMessage] = useState('Two Pointers pattern: use left and right indices moving inward in O(n) time.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => { setLeft(0); setRight(6); setMessage('Reset pointers.'); }} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">TWO POINTERS (TARGET SUM = {target})</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className={`array-value ${i === left || i === right ? 'active' : ''}`}>
                {val}
              </div>
              <span className="array-index">[{i}]</span>
              {i === left && <b className="array-pointer">left</b>}
              {i === right && <b className="array-pointer second">right</b>}
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={stepForward}>
          <Play size={15} /> Step Pointers
        </button>
      </div>
    </div>
  );
}

function SlidingWindowLab({ topic }: { topic: Topic }) {
  const [windowStart, setWindowStart] = useState(0);
  const windowSize = 3;
  const values = [4, 2, 7, 1, 9, 3, 5];
  const currentWindow = values.slice(windowStart, windowStart + windowSize);
  const windowSum = currentWindow.reduce((a, b) => a + b, 0);
  const [message, setMessage] = useState(`Sliding Window of size ${windowSize}. Current window sum: ${windowSum}`);

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setWindowStart(0)} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">SLIDING WINDOW (K = {windowSize})</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => {
            const inWindow = i >= windowStart && i < windowStart + windowSize;
            return (
              <div className="array-slot" key={i}>
                <div className={`array-value ${inWindow ? 'active' : ''}`}>
                  {val}
                </div>
                <span className="array-index">[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          if (windowStart < values.length - windowSize) {
            const next = windowStart + 1;
            setWindowStart(next);
            const nextSum = values.slice(next, next + windowSize).reduce((a, b) => a + b, 0);
            setMessage(`Slide window right to index ${next}. New sum: ${nextSum}`);
          } else {
            setWindowStart(0);
            setMessage('Window reset to start.');
          }
        }}>
          Slide Window Right
        </button>
      </div>
    </div>
  );
}

function PrefixSumLab({ topic }: { topic: Topic }) {
  const values = [3, 1, 4, 1, 5, 9];
  const prefix = values.reduce((acc: number[], val, idx) => {
    acc.push((acc[idx - 1] ?? 0) + val);
    return acc;
  }, []);
  const [message, setMessage] = useState('Prefix Sum array precomputes cumulative totals for O(1) range queries.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => {}} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '40px 20px 30px' }}>
        <div className="stage-label">ORIGINAL ARRAY VS PREFIX SUM ARRAY</div>
        <div style={{ marginBottom: '10px', fontSize: '11px', color: 'var(--muted)' }}>Original: {values.join(', ')}</div>
        <div className="array-visual">
          {prefix.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className="array-value active">{val}</div>
              <span className="array-index">pre[{i}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrayAccessLab({ topic }: { topic: Topic }) {
  const values = [15, 28, 43, 56, 79];
  const [idx, setIdx] = useState(2);
  const [message, setMessage] = useState('Array Access: BaseAddress + (index × element_size) = O(1).');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setIdx(2)} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">CONSTANT TIME INDEX ACCESS O(1)</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i} onClick={() => { setIdx(i); setMessage(`Accessed index ${i}: Value ${val} computed instantly.`); }} style={{ cursor: 'pointer' }}>
              <div className={`array-value ${idx === i ? 'active' : ''}`}>{val}</div>
              <span className="array-index">[{i}]</span>
              {idx === i && <b className="array-pointer">O(1)</b>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrayUpdateLab({ topic }: { topic: Topic }) {
  const [values, setValues] = useState([10, 20, 30, 40]);
  const [message, setMessage] = useState('Array Update: Directly overwrite the value at a known index in O(1).');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([10, 20, 30, 40])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">UPDATE VALUE AT INDEX</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i} onClick={() => {
              const updated = [...values];
              updated[i] += 5;
              setValues(updated);
              setMessage(`Updated index [${i}] to ${updated[i]}. Direct write is O(1).`);
            }} style={{ cursor: 'pointer' }}>
              <div className="array-value active">{val}</div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrayInsertLab({ topic }: { topic: Topic }) {
  const [values, setValues] = useState([11, 22, 44, 55]);
  const [message, setMessage] = useState('Array Insert: Inserting in the middle requires shifting elements to the right O(n).');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([11, 22, 44, 55])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">INSERTION WITH SHIFTING</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className="array-value active">{val}</div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          const copy = [...values];
          copy.splice(2, 0, 33);
          setValues(copy);
          setMessage('Inserted 33 at index 2. Elements [2..end] shifted right (O(n)).');
        }}>
          Insert 33 at Index 2
        </button>
      </div>
    </div>
  );
}

function ArrayDeleteLab({ topic }: { topic: Topic }) {
  const [values, setValues] = useState([10, 20, 30, 40, 50]);
  const [message, setMessage] = useState('Array Delete: Removing an item requires shifting subsequent elements left O(n).');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([10, 20, 30, 40, 50])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">DELETION WITH SHIFTING</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className="array-value active">{val}</div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          const copy = [...values];
          copy.splice(1, 1);
          setValues(copy);
          setMessage('Deleted item at index 1. Subsequent items shifted left (O(n)).');
        }}>
          Delete Index 1
        </button>
      </div>
    </div>
  );
}

function ArrayMapLab({ topic }: { topic: Topic }) {
  const [values, setValues] = useState([1, 2, 3, 4]);
  const [message, setMessage] = useState('Map: Transform every element in O(n) time.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([1, 2, 3, 4])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">MAP TRANSFORMATION (x × 2)</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className="array-value active">{val}</div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          setValues(curr => curr.map(x => x * 2));
          setMessage('Applied map(x => x * 2) across all elements.');
        }}>
          Multiply by 2 (Map)
        </button>
      </div>
    </div>
  );
}

function ArrayFilterLab({ topic }: { topic: Topic }) {
  const [values, setValues] = useState([3, 8, 12, 5, 16, 7]);
  const [message, setMessage] = useState('Filter: Keep only elements that satisfy a boolean predicate.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([3, 8, 12, 5, 16, 7])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">FILTER PREDICATE (x &gt; 6)</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className={`array-value ${val > 6 ? 'active' : ''}`} style={{ opacity: val > 6 ? 1 : 0.4 }}>
                {val}
              </div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          setValues(curr => curr.filter(x => x > 6));
          setMessage('Filtered out elements ≤ 6.');
        }}>
          Filter (x &gt; 6)
        </button>
      </div>
    </div>
  );
}

function ArrayReduceLab({ topic }: { topic: Topic }) {
  const values = [5, 10, 15, 20];
  const sum = values.reduce((a, b) => a + b, 0);
  const [message, setMessage] = useState(`Reduce: Accumulates array values into a single result. Total sum = ${sum}`);

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => {}} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">ACCUMULATE / REDUCE</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className="array-value active">{val}</div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArraySliceSpliceLab({ topic }: { topic: Topic }) {
  const [values, setValues] = useState([10, 20, 30, 40, 50]);
  const [message, setMessage] = useState('Slice extracts a portion without mutation; Splice mutates by removing/replacing.');

  return (
    <div className="visualizer-card">
      <VisualizerHeader topic={topic} message={message} onReset={() => setValues([10, 20, 30, 40, 50])} />

      <div className="visual-stage" style={{ minHeight: '300px', padding: '50px 20px 30px' }}>
        <div className="stage-label">SLICE & SPLICE OPERATIONS</div>
        <div className="array-visual" style={{ marginTop: '20px' }}>
          {values.map((val, i) => (
            <div className="array-slot" key={i}>
              <div className="array-value active">{val}</div>
              <span className="array-index">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="operation-bar">
        <button className="primary-button" onClick={() => {
          const copy = [...values];
          copy.splice(1, 2);
          setValues(copy);
          setMessage('Splice(1, 2): removed 2 items starting at index 1 (mutated).');
        }}>
          Splice(1, 2)
        </button>
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