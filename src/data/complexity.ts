import type { Topic } from './topics';

export type ComplexityProfile = {
  best: string;
  average: string;
  worst: string;
  space: string;
  operation?: string;
  note?: string;
};

const profiles: Record<string, ComplexityProfile> = {
  'Bubble Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', note: 'Best case assumes the early-exit optimization and an already sorted array.' },
  'Selection Sort': { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  'Insertion Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', note: 'Best case occurs when the input is already sorted.' },
  'Merge Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  'Quick Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n) average / O(n) worst', note: 'Worst case occurs with consistently poor pivots.' },
  'Heap Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
  'Counting Sort': { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)', space: 'O(n + k)', note: 'k is the size of the value range.' },
  'Radix Sort': { best: 'O(d(n + k))', average: 'O(d(n + k))', worst: 'O(d(n + k))', space: 'O(n + k)', note: 'd is the number of digit positions and k is the digit/base range.' },
  'Bucket Sort': { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)', space: 'O(n + k)', note: 'Average behavior assumes values are distributed reasonably across buckets.' },
  'Shell Sort': { best: 'O(n log n)', average: 'O(n(log n)²)', worst: 'O(n²)', space: 'O(1)', note: 'Bounds depend on the chosen gap sequence.' },
  'Cocktail Shaker Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', note: 'Best case assumes an early-exit optimization.' },
  'Linear Search': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'Binary Search': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', note: 'The input must be sorted.' },
  'Push & Pop': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Push: O(1) amortized; Pop: O(1).' },
  'Peek': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
  'Is Empty': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
  'Is Full': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', note: 'Meaningful for a bounded/fixed-capacity implementation.' },
  'Postfix': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  'Prefix': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  'Using Array': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Push/Pop/Peek are O(1) at the top.' },
  'Enqueue & Dequeue': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'With front/rear indices, Enqueue and Dequeue are O(1).' },
  'Peek Front': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
  'Single Ended Queue': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Enqueue/Dequeue: O(1) with a proper queue implementation.' },
  'Double Ended Queue': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Insert/remove at either end: O(1) with a deque.' },
  'Circular Queue': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Enqueue/Dequeue/Peek: O(1).' },
  'Priority Queue': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Peek: O(1); Insert/Extract: O(log n) with a binary heap.' },
  'Using Linked List': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Stack top operations are O(1); queue operations are O(1) with front/rear pointers.' },
  'Singly Linked List': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Head insert/delete: O(1); search/indexed access: O(n).' },
  'Doubly Linked List': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Insert/delete at a known node: O(1); search/access by position: O(n).' },
  'Circular Linked List': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Head/tail operations can be O(1) with maintained pointers.' },
  'Traversal': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', operation: 'Visits each reachable node once.' },
  'Insertion': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', operation: 'O(1) when the insertion position/node is already known; finding it can cost O(n).' },
  'Deletion': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', operation: 'O(1) when the node/previous pointer is already known; finding it can cost O(n).' },
  'Searching': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'Reverse': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'Merge': { best: 'O(n + m)', average: 'O(n + m)', worst: 'O(n + m)', space: 'O(1)', note: 'For an in-place linked-list merge; n and m are the two list lengths.' },
  'Comparison': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'BST Insertion': { best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(h)', note: 'The worst case occurs when the BST becomes skewed.' },
  'BST Deletion': { best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(h)' },
  'BST Searching': { best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(h)' },
  'Balancing (AVL)': { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(log n)', operation: 'Single/double rotations are O(1); insertion/deletion/search remain O(log n).' },
  'Pre-order': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
  'In-order': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
  'Post-order': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
  'Level-order (BFS)': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(w)' },
  'Breadth-First Search (BFS)': { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
  'Depth-First Search (DFS)': { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
  "Dijkstra's": { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)', space: 'O(V)', note: 'Using a binary heap and adjacency list; edge weights must be non-negative.' },
  'Bellman-Ford': { best: 'O(VE)', average: 'O(VE)', worst: 'O(VE)', space: 'O(V)', note: 'Can stop early on an iteration with no relaxations; it also detects reachable negative cycles.' },
  "Prim's": { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)', space: 'O(V)', note: 'Using a binary heap and adjacency list.' },
  "Kruskal's": { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)', space: 'O(V)', note: 'Sorting edges dominates the runtime.' },
  'Huffman Coding': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  'Traveling Salesman Problem': { best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)', space: 'O(n)', note: 'This is the brute-force exact search; dynamic programming improves time to O(n² 2ⁿ) with O(n 2ⁿ) space.' },
  '0/1 Knapsack': { best: 'O(nW)', average: 'O(nW)', worst: 'O(nW)', space: 'O(nW)', note: 'W is the capacity; this is pseudo-polynomial dynamic programming.' },
  'Memoization': { best: 'O(s)', average: 'O(s)', worst: 'O(s)', space: 'O(s)', note: 's is the number of distinct subproblems; exact bounds depend on the recurrence.' },
  'Tabulation': { best: 'O(s)', average: 'O(s)', worst: 'O(s)', space: 'O(s)', note: 's is the number of DP states; transition cost may add a factor.' },
  'Dynamic Programming': { best: 'Problem dependent', average: 'Problem dependent', worst: 'Problem dependent', space: 'Problem dependent', note: 'State count × transition cost determines the bound.' },
  'Greedy Algorithms': { best: 'Problem dependent', average: 'Problem dependent', worst: 'Problem dependent', space: 'Problem dependent', note: 'Complexity depends on the greedy problem and the data structure used.' },
  'Coin Change': { best: 'O(nA)', average: 'O(nA)', worst: 'O(nA)', space: 'O(A)', note: 'n is the number of coin types and A is the target amount.' },
  'Longest Common Subsequence': { best: 'O(nm)', average: 'O(nm)', worst: 'O(nm)', space: 'O(nm)' },
  'Longest Increasing Subsequence': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', note: 'This is the standard patience-sorting/binary-search approach.' },
  'Edit Distance': { best: 'O(nm)', average: 'O(nm)', worst: 'O(nm)', space: 'O(nm)' },
  "Kadane's Algorithm": { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'Activity Selection': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', note: 'Sorting by finish time dominates.' },
  'Interval Scheduling': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  'Generate Permutations': { best: 'O(n · n!)', average: 'O(n · n!)', worst: 'O(n · n!)', space: 'O(n)' },
  'N-Queens': { best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)', space: 'O(n)', note: 'Backtracking search; practical pruning can make it much faster than the upper bound.' },
  'KMP String Matching': { best: 'O(n + m)', average: 'O(n + m)', worst: 'O(n + m)', space: 'O(m)' },
  'Rabin-Karp': { best: 'O(n + m)', average: 'O(n + m)', worst: 'O(nm)', space: 'O(1)', note: 'Worst case occurs with many hash collisions.' },
  'Palindrome Check': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'Array Access': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
  'Array Update': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
  'Array Insert': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Appending can be O(1) amortized; inserting near the front shifts elements.' },
  'Array Delete': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', operation: 'Removing the last item is O(1); removing from the front/middle can shift elements.' },
  'Map': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Runs the callback once per element.' },
  'Filter': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  'Reduce': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1) auxiliary', operation: 'The accumulator callback runs once per element.' },
  'Slice & Splice': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', note: 'Exact costs depend on the slice length and how many elements must be shifted/copied.' },
  'Vector Capacity & Resize': { best: 'O(1)', average: 'O(1) amortized', worst: 'O(n)', space: 'O(n)', note: 'A resize copies existing elements, producing the occasional O(n) append.' },
  'Skip List': { best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(n)' },
  'Bloom Filter': { best: 'O(k)', average: 'O(k)', worst: 'O(k)', space: 'O(m)', note: 'False positives are possible; false negatives are not, assuming correct insertion.' },
  'Bitset': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n / word size)' },
  'Sparse Table': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n log n)', operation: 'Preprocessing: O(n log n); immutable range query: O(1) for idempotent operations.' },
  'Lazy Propagation': { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Range update/query is O(log n) on a segment tree with lazy propagation.' },
  'Structure & Properties': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Inspecting a node is O(1); full height/leaf/structure scans are O(n).' },
  'Types of Binary Trees': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', operation: 'Classification can be decided from height, node counts, and child patterns; a full scan may be O(n).' },
  'Red-Black Trees': { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Search/insert/delete: O(log n); rotations/recoloring per local repair: O(1).' },
  'B-Trees': { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', note: 'Height is logarithmic in the number of keys when node occupancy stays within the B-tree rules.' },
  'Trie (Prefix Tree)': { best: 'O(1)', average: 'O(L)', worst: 'O(L)', space: 'O(total characters)', operation: 'Insert/search/prefix lookup are O(L), where L is the key length.' },
  'Segment Trees': { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Point update and standard range query are O(log n); build is O(n).' },
  'Fenwick Trees': { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Point update and prefix sum are O(log n); construction can be O(n).' },
  'Lowest Common Ancestor': { best: 'O(h)', average: 'O(h)', worst: 'O(h)', space: 'O(h)', note: 'This profile assumes a straightforward parent/depth or recursive-tree solution; preprocessing can reduce repeated-query cost.' },
  'Tree Diameter': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
  'Tree Isomorphism': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
  'Serialize/Deserialize': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Serialization and reconstruction each visit every node once.' },
  'Decision Trees': { best: 'Problem dependent', average: 'Problem dependent', worst: 'Problem dependent', space: 'O(n)', note: 'Training cost depends on samples, features, candidate split evaluation, and tree depth.' },
  'Syntax Trees': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', note: 'Parsing and a single structural traversal are linear in the size of the syntax representation for a fixed grammar.' },
  'Array Data Structure': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Indexed access/update are O(1); insertion/deletion can be O(n) when elements must shift.' },
  'Dynamic Array / Vector': { best: 'O(1)', average: 'O(1) amortized', worst: 'O(n)', space: 'O(n)', operation: 'Indexed access is O(1); append is O(1) amortized and O(n) during resize.' },
  'Static Array': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Indexed access and update are O(1); capacity cannot grow without replacing the array.' },
  'Matrix / 2D Array': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(RC)', operation: 'Cell access/update is O(1); a full traversal is O(RC).' },
  'Array Operations': { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Access/update O(1); insertion/deletion may require O(n) shifts.' },
  'Two Pointers': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', note: 'The two pointers move monotonically, so the total number of pointer moves is linear.' },
  'Sliding Window': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1) to O(k)', note: 'With incremental add/remove updates, each element enters and leaves the window at most once.' },
  'Prefix Sum': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)', operation: 'Build: O(n); each static range-sum query: O(1).' },
  'Hash Tables': { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', operation: 'Insert/lookup/delete are O(1) average and can degrade to O(n) under severe collisions.' },
  'Hash Sets': { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', operation: 'Add/contains/delete are O(1) average.' },
  'Hash Maps': { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', operation: 'Set/get/delete are O(1) average.' },
  'Collision Handling': { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', note: 'The exact collision cost depends on chaining or the chosen probing strategy.' },
  'Open Addressing': { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', operation: 'Search/insert/delete are O(1) average when load factor is controlled.' },
  'Separate Chaining': { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', operation: 'Expected constant-time operations with a well-distributed hash function.' },
  'Lookup Tables': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'A prepared direct-key lookup is constant time; preprocessing is problem dependent.' },
  'Heap': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Peek: O(1); insert/extract: O(log n).' },
  'Min Heap': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Minimum peek: O(1); insert/extract-min: O(log n).' },
  'Max Heap': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Maximum peek: O(1); insert/extract-max: O(log n).' },
  'Heapify': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', note: 'Sift-down cost is proportional to the height of the affected subtree.' },
  'Build Heap': { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', note: 'Bottom-up build-heap is linear, even though one individual heapify can take O(log n).' },
  'Priority Queue with Heap': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', operation: 'Peek: O(1); insert/extract: O(log n).' },
  'Deque': { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)', operation: 'Insert/remove/peek at either end are O(1) with a suitable deque representation.' },
  'Union-Find / DSU': { best: 'O(1)', average: 'O(α(n)) amortized', worst: 'O(α(n)) amortized', space: 'O(n)', operation: 'With path compression and union by rank/size, find/union are effectively constant amortized time.' },
  'Path Compression': { best: 'O(1)', average: 'O(α(n)) amortized', worst: 'O(α(n)) amortized', space: 'O(n)' },
  'Union by Rank': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)', note: 'Rank alone keeps trees logarithmic; adding path compression gives inverse-Ackermann amortized bounds.' },
  'Cycle Detection — Undirected': { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
  'Cycle Detection — Directed': { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
  'Topological Sort — Kahn': { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
  'Floyd-Warshall': { best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)', space: 'O(V²)' },
  'A* Search': { best: 'Problem/heuristic dependent', average: 'Problem/heuristic dependent', worst: 'O(E) or worse depending on representation', space: 'O(V)', note: 'With an admissible consistent heuristic, A* is optimal; runtime depends strongly on heuristic quality.' },
  'Maximum Flow': { best: 'Problem dependent', average: 'Problem dependent', worst: 'Algorithm dependent', space: 'O(V + E)', note: 'Maximum-flow complexity is determined by the augmenting-flow algorithm and capacity model.' },
  'Ford-Fulkerson': { best: 'O(E)', average: 'Problem dependent', worst: 'O(E · |f*|)', space: 'O(V + E)', note: 'For integer capacities, the classical bound depends on the maximum flow value and augmenting-path choices.' },
  'Edmonds-Karp': { best: 'O(E)', average: 'O(VE²)', worst: 'O(VE²)', space: 'O(V + E)', note: 'The worst-case bound follows from BFS-selected augmenting paths.' },
  'Euclidean Algorithm': { best: 'O(1)', average: 'O(log min(a,b))', worst: 'O(log min(a,b))', space: 'O(1)', note: 'Best case occurs when the second operand divides the first immediately; the logarithmic bound is a standard worst-case bound.' },
};

export function getComplexity(topic: Topic): ComplexityProfile {
  if (topic.id === 'tree-bst-insertion') return profiles['BST Insertion'];
  if (topic.id === 'tree-bst-deletion') return profiles['BST Deletion'];
  if (topic.id === 'tree-bst-searching') return profiles['BST Searching'];
  if (topic.id === 'list-insertion') return profiles['Insertion'] ?? { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' };
  if (topic.id === 'tree-bst-insertion') return profiles['BST Insertion'];
  if (topic.id === 'tree-bst-deletion') return profiles['BST Deletion'];
  if (topic.title === "Dijkstra's Algorithm") return profiles["Dijkstra's"];
  if (topic.title === "Prim's Algorithm") return profiles["Prim's"];
  if (topic.title === "Kruskal's Algorithm") return profiles["Kruskal's"];
  const exact = profiles[topic.title];
  if (exact) return exact;

  if (topic.kind === 'concept') {
    return {
      best: 'Concept dependent',
      average: 'Concept dependent',
      worst: 'Concept dependent',
      space: 'Concept dependent',
      note: 'This lesson explains a concept rather than one fixed implementation.'
    };
  }

  return {
    best: topic.time,
    average: topic.time,
    worst: topic.time,
    space: topic.space,
  };
}
