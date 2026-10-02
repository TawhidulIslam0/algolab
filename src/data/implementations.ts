import { getExtendedImplementation } from './extendedImplementations';

export const languages = ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'] as const;
export type Language = typeof languages[number];

type CodeMap = Record<Language, string[]>;

const lines = (...value: string[]) => value;

const sortCode: Record<string, CodeMap> = {
  'Bubble Sort': {
    TypeScript: lines(
      'function bubbleSort(a: number[]): number[] {',
      '  for (let end = a.length - 1; end > 0; end--) {',
      '    for (let i = 0; i < end; i++) {',
      '      if (a[i] > a[i + 1]) {',
      '        [a[i], a[i + 1]] = [a[i + 1], a[i]];',
      '      }',
      '    }',
      '  }',
      '  return a;',
      '}',
    ),
    JavaScript: lines(
      'function bubbleSort(a) {',
      '  for (let end = a.length - 1; end > 0; end--) {',
      '    for (let i = 0; i < end; i++) {',
      '      if (a[i] > a[i + 1]) {',
      '        [a[i], a[i + 1]] = [a[i + 1], a[i]];',
      '      }',
      '    }',
      '  }',
      '  return a;',
      '}',
    ),
    Python: lines(
      'def bubble_sort(a):',
      '    for end in range(len(a) - 1, 0, -1):',
      '        for i in range(end):',
      '            if a[i] > a[i + 1]:',
      '                a[i], a[i + 1] = a[i + 1], a[i]',
      '    return a',
    ),
    Java: lines(
      'static int[] bubbleSort(int[] a) {',
      '    for (int end = a.length - 1; end > 0; end--) {',
      '        for (int i = 0; i < end; i++) {',
      '            if (a[i] > a[i + 1]) {',
      '                int temp = a[i];',
      '                a[i] = a[i + 1];',
      '                a[i + 1] = temp;',
      '            }',
      '        }',
      '    }',
      '    return a;',
      '}',
    ),
    'C++': lines(
      'vector<int> bubbleSort(vector<int> a) {',
      '    for (int end = a.size() - 1; end > 0; --end) {',
      '        for (int i = 0; i < end; ++i) {',
      '            if (a[i] > a[i + 1])',
      '                swap(a[i], a[i + 1]);',
      '        }',
      '    }',
      '    return a;',
      '}',
    ),
  },
  'Selection Sort': {
    TypeScript: lines('function selectionSort(a: number[]): number[] {', '  for (let i = 0; i < a.length - 1; i++) {', '    let min = i;', '    for (let j = i + 1; j < a.length; j++) {', '      if (a[j] < a[min]) min = j;', '    }', '    [a[i], a[min]] = [a[min], a[i]];', '  }', '  return a;', '}'),
    JavaScript: lines('function selectionSort(a) {', '  for (let i = 0; i < a.length - 1; i++) {', '    let min = i;', '    for (let j = i + 1; j < a.length; j++) {', '      if (a[j] < a[min]) min = j;', '    }', '    [a[i], a[min]] = [a[min], a[i]];', '  }', '  return a;', '}'),
    Python: lines('def selection_sort(a):', '    for i in range(len(a) - 1):', '        min_index = i', '        for j in range(i + 1, len(a)):', '            if a[j] < a[min_index]:', '                min_index = j', '        a[i], a[min_index] = a[min_index], a[i]', '    return a'),
    Java: lines('static int[] selectionSort(int[] a) {', '    for (int i = 0; i < a.length - 1; i++) {', '        int min = i;', '        for (int j = i + 1; j < a.length; j++)', '            if (a[j] < a[min]) min = j;', '        int temp = a[i]; a[i] = a[min]; a[min] = temp;', '    }', '    return a;', '}'),
    'C++': lines('vector<int> selectionSort(vector<int> a) {', '    for (int i = 0; i < (int)a.size() - 1; ++i) {', '        int min = i;', '        for (int j = i + 1; j < (int)a.size(); ++j)', '            if (a[j] < a[min]) min = j;', '        swap(a[i], a[min]);', '    }', '    return a;', '}'),
  },
  'Insertion Sort': {
    TypeScript: lines('function insertionSort(a: number[]): number[] {', '  for (let i = 1; i < a.length; i++) {', '    const key = a[i];', '    let j = i - 1;', '    while (j >= 0 && a[j] > key) {', '      a[j + 1] = a[j];', '      j--;', '    }', '    a[j + 1] = key;', '  }', '  return a;', '}'),
    JavaScript: lines('function insertionSort(a) {', '  for (let i = 1; i < a.length; i++) {', '    const key = a[i];', '    let j = i - 1;', '    while (j >= 0 && a[j] > key) {', '      a[j + 1] = a[j];', '      j--;', '    }', '    a[j + 1] = key;', '  }', '  return a;', '}'),
    Python: lines('def insertion_sort(a):', '    for i in range(1, len(a)):', '        key = a[i]', '        j = i - 1', '        while j >= 0 and a[j] > key:', '            a[j + 1] = a[j]', '            j -= 1', '        a[j + 1] = key', '    return a'),
    Java: lines('static int[] insertionSort(int[] a) {', '    for (int i = 1; i < a.length; i++) {', '        int key = a[i];', '        int j = i - 1;', '        while (j >= 0 && a[j] > key) {', '            a[j + 1] = a[j];', '            j--;', '        }', '        a[j + 1] = key;', '    }', '    return a;', '}'),
    'C++': lines('vector<int> insertionSort(vector<int> a) {', '    for (int i = 1; i < (int)a.size(); ++i) {', '        int key = a[i], j = i - 1;', '        while (j >= 0 && a[j] > key) {', '            a[j + 1] = a[j];', '            --j;', '        }', '        a[j + 1] = key;', '    }', '    return a;', '}'),
  },
  'Merge Sort': {
    TypeScript: lines('function mergeSort(a: number[]): number[] {', '  if (a.length <= 1) return a;', '  const mid = Math.floor(a.length / 2);', '  const left = mergeSort(a.slice(0, mid));', '  const right = mergeSort(a.slice(mid));', '  const result: number[] = [];', '  let i = 0, j = 0;', '  while (i < left.length && j < right.length)', '    result.push(left[i] <= right[j] ? left[i++] : right[j++]);', '  return result.concat(left.slice(i), right.slice(j));', '}'),
    JavaScript: lines('function mergeSort(a) {', '  if (a.length <= 1) return a;', '  const mid = Math.floor(a.length / 2);', '  const left = mergeSort(a.slice(0, mid));', '  const right = mergeSort(a.slice(mid));', '  const result = [];', '  let i = 0, j = 0;', '  while (i < left.length && j < right.length)', '    result.push(left[i] <= right[j] ? left[i++] : right[j++]);', '  return result.concat(left.slice(i), right.slice(j));', '}'),
    Python: lines('def merge_sort(a):', '    if len(a) <= 1:', '        return a', '    mid = len(a) // 2', '    left = merge_sort(a[:mid])', '    right = merge_sort(a[mid:])', '    result = []', '    while left and right:', '        result.append(left.pop(0) if left[0] <= right[0] else right.pop(0))', '    return result + left + right'),
    Java: lines('static int[] mergeSort(int[] a) {', '    if (a.length <= 1) return a;', '    int mid = a.length / 2;', '    int[] left = mergeSort(Arrays.copyOfRange(a, 0, mid));', '    int[] right = mergeSort(Arrays.copyOfRange(a, mid, a.length));', '    return merge(left, right);', '}', '', 'static int[] merge(int[] a, int[] b) {', '    int[] out = new int[a.length + b.length];', '    int i = 0, j = 0, k = 0;', '    while (i < a.length && j < b.length) out[k++] = a[i] <= b[j] ? a[i++] : b[j++];', '    while (i < a.length) out[k++] = a[i++];', '    while (j < b.length) out[k++] = b[j++];', '    return out;', '}'),
    'C++': lines('vector<int> mergeSort(vector<int> a) {', '    if (a.size() <= 1) return a;', '    int mid = a.size() / 2;', '    vector<int> left(a.begin(), a.begin() + mid);', '    vector<int> right(a.begin() + mid, a.end());', '    left = mergeSort(left);', '    right = mergeSort(right);', '    vector<int> out;', '    merge(left.begin(), left.end(), right.begin(), right.end(), back_inserter(out));', '    return out;', '}'),
  },
  'Quick Sort': {
    TypeScript: lines('function quickSort(a: number[], lo = 0, hi = a.length - 1): number[] {', '  if (lo >= hi) return a;', '  const pivot = a[hi];', '  let p = lo;', '  for (let i = lo; i < hi; i++) {', '    if (a[i] < pivot) [a[p++], a[i]] = [a[i], a[p]];', '  }', '  [a[p], a[hi]] = [a[hi], a[p]];', '  quickSort(a, lo, p - 1);', '  quickSort(a, p + 1, hi);', '  return a;', '}'),
    JavaScript: lines('function quickSort(a, lo = 0, hi = a.length - 1) {', '  if (lo >= hi) return a;', '  const pivot = a[hi];', '  let p = lo;', '  for (let i = lo; i < hi; i++) {', '    if (a[i] < pivot) [a[p++], a[i]] = [a[i], a[p]];', '  }', '  [a[p], a[hi]] = [a[hi], a[p]];', '  quickSort(a, lo, p - 1);', '  quickSort(a, p + 1, hi);', '  return a;', '}'),
    Python: lines('def quick_sort(a, lo=0, hi=None):', '    if hi is None: hi = len(a) - 1', '    if lo >= hi: return a', '    pivot = a[hi]', '    p = lo', '    for i in range(lo, hi):', '        if a[i] < pivot:', '            a[p], a[i] = a[i], a[p]', '            p += 1', '    a[p], a[hi] = a[hi], a[p]', '    quick_sort(a, lo, p - 1)', '    quick_sort(a, p + 1, hi)', '    return a'),
    Java: lines('static void quickSort(int[] a, int lo, int hi) {', '    if (lo >= hi) return;', '    int pivot = a[hi], p = lo;', '    for (int i = lo; i < hi; i++) {', '        if (a[i] < pivot) { int t = a[p]; a[p++] = a[i]; a[i] = t; }', '    }', '    int t = a[p]; a[p] = a[hi]; a[hi] = t;', '    quickSort(a, lo, p - 1);', '    quickSort(a, p + 1, hi);', '}'),
    'C++': lines('void quickSort(vector<int>& a, int lo, int hi) {', '    if (lo >= hi) return;', '    int pivot = a[hi], p = lo;', '    for (int i = lo; i < hi; ++i)', '        if (a[i] < pivot) swap(a[p++], a[i]);', '    swap(a[p], a[hi]);', '    quickSort(a, lo, p - 1);', '    quickSort(a, p + 1, hi);', '}'),
  },
  'Heap Sort': {
    TypeScript: lines('function heapSort(a: number[]): number[] {', '  const heapify = (n: number, i: number) => {', '    let largest = i;', '    const left = 2 * i + 1, right = left + 1;', '    if (left < n && a[left] > a[largest]) largest = left;', '    if (right < n && a[right] > a[largest]) largest = right;', '    if (largest !== i) {', '      [a[i], a[largest]] = [a[largest], a[i]];', '      heapify(n, largest);', '    }', '  };', '  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) heapify(a.length, i);', '  for (let end = a.length - 1; end > 0; end--) {', '    [a[0], a[end]] = [a[end], a[0]];', '    heapify(end, 0);', '  }', '  return a;', '}'),
    JavaScript: lines('function heapSort(a) {', '  const heapify = (n, i) => {', '    let largest = i;', '    const left = 2 * i + 1, right = left + 1;', '    if (left < n && a[left] > a[largest]) largest = left;', '    if (right < n && a[right] > a[largest]) largest = right;', '    if (largest !== i) {', '      [a[i], a[largest]] = [a[largest], a[i]];', '      heapify(n, largest);', '    }', '  };', '  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) heapify(a.length, i);', '  for (let end = a.length - 1; end > 0; end--) {', '    [a[0], a[end]] = [a[end], a[0]];', '    heapify(end, 0);', '  }', '  return a;', '}'),
    Python: lines('def heap_sort(a):', '    def heapify(n, i):', '        largest = i', '        left, right = 2 * i + 1, 2 * i + 2', '        if left < n and a[left] > a[largest]: largest = left', '        if right < n and a[right] > a[largest]: largest = right', '        if largest != i:', '            a[i], a[largest] = a[largest], a[i]', '            heapify(n, largest)', '    for i in range(len(a) // 2 - 1, -1, -1): heapify(len(a), i)', '    for end in range(len(a) - 1, 0, -1):', '        a[0], a[end] = a[end], a[0]', '        heapify(end, 0)', '    return a'),
    Java: lines('static int[] heapSort(int[] a) {', '    for (int i = a.length / 2 - 1; i >= 0; i--) heapify(a, a.length, i);', '    for (int end = a.length - 1; end > 0; end--) {', '        int t = a[0]; a[0] = a[end]; a[end] = t;', '        heapify(a, end, 0);', '    }', '    return a;', '}', '', 'static void heapify(int[] a, int n, int i) {', '    int largest = i, l = 2 * i + 1, r = l + 1;', '    if (l < n && a[l] > a[largest]) largest = l;', '    if (r < n && a[r] > a[largest]) largest = r;', '    if (largest != i) { int t = a[i]; a[i] = a[largest]; a[largest] = t; heapify(a, n, largest); }', '}'),
    'C++': lines('vector<int> heapSort(vector<int> a) {', '    make_heap(a.begin(), a.end());', '    sort_heap(a.begin(), a.end());', '    return a;', '}'),
  },
};

const searchCode: Record<string, CodeMap> = {
  'Linear Search': {
    TypeScript: lines('function linearSearch(a: number[], target: number): number {', '  for (let i = 0; i < a.length; i++) {', '    if (a[i] === target) return i;', '  }', '  return -1;', '}'),
    JavaScript: lines('function linearSearch(a, target) {', '  for (let i = 0; i < a.length; i++) {', '    if (a[i] === target) return i;', '  }', '  return -1;', '}'),
    Python: lines('def linear_search(a, target):', '    for i, value in enumerate(a):', '        if value == target:', '            return i', '    return -1'),
    Java: lines('static int linearSearch(int[] a, int target) {', '    for (int i = 0; i < a.length; i++)', '        if (a[i] == target) return i;', '    return -1;', '}'),
    'C++': lines('int linearSearch(const vector<int>& a, int target) {', '    for (int i = 0; i < (int)a.size(); ++i)', '        if (a[i] == target) return i;', '    return -1;', '}'),
  },
  'Binary Search': {
    TypeScript: lines('function binarySearch(a: number[], target: number): number {', '  let low = 0, high = a.length - 1;', '  while (low <= high) {', '    const mid = Math.floor((low + high) / 2);', '    if (a[mid] === target) return mid;', '    if (a[mid] < target) low = mid + 1;', '    else high = mid - 1;', '  }', '  return -1;', '}'),
    JavaScript: lines('function binarySearch(a, target) {', '  let low = 0, high = a.length - 1;', '  while (low <= high) {', '    const mid = Math.floor((low + high) / 2);', '    if (a[mid] === target) return mid;', '    if (a[mid] < target) low = mid + 1;', '    else high = mid - 1;', '  }', '  return -1;', '}'),
    Python: lines('def binary_search(a, target):', '    low, high = 0, len(a) - 1', '    while low <= high:', '        mid = (low + high) // 2', '        if a[mid] == target: return mid', '        if a[mid] < target: low = mid + 1', '        else: high = mid - 1', '    return -1'),
    Java: lines('static int binarySearch(int[] a, int target) {', '    int low = 0, high = a.length - 1;', '    while (low <= high) {', '        int mid = low + (high - low) / 2;', '        if (a[mid] == target) return mid;', '        if (a[mid] < target) low = mid + 1;', '        else high = mid - 1;', '    }', '    return -1;', '}'),
    'C++': lines('int binarySearch(const vector<int>& a, int target) {', '    int low = 0, high = (int)a.size() - 1;', '    while (low <= high) {', '        int mid = low + (high - low) / 2;', '        if (a[mid] == target) return mid;', '        if (a[mid] < target) low = mid + 1;', '        else high = mid - 1;', '    }', '    return -1;', '}'),
  },
};

const structures: Record<string, CodeMap> = {
  'Push & Pop': {
    TypeScript: lines('class Stack {', '  private items: number[] = [];', '', '  push(value: number) {', '    this.items.push(value);', '  }', '', '  pop(): number | undefined {', '    return this.items.pop();', '  }', '}'),
    JavaScript: lines('class Stack {', '  constructor() { this.items = []; }', '', '  push(value) {', '    this.items.push(value);', '  }', '', '  pop() {', '    return this.items.pop();', '  }', '}'),
    Python: lines('class Stack:', '    def __init__(self):', '        self.items = []', '', '    def push(self, value):', '        self.items.append(value)', '', '    def pop(self):', '        return self.items.pop() if self.items else None'),
    Java: lines('class Stack {', '    private final ArrayList<Integer> items = new ArrayList<>();', '', '    void push(int value) { items.add(value); }', '    Integer pop() {', '        return items.isEmpty() ? null : items.remove(items.size() - 1);', '    }', '}'),
    'C++': lines('class Stack {', '    vector<int> items;', 'public:', '    void push(int value) { items.push_back(value); }', '    int pop() {', '        int value = items.back();', '        items.pop_back();', '        return value;', '    }', '};'),
  },
  'Peek': {
    TypeScript: lines('function peek(stack: number[]): number | undefined {', '  return stack[stack.length - 1];', '}'),
    JavaScript: lines('function peek(stack) {', '  return stack[stack.length - 1];', '}'),
    Python: lines('def peek(stack):', '    return stack[-1] if stack else None'),
    Java: lines('static Integer peek(ArrayList<Integer> stack) {', '    return stack.isEmpty() ? null : stack.get(stack.size() - 1);', '}'),
    'C++': lines('int peek(const vector<int>& stack) {', '    return stack.back();', '}'),
  },
  'Enqueue & Dequeue': {
    TypeScript: lines('class Queue {', '  private items: number[] = [];', '', '  enqueue(value: number) {', '    this.items.push(value);', '  }', '', '  dequeue(): number | undefined {', '    return this.items.shift();', '  }', '}'),
    JavaScript: lines('class Queue {', '  constructor() { this.items = []; }', '  enqueue(value) { this.items.push(value); }', '  dequeue() { return this.items.shift(); }', '}'),
    Python: lines('from collections import deque', '', 'q = deque()', 'q.append(value)       # enqueue', 'value = q.popleft()    # dequeue'),
    Java: lines('Queue<Integer> queue = new ArrayDeque<>();', 'queue.add(value);', 'int first = queue.remove();'),
    'C++': lines('queue<int> q;', 'q.push(value);', 'int first = q.front();', 'q.pop();'),
  },
  'Traversal': {
    TypeScript: lines('function traverse(head: Node | null): number[] {', '  const result: number[] = [];', '  let current = head;', '  while (current) {', '    result.push(current.value);', '    current = current.next;', '  }', '  return result;', '}'),
    JavaScript: lines('function traverse(head) {', '  const result = [];', '  let current = head;', '  while (current) {', '    result.push(current.value);', '    current = current.next;', '  }', '  return result;', '}'),
    Python: lines('def traverse(head):', '    result = []', '    current = head', '    while current:', '        result.append(current.value)', '        current = current.next', '    return result'),
    Java: lines('static List<Integer> traverse(Node head) {', '    List<Integer> result = new ArrayList<>();', '    for (Node cur = head; cur != null; cur = cur.next)', '        result.add(cur.value);', '    return result;', '}'),
    'C++': lines('vector<int> traverse(Node* head) {', '    vector<int> result;', '    for (Node* cur = head; cur; cur = cur->next)', '        result.push_back(cur->value);', '    return result;', '}'),
  },
  'Searching': {
    TypeScript: lines('function search(head: Node | null, target: number): Node | null {', '  for (let cur = head; cur; cur = cur.next)', '    if (cur.value === target) return cur;', '  return null;', '}'),
    JavaScript: lines('function search(head, target) {', '  for (let cur = head; cur; cur = cur.next)', '    if (cur.value === target) return cur;', '  return null;', '}'),
    Python: lines('def search(head, target):', '    cur = head', '    while cur:', '        if cur.value == target: return cur', '        cur = cur.next', '    return None'),
    Java: lines('static Node search(Node head, int target) {', '    for (Node cur = head; cur != null; cur = cur.next)', '        if (cur.value == target) return cur;', '    return null;', '}'),
    'C++': lines('Node* search(Node* head, int target) {', '    for (Node* cur = head; cur; cur = cur->next)', '        if (cur->value == target) return cur;', '    return nullptr;', '}'),
  },
};

export function getImplementation(topic: { title: string; id: string }): CodeMap | null {
  if (sortCode[topic.title]) return sortCode[topic.title];
  if (searchCode[topic.title]) return searchCode[topic.title];
  if (structures[topic.title]) return structures[topic.title];
  const extended = getExtendedImplementation(topic.title);
  if (extended) return extended;

  if (topic.title === 'Push & Pop') return structures['Push & Pop'];
  if (topic.title === 'Enqueue & Dequeue') return structures['Enqueue & Dequeue'];

  if (topic.title.includes('Postfix')) {
    return {
      TypeScript: lines('function evaluatePostfix(tokens: string[]): number {', '  const stack: number[] = [];', '  for (const token of tokens) {', '    if (!Number.isNaN(Number(token))) stack.push(Number(token));', '    else {', '      const b = stack.pop()!;', '      const a = stack.pop()!;', '      stack.push(apply(token, a, b));', '    }', '  }', '  return stack[0];', '}'),
      JavaScript: lines('function evaluatePostfix(tokens) {', '  const stack = [];', '  for (const token of tokens) {', '    if (!Number.isNaN(Number(token))) stack.push(Number(token));', '    else { const b = stack.pop(), a = stack.pop(); stack.push(apply(token, a, b)); }', '  }', '  return stack[0];', '}'),
      Python: lines('def evaluate_postfix(tokens):', '    stack = []', '    for token in tokens:', '        if token.isdigit(): stack.append(int(token))', '        else:', '            b, a = stack.pop(), stack.pop()', '            stack.append(apply(token, a, b))', '    return stack[0]'),
      Java: lines('static int evaluatePostfix(String[] tokens) {', '    Deque<Integer> stack = new ArrayDeque<>();', '    for (String token : tokens) {', '        if (token.matches("\\d+")) stack.push(Integer.parseInt(token));', '        else { int b = stack.pop(), a = stack.pop(); stack.push(apply(token, a, b)); }', '    }', '    return stack.peek();', '}'),
      'C++': lines('int evaluatePostfix(const vector<string>& tokens) {', '    stack<int> s;', '    for (const string& token : tokens) {', '        if (isdigit(token[0])) s.push(stoi(token));', '        else { int b = s.top(); s.pop(); int a = s.top(); s.pop(); s.push(apply(token, a, b)); }', '    }', '    return s.top();', '}'),
    };
  }

  if (topic.title === 'Breadth-First Search (BFS)' || topic.id === 'bfs') {
    return {
      TypeScript: lines('function bfs(graph: number[][], start: number): number[] {', '  const queue = [start];', '  const seen = new Set([start]);', '  const order: number[] = [];', '  while (queue.length) {', '    const node = queue.shift()!;', '    order.push(node);', '    for (const next of graph[node]) {', '      if (!seen.has(next)) { seen.add(next); queue.push(next); }', '    }', '  }', '  return order;', '}'),
      JavaScript: lines('function bfs(graph, start) {', '  const queue = [start], seen = new Set([start]), order = [];', '  while (queue.length) {', '    const node = queue.shift();', '    order.push(node);', '    for (const next of graph[node]) {', '      if (!seen.has(next)) { seen.add(next); queue.push(next); }', '    }', '  }', '  return order;', '}'),
      Python: lines('from collections import deque', '', 'def bfs(graph, start):', '    queue, seen, order = deque([start]), {start}, []', '    while queue:', '        node = queue.popleft()', '        order.append(node)', '        for nxt in graph[node]:', '            if nxt not in seen:', '                seen.add(nxt); queue.append(nxt)', '    return order'),
      Java: lines('static List<Integer> bfs(List<List<Integer>> graph, int start) {', '    Queue<Integer> queue = new ArrayDeque<>();', '    boolean[] seen = new boolean[graph.size()];', '    List<Integer> order = new ArrayList<>();', '    queue.add(start); seen[start] = true;', '    while (!queue.isEmpty()) {', '        int node = queue.remove(); order.add(node);', '        for (int next : graph.get(node))', '            if (!seen[next]) { seen[next] = true; queue.add(next); }', '    }', '    return order;', '}'),
      'C++': lines('vector<int> bfs(const vector<vector<int>>& graph, int start) {', '    queue<int> q; vector<bool> seen(graph.size()); vector<int> order;', '    q.push(start); seen[start] = true;', '    while (!q.empty()) {', '        int node = q.front(); q.pop(); order.push_back(node);', '        for (int next : graph[node])', '            if (!seen[next]) { seen[next] = true; q.push(next); }', '    }', '    return order;', '}'),
    };
  }

  if (topic.title === 'Depth-First Search (DFS)' || topic.id === 'dfs') {
    return {
      TypeScript: lines('function dfs(graph: number[][], start: number): number[] {', '  const seen = new Set<number>();', '  const order: number[] = [];', '  const visit = (node: number) => {', '    seen.add(node); order.push(node);', '    for (const next of graph[node])', '      if (!seen.has(next)) visit(next);', '  };', '  visit(start);', '  return order;', '}'),
      JavaScript: lines('function dfs(graph, start) {', '  const seen = new Set(), order = [];', '  function visit(node) {', '    seen.add(node); order.push(node);', '    for (const next of graph[node]) if (!seen.has(next)) visit(next);', '  }', '  visit(start);', '  return order;', '}'),
      Python: lines('def dfs(graph, start):', '    seen, order = set(), []', '    def visit(node):', '        seen.add(node); order.append(node)', '        for nxt in graph[node]:', '            if nxt not in seen: visit(nxt)', '    visit(start)', '    return order'),
      Java: lines('static void dfs(List<List<Integer>> graph, int node, boolean[] seen, List<Integer> order) {', '    seen[node] = true;', '    order.add(node);', '    for (int next : graph.get(node))', '        if (!seen[next]) dfs(graph, next, seen, order);', '}'),
      'C++': lines('void dfs(const vector<vector<int>>& graph, int node, vector<bool>& seen, vector<int>& order) {', '    seen[node] = true;', '    order.push_back(node);', '    for (int next : graph[node])', '        if (!seen[next]) dfs(graph, next, seen, order);', '}'),
    };
  }

  return null;
}
