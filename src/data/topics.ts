export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type TopicKind =
  | 'sort'
  | 'search'
  | 'stack'
  | 'queue'
  | 'list'
  | 'tree'
  | 'graph'
  | 'notation'
  | 'concept';

export type Topic = {
  id: string;
  title: string;
  category: string;
  section: string;
  description: string;
  explanation: string;
  steps: string[];
  difficulty: Difficulty;
  time: string;
  space: string;
  tags: string[];
  kind: TopicKind;
  code: string[];
};

import { getLearningSteps } from './steps';

const code = (...lines: string[]) => lines;

const makeTopic = (
  id: string,
  title: string,
  category: string,
  section: string,
  description: string,
  kind: TopicKind,
  options: Partial<Topic> = {},
): Topic => ({
  id,
  title,
  category,
  section,
  description,
  explanation:
    options.explanation ??
    `${description} Use the controls above to change the state, step through the operation, and connect each visual change to the implementation.`,
  steps: options.steps ?? getLearningSteps({ id, title, category, section, description, kind } as Topic),
  difficulty: options.difficulty ?? 'Beginner',
  time: options.time ?? 'O(n)',
  space: options.space ?? 'O(n)',
  tags: options.tags ?? [category.toLowerCase(), section.toLowerCase()],
  kind,
  code: options.code ?? [],
});

export const topics: Topic[] = [
  makeTopic('linear-search', 'Linear Search', 'Array', 'Searching', 'Scan the array from left to right until the target is found.', 'search', {
    time: 'O(n)', space: 'O(1)',
    code: code(
      'function linearSearch(a: number[], target: number) {',
      '  for (let i = 0; i < a.length; i++) {',
      '    if (a[i] === target) return i;',
      '  }',
      '  return -1;',
      '}',
    ),
  }),
  makeTopic('binary-search', 'Binary Search', 'Array', 'Searching', 'Search a sorted array by repeatedly discarding half of the remaining range.', 'search', {
    time: 'O(log n)', space: 'O(1)', difficulty: 'Beginner',
    steps: ['Start with low and high bounds.', 'Inspect the middle element.', 'Discard the half that cannot contain the target.', 'Repeat until found or the range is empty.'],
    code: code(
      'function binarySearch(a: number[], target: number) {',
      '  let low = 0;',
      '  let high = a.length - 1;',
      '  while (low <= high) {',
      '    const mid = Math.floor((low + high) / 2);',
      '    if (a[mid] === target) return mid;',
      '    if (a[mid] < target) low = mid + 1;',
      '    else high = mid - 1;',
      '  }',
      '  return -1;',
      '}',
    ),
  }),
  ...[
    ['bubble-sort', 'Bubble Sort', 'Repeatedly compare adjacent values and swap them when they are out of order.', 'Beginner', 'O(n²)', 'O(1)'],
    ['selection-sort', 'Selection Sort', 'Find the smallest remaining value and place it at the next sorted position.', 'Beginner', 'O(n²)', 'O(1)'],
    ['insertion-sort', 'Insertion Sort', 'Grow a sorted prefix by inserting each new value into its correct position.', 'Beginner', 'O(n²)', 'O(1)'],
    ['merge-sort', 'Merge Sort', 'Split the array, sort each half, and merge the ordered halves.', 'Intermediate', 'O(n log n)', 'O(n)'],
    ['quick-sort', 'Quick Sort', 'Partition around a pivot and recursively solve the two sides.', 'Intermediate', 'O(n log n) avg', 'O(log n) avg'],
  ].map(([id, title, desc, difficulty, time, space]) => makeTopic(id, title, 'Array', 'Sorting', desc, 'sort', {
    difficulty: difficulty as Difficulty,
    time,
    space,
    tags: ['sorting', 'array', 'comparison'],
  })),
  makeTopic('heap-sort', 'Heap Sort', 'Array', 'Sorting', 'Build a max heap and repeatedly move the maximum element to the end.', 'sort', {
    difficulty: 'Intermediate', time: 'O(n log n)', space: 'O(1)', tags: ['sorting', 'heap', 'in-place'],
  }),

  ...[
    ['stack-push-pop', 'Push & Pop', 'Operations', 'Add to and remove from the top of a LIFO stack.'],
    ['stack-peek', 'Peek', 'Operations', 'Read the top value without removing it.'],
    ['stack-empty', 'Is Empty', 'Operations', 'Check whether a stack contains no elements.'],
    ['stack-full', 'Is Full', 'Operations', 'Check whether a bounded stack has reached capacity.'],
    ['postfix', 'Postfix', 'Polish Notations Evaluation', 'Evaluate an expression by applying operators to operands on a stack.'],
    ['prefix', 'Prefix', 'Polish Notations Evaluation', 'Evaluate a prefix expression while maintaining an operand stack.'],
    ['stack-array', 'Using Array', 'Implementation', 'Implement LIFO operations with a contiguous array.'],
    ['stack-linked-list', 'Using Linked List', 'Implementation', 'Implement LIFO operations by linking nodes through a top pointer.'],
  ].map(([id, title, section, desc]) => makeTopic(id, title, 'Stack', section, desc, id === 'postfix' || id === 'prefix' ? 'notation' : 'stack', {
    time: 'O(1) per operation', space: 'O(n)', tags: ['stack', 'LIFO'],
  })),

  ...[
    ['queue-enqueue-dequeue', 'Enqueue & Dequeue', 'Operations', 'Add an item at the rear and remove an item from the front.'],
    ['queue-peek', 'Peek Front', 'Operations', 'Read the front item without removing it.'],
    ['queue-empty', 'Is Empty', 'Operations', 'Check whether the queue contains no elements.'],
    ['queue-full', 'Is Full', 'Operations', 'Check whether a bounded queue has reached capacity.'],
    ['single-ended-queue', 'Single Ended Queue', 'Types', 'A FIFO queue where insertion happens at the rear and removal at the front.'],
    ['double-ended-queue', 'Double Ended Queue', 'Types', 'A deque supports insertion and removal from both ends.'],
    ['circular-queue', 'Circular Queue', 'Types', 'Reuse array positions by wrapping the front and rear indices around.'],
    ['priority-queue', 'Priority Queue', 'Types', 'Remove the highest-priority item rather than simply the oldest item.'],
    ['queue-array', 'Using Array', 'Implementation', 'Implement a queue with array-backed storage and front/rear indices.'],
    ['queue-linked-list', 'Using Linked List', 'Implementation', 'Implement a queue with front and rear node pointers.'],
  ].map(([id, title, section, desc]) => makeTopic(id, title, 'Queue', section, desc, 'queue', {
    difficulty: id === 'priority-queue' ? 'Intermediate' : 'Beginner',
    time: 'O(1) typical', space: 'O(n)', tags: ['queue', 'FIFO'],
  })),

  ...[
    ['singly-linked-list', 'Singly Linked List', 'Types', 'A chain of nodes where each node stores a value and one next pointer.'],
    ['doubly-linked-list', 'Doubly Linked List', 'Types', 'A linked list whose nodes store both next and previous pointers.'],
    ['circular-linked-list', 'Circular Linked List', 'Types', 'The final node points back to the head instead of ending at null.'],
    ['list-traversal', 'Traversal', 'Operations', 'Follow next pointers from the head until the stopping condition.'],
    ['list-insertion', 'Insertion', 'Operations', 'Create a node and reconnect links so it becomes part of the chain.'],
    ['list-deletion', 'Deletion', 'Operations', 'Bypass a node by changing the surrounding pointer.'],
    ['list-searching', 'Searching', 'Operations', 'Walk node by node until the target value is found.'],
    ['list-reverse', 'Reverse', 'Operations', 'Reverse every next link so the list runs in the opposite direction.'],
    ['list-merge', 'Merge', 'Operations', 'Combine two sorted lists by repeatedly choosing the smaller current node.'],
    ['list-comparison', 'Comparison', 'Operations', 'Compare two lists node by node for equal values and length.'],
  ].map(([id, title, section, desc]) => makeTopic(id, title, 'Linked List', section, desc, 'list', {
    difficulty: ['list-reverse', 'list-merge'].includes(id) ? 'Intermediate' : 'Beginner',
    time: id === 'list-insertion' || id === 'list-deletion' ? 'O(1) at known node' : 'O(n)',
    space: 'O(n)', tags: ['linked list', 'pointers', 'nodes'],
  })),

  makeTopic('binary-tree-structure', 'Structure & Properties', 'Tree', 'Binary Tree', 'Explore roots, children, leaves, height, depth, and the two-child limit.', 'tree', { time: 'O(n)', space: 'O(n)', tags: ['tree', 'binary tree'] }),
  makeTopic('binary-tree-types', 'Types of Binary Trees', 'Tree', 'Binary Tree', 'Compare full, complete, perfect, balanced, and skewed binary trees.', 'tree', { tags: ['tree', 'shape', 'properties'] }),
  ...[
    ['bst-insertion', 'Insertion', 'Insertion', 'Insert a value by following the BST ordering rule.'],
    ['bst-deletion', 'Deletion', 'Deletion', 'Delete a node and reconnect zero, one, or two children.'],
    ['bst-searching', 'Searching', 'Searching', 'Use ordering to eliminate an entire subtree at every decision.'],
    ['avl-balancing', 'Balancing (AVL)', 'Balancing', 'Rotate an unbalanced BST when a node becomes too heavy on one side.'],
  ].map(([id, title, section, desc]) => makeTopic(`tree-${id}`, title, 'Tree', 'Binary Search Tree', desc, 'tree', {
    difficulty: id === 'avl-balancing' ? 'Advanced' : 'Intermediate', tags: ['BST', 'tree', section.toLowerCase()],
  })),
  ...[
    ['preorder', 'Pre-order', 'Traversal', 'Visit the node before its left and right subtrees.'],
    ['inorder', 'In-order', 'Traversal', 'Visit the left subtree, node, then right subtree; on a BST this yields sorted order.'],
    ['postorder', 'Post-order', 'Traversal', 'Visit both children before visiting the node.'],
    ['levelorder', 'Level-order (BFS)', 'Traversal', 'Visit nodes level by level using a queue.'],
    ['morris', 'Morris Traversal', 'Traversal', 'Traverse a binary tree with temporary links and O(1) auxiliary space.'],
  ].map(([id, title, section, desc]) => makeTopic(`tree-${id}`, title, 'Tree', section, desc, 'tree', {
    difficulty: id === 'morris' ? 'Advanced' : 'Intermediate', time: 'O(n)', space: id === 'morris' ? 'O(1)' : 'O(h)', tags: ['tree', 'traversal'],
  })),
  ...[
    ['red-black', 'Red-Black Trees', 'Balance a search tree with coloring invariants and rotations.'],
    ['b-tree', 'B-Trees', 'Store multiple keys per node to keep disk-oriented trees shallow.'],
    ['trie', 'Trie (Prefix Tree)', 'Store characters along shared prefixes for fast prefix queries.'],
    ['segment-tree', 'Segment Trees', 'Answer range queries while supporting efficient updates.'],
    ['fenwick', 'Fenwick Trees', 'Maintain prefix aggregates with compact indexed ranges.'],
  ].map(([id, title, desc]) => makeTopic(`tree-${id}`, title, 'Tree', 'Advanced Trees', desc, 'tree', { difficulty: 'Advanced', tags: ['tree', 'advanced'] })),
  ...[
    ['lca', 'Lowest Common Ancestor', 'Find the deepest tree node that is an ancestor of two targets.'],
    ['diameter', 'Tree Diameter', 'Find the longest path between any two nodes.'],
    ['isomorphism', 'Tree Isomorphism', 'Determine whether two tree structures have the same shape under a mapping.'],
    ['serialize', 'Serialize/Deserialize', 'Convert a tree to a sequence and reconstruct the same structure.'],
  ].map(([id, title, desc]) => makeTopic(`tree-${id}`, title, 'Tree', 'Algorithms', desc, 'tree', { difficulty: 'Advanced', tags: ['tree', 'algorithm'] })),
  ...[
    ['heap-sort', 'Heap Sort', 'Use a heap to repeatedly select the largest remaining element.'],
    ['huffman', 'Huffman Coding', 'Build a prefix code by repeatedly combining the two least frequent nodes.'],
    ['decision-tree', 'Decision Trees', 'Represent branching decisions as a hierarchy of tests.'],
    ['syntax-tree', 'Syntax Trees', 'Represent source-code structure as a hierarchical tree.'],
  ].map(([id, title, desc]) => makeTopic(`tree-app-${id}`, title, 'Tree', 'Applications', desc, 'tree', { difficulty: id === 'heap-sort' ? 'Intermediate' : 'Advanced', tags: ['tree', 'application'] })),

  makeTopic('adjacency-matrix', 'Adjacency Matrix', 'Graph', 'Representation', 'Represent graph connections in a V × V matrix.', 'graph', { time: 'O(1) edge lookup', space: 'O(V²)', tags: ['graph', 'matrix', 'representation'] }),
  makeTopic('adjacency-list', 'Adjacency List', 'Graph', 'Representation', 'Store each vertex with a list of its neighboring vertices.', 'graph', { time: 'O(1) average insert', space: 'O(V + E)', tags: ['graph', 'list', 'representation'] }),
  makeTopic('bfs', 'Breadth-First Search (BFS)', 'Graph', 'Traversal', 'Explore a graph level by level using a queue.', 'graph', { time: 'O(V + E)', space: 'O(V)', difficulty: 'Intermediate', tags: ['graph', 'BFS', 'queue'] }),
  makeTopic('dfs', 'Depth-First Search (DFS)', 'Graph', 'Traversal', 'Explore as far as possible before backtracking.', 'graph', { time: 'O(V + E)', space: 'O(V)', difficulty: 'Intermediate', tags: ['graph', 'DFS', 'recursion'] }),
  makeTopic('dijkstra', "Dijkstra's Algorithm", 'Graph', 'Algorithms', 'Find shortest paths from a source in a graph with non-negative edge weights.', 'graph', { time: 'O((V + E) log V)', space: 'O(V)', difficulty: 'Advanced', tags: ['graph', 'shortest path', 'weighted'] }),
  makeTopic('prim', "Prim's Algorithm", 'Graph', 'Algorithms', 'Grow a minimum spanning tree by repeatedly taking the cheapest crossing edge.', 'graph', { time: 'O((V + E) log V)', space: 'O(V)', difficulty: 'Advanced', tags: ['graph', 'MST', 'greedy'] }),
  makeTopic('kruskal', "Kruskal's Algorithm", 'Graph', 'Algorithms', 'Build a minimum spanning tree by adding the cheapest edge that does not form a cycle.', 'graph', { time: 'O(E log E)', space: 'O(V)', difficulty: 'Advanced', tags: ['graph', 'MST', 'union-find'] }),
  makeTopic('topological-sort', 'Topological Sort', 'Graph', 'Algorithms', 'Order the vertices of a directed acyclic graph so every edge points forward.', 'graph', { time: 'O(V + E)', space: 'O(V)', difficulty: 'Advanced', tags: ['graph', 'DAG', 'ordering'] }),

  // Extended data structures and algorithm curriculum.
  ...[
    ['array-adt', 'Array Data Structure', 'Fundamentals', 'A contiguous collection with indexed access and update operations.', 'concept'],
    ['dynamic-array', 'Dynamic Array / Vector', 'Fundamentals', 'A resizable array that grows its backing storage when capacity is reached.', 'concept'],
    ['static-array', 'Static Array', 'Fundamentals', 'A fixed-size contiguous array with constant-time indexed access.', 'concept'],
    ['matrix', 'Matrix / 2D Array', 'Fundamentals', 'Represent rows and columns of values and traverse or update cells by index.', 'concept'],
    ['array-methods', 'Array Operations', 'Operations', 'Explore access, update, insert, delete, append, remove, and resize operations.', 'concept'],
    ['two-pointers', 'Two Pointers', 'Interview Patterns', 'Move two indices through a sequence to reduce nested work.', 'concept'],
    ['sliding-window', 'Sliding Window', 'Interview Patterns', 'Maintain a moving range while adding and removing boundary elements.', 'concept'],
    ['prefix-sum', 'Prefix Sum', 'Interview Patterns', 'Precompute cumulative totals so range sums can be answered quickly.', 'concept'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Array', section, desc, kind as TopicKind, {
    difficulty: title === 'Static Array' ? 'Beginner' : 'Intermediate',
    time: title === 'Array Data Structure' || title === 'Static Array' ? 'O(1) access' : 'O(n) typical',
    space: 'O(n)',
    tags: ['array', 'data structure', section.toLowerCase()],
  })),

  ...[
    ['hash-table', 'Hash Tables', 'Hash Tables', 'Map keys to buckets using a hash function so average lookup, insertion, and deletion are constant time.', 'concept'],
    ['hash-set', 'Hash Sets', 'Hash Tables', 'Store unique keys and support average constant-time membership checks.', 'concept'],
    ['hash-map', 'Hash Maps', 'Hash Tables', 'Store key-value pairs and update or retrieve values by key.', 'concept'],
    ['hash-collision', 'Collision Handling', 'Hash Tables', 'Resolve multiple keys mapping to the same bucket using chaining or open addressing.', 'concept'],
    ['hash-open-addressing', 'Open Addressing', 'Hash Tables', 'Probe alternative slots when a hash table bucket is already occupied.', 'concept'],
    ['hash-chaining', 'Separate Chaining', 'Hash Tables', 'Keep a collection of entries in each bucket to resolve collisions.', 'concept'],
    ['lookup-table', 'Lookup Tables', 'Hash Tables', 'Precompute or store values by key for fast repeated access.', 'concept'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Hash Tables', section, desc, kind as TopicKind, {
    difficulty: title === 'Hash Sets' || title === 'Hash Maps' ? 'Beginner' : 'Intermediate',
    time: 'O(1) average', space: 'O(n)', tags: ['hash table', 'lookup', 'map'],
  })),

  ...[
    ['heap', 'Heap', 'Heaps & Priority Queues', 'Maintain a complete binary tree with a parent-child ordering invariant.', 'concept'],
    ['min-heap', 'Min Heap', 'Heaps & Priority Queues', 'Keep the smallest value at the root so minimum extraction is efficient.', 'concept'],
    ['max-heap', 'Max Heap', 'Heaps & Priority Queues', 'Keep the largest value at the root so maximum extraction is efficient.', 'concept'],
    ['heapify', 'Heapify', 'Heaps & Priority Queues', 'Restore the heap invariant from a node downward.', 'concept'],
    ['build-heap', 'Build Heap', 'Heaps & Priority Queues', 'Transform an array into a heap using bottom-up heapify.', 'concept'],
    ['priority-queue-heap', 'Priority Queue with Heap', 'Heaps & Priority Queues', 'Use a heap to repeatedly retrieve the highest- or lowest-priority item.', 'concept'],
    ['deque', 'Deque', 'Stacks & Queues', 'A double-ended queue supports insertion and removal at both ends.', 'queue'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Stacks & Queues', section, desc, kind as TopicKind, {
    difficulty: title === 'Heap' ? 'Beginner' : 'Intermediate',
    time: title === 'Heap' ? 'O(log n) update' : 'O(log n) typical', space: 'O(n)', tags: ['heap', 'priority queue'],
  })),

  ...[
    ['union-find', 'Union-Find / DSU', 'Disjoint Sets', 'Maintain connected components with path compression and union by rank or size.', 'concept'],
    ['path-compression', 'Path Compression', 'Disjoint Sets', 'Flatten parent chains during find operations to make future operations faster.', 'concept'],
    ['union-by-rank', 'Union by Rank', 'Disjoint Sets', 'Attach the shallower tree under the deeper tree when merging components.', 'concept'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Graphs', section, desc, kind as TopicKind, {
    difficulty: 'Advanced', time: 'O(α(n)) amortized', space: 'O(n)', tags: ['union find', 'DSU', 'graph'],
  })),

  ...[
    ['cycle-undirected', 'Cycle Detection — Undirected', 'Cycle Detection', 'Detect a cycle in an undirected graph using DFS or disjoint sets.', 'graph'],
    ['cycle-directed', 'Cycle Detection — Directed', 'Cycle Detection', 'Detect a directed cycle using DFS colors or Kahn’s algorithm.', 'graph'],
    ['topological-kahn', 'Topological Sort — Kahn', 'Traversal', 'Build an ordering from indegree counts using a queue.', 'graph'],
    ['floyd-warshall', 'Floyd-Warshall', 'Shortest Path', 'Compute all-pairs shortest paths by allowing intermediate vertices one at a time.', 'graph'],
    ['a-star', 'A* Search', 'Shortest Path', 'Combine path cost with a heuristic estimate to guide search toward a target.', 'graph'],
    ['bellman-ford', 'Bellman-Ford', 'Shortest Path', 'Relax every edge repeatedly and detect reachable negative cycles.', 'graph'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Graphs', section, desc, kind as TopicKind, {
    difficulty: 'Advanced', time: title === 'Floyd-Warshall' ? 'O(V³)' : 'O(VE)', space: 'O(V)', tags: ['graph', 'shortest path', section.toLowerCase()],
  })),

  ...[
    ['prim-mst', "Prim's Minimum Spanning Tree", 'Minimum Spanning Tree', 'Grow a spanning tree from one starting vertex using the cheapest crossing edge.', 'graph'],
    ['kruskal-mst', "Kruskal's Minimum Spanning Tree", 'Minimum Spanning Tree', 'Sort edges by weight and add them when they connect two different components.', 'graph'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Graphs', section, desc, kind as TopicKind, {
    difficulty: 'Advanced', time: 'O(E log E)', space: 'O(V)', tags: ['MST', 'graph', 'greedy'],
  })),

  ...[
    ['max-flow', 'Maximum Flow', 'Maximum Flow', 'Find the greatest amount of flow that can move from a source to a sink subject to capacities.', 'graph'],
    ['ford-fulkerson', 'Ford-Fulkerson', 'Maximum Flow', 'Repeatedly augment flow along an available source-to-sink path.', 'graph'],
    ['edmonds-karp', 'Edmonds-Karp', 'Maximum Flow', 'Use BFS to choose the shortest augmenting path in Ford-Fulkerson.', 'graph'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Graphs', section, desc, kind as TopicKind, {
    difficulty: 'Advanced', time: title === 'Edmonds-Karp' ? 'O(VE²)' : 'Depends on capacities', space: 'O(V + E)', tags: ['max flow', 'graph', 'network'],
  })),

  ...[
    ['counting-sort', 'Counting Sort', 'Sorting', 'Sort integers by counting occurrences when the key range is manageable.', 'sort'],
    ['radix-sort', 'Radix Sort', 'Sorting', 'Sort numbers digit by digit using a stable intermediate sort.', 'sort'],
    ['bucket-sort', 'Bucket Sort', 'Sorting', 'Distribute values into buckets, sort each bucket, then concatenate them.', 'sort'],
    ['shell-sort', 'Shell Sort', 'Sorting', 'Perform insertion sort over progressively smaller gaps.', 'sort'],
    ['cocktail-sort', 'Cocktail Shaker Sort', 'Sorting', 'Run bubble-sort passes in both directions to move small and large values.', 'sort'],
    ['shell-array', 'Shell Sort on Arrays', 'Sorting', 'Use gap-based insertion passes to reduce inversions before the final pass.', 'sort'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Array', section, desc, kind as TopicKind, {
    difficulty: ['Counting Sort', 'Radix Sort'].includes(title) ? 'Intermediate' : 'Advanced',
    time: title === 'Counting Sort' ? 'O(n + k)' : title === 'Radix Sort' ? 'O(d(n + k))' : 'O(n log n) typical',
    space: 'O(n + k)', tags: ['sorting', 'array'],
  })),

  ...[
    ['euclidean', 'Euclidean Algorithm', 'Algorithms Reference', 'Compute the greatest common divisor using repeated remainder operations.', 'concept'],
    ['huffman', 'Huffman Coding', 'Algorithms Reference', 'Build an optimal prefix-code tree by repeatedly combining the two least frequent symbols.', 'tree'],
    ['tsp', 'Traveling Salesman Problem', 'Algorithms Reference', 'Find a minimum-cost tour that visits each city exactly once and returns to the start.', 'graph'],
    ['knapsack-01', '0/1 Knapsack', 'Dynamic Programming', 'Choose items at most once to maximize value under a capacity constraint.', 'concept'],
    ['memoization', 'Memoization', 'Dynamic Programming', 'Cache recursive subproblem results so each state is solved once.', 'concept'],
    ['tabulation', 'Tabulation', 'Dynamic Programming', 'Build a dynamic-programming table from base cases toward the target state.', 'concept'],
    ['dynamic-programming', 'Dynamic Programming', 'Dynamic Programming', 'Solve overlapping subproblems with optimal substructure using cached states.', 'concept'],
    ['greedy', 'Greedy Algorithms', 'Greedy', 'Make the locally best choice at each step when the problem supports a greedy proof.', 'concept'],
    ['coin-change', 'Coin Change', 'Dynamic Programming', 'Compute the minimum number of coins needed to form a target amount.', 'concept'],
    ['lcs', 'Longest Common Subsequence', 'Dynamic Programming', 'Find the longest sequence that appears in both strings in the same relative order.', 'concept'],
    ['lis', 'Longest Increasing Subsequence', 'Dynamic Programming', 'Find the longest strictly increasing subsequence of a sequence.', 'concept'],
    ['edit-distance', 'Edit Distance', 'Dynamic Programming', 'Compute the minimum insert, delete, and replace operations to transform one string into another.', 'concept'],
    ['kadane', "Kadane's Algorithm", 'Dynamic Programming', 'Find the maximum-sum contiguous subarray in linear time.', 'concept'],
    ['activity-selection', 'Activity Selection', 'Greedy', 'Select the maximum number of non-overlapping activities by earliest finish time.', 'concept'],
    ['interval-scheduling', 'Interval Scheduling', 'Greedy', 'Choose compatible intervals according to a greedy ordering.', 'concept'],
    ['backtracking', 'Backtracking', 'Algorithms Reference', 'Explore choices recursively and undo a choice when it cannot lead to a solution.', 'concept'],
    ['permutations', 'Generate Permutations', 'Backtracking', 'Enumerate arrangements by choosing unused elements and backtracking.', 'concept'],
    ['n-queens', 'N-Queens', 'Backtracking', 'Place queens so no two attack each other using recursive constraint search.', 'concept'],
    ['kmp', 'KMP String Matching', 'Strings', 'Search for a pattern using a prefix-function table to avoid redundant comparisons.', 'concept'],
    ['rabin-karp', 'Rabin-Karp', 'Strings', 'Use rolling hashes to find candidate pattern matches efficiently.', 'concept'],
    ['palindrome', 'Palindrome Check', 'Strings', 'Compare characters from both ends or use a two-pointer scan.', 'concept'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, section === 'Strings' ? 'Strings' : section === 'Greedy' ? 'Algorithms' : section === 'Dynamic Programming' ? 'Algorithms' : 'Algorithms', section, desc, kind as TopicKind, {
    difficulty: ['Euclidean Algorithm', 'Palindrome Check'].includes(title) ? 'Beginner' : 'Advanced',
    time: title === 'Traveling Salesman Problem' ? 'O(n!) brute force' : title === 'Dynamic Programming' ? 'Problem dependent' : 'O(n) to O(n²)',
    space: 'O(n)', tags: [section.toLowerCase(), 'algorithm'],
  })),


  ...[
    ['array-access', 'Array Access', 'Array Methods', 'Read an element by index in constant time on a contiguous array.', 'concept'],
    ['array-update', 'Array Update', 'Array Methods', 'Replace the value stored at an existing index.', 'concept'],
    ['array-insert', 'Array Insert', 'Array Methods', 'Insert a value and shift later elements to preserve order.', 'concept'],
    ['array-delete', 'Array Delete', 'Array Methods', 'Remove a value and shift the remaining elements when order matters.', 'concept'],
    ['array-map', 'Map', 'Array Methods', 'Transform every element into a new array using a mapping function.', 'concept'],
    ['array-filter', 'Filter', 'Array Methods', 'Keep only elements that satisfy a predicate.', 'concept'],
    ['array-reduce', 'Reduce', 'Array Methods', 'Accumulate an array into a single result.', 'concept'],
    ['array-slice-splice', 'Slice & Splice', 'Array Methods', 'Compare non-mutating range extraction with insertion/removal in an array.', 'concept'],
    ['vector-capacity', 'Vector Capacity & Resize', 'Vectors', 'Understand size, capacity, growth, and amortized append cost in dynamic arrays.', 'concept'],
    ['priority-queue', 'Priority Queue', 'Heaps & Priority Queues', 'Retrieve the highest-priority element efficiently, commonly with a heap.', 'queue'],
    ['skip-list', 'Skip List', 'Advanced Structures', 'Use multiple linked-list levels to support expected logarithmic search.', 'list'],
    ['bloom-filter', 'Bloom Filter', 'Probabilistic Structures', 'Use compact bit arrays and hash functions for fast probabilistic membership tests.', 'concept'],
    ['bitset', 'Bitset', 'Bit Manipulation', 'Store boolean flags compactly as individual bits.', 'concept'],
    ['sparse-table', 'Sparse Table', 'Range Queries', 'Precompute overlapping ranges for fast immutable range queries.', 'concept'],
    ['segment-tree-lazy', 'Lazy Propagation', 'Range Queries', 'Defer segment-tree range updates until a covered node must be pushed down.', 'concept'],
    ['fenwick-tree', 'Fenwick Tree / BIT', 'Range Queries', 'Maintain prefix sums with logarithmic point updates and queries.', 'concept'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, section === 'Vectors' ? 'Array' : section === 'Heaps & Priority Queues' ? 'Stacks & Queues' : section === 'Array Methods' ? 'Array' : section === 'Advanced Structures' ? 'Linked List' : 'Tree', section, desc, kind as TopicKind, {
    difficulty: ['Array Access', 'Array Update', 'Map', 'Filter', 'Reduce'].includes(title) ? 'Beginner' : 'Intermediate',
    time: title === 'Array Access' || title === 'Array Update' ? 'O(1)' : 'O(log n) typical',
    space: 'O(n)', tags: ['data structure', section.toLowerCase()],
  })),

  ...[
    ['tc-introduction', 'Introduction', 'Time Complexity', 'Learn Big-O, Big-Theta, Big-Omega, input size, and dominant growth terms.', 'concept'],
    ['tc-bubble', 'Bubble Sort', 'Time Complexity', 'Analyze the nested comparisons and best-case early-exit behavior of bubble sort.', 'concept'],
    ['tc-selection', 'Selection Sort', 'Time Complexity', 'Analyze the fixed comparison count and constant extra space of selection sort.', 'concept'],
    ['tc-insertion', 'Insertion Sort', 'Time Complexity', 'Compare best, average, and worst cases for insertion sort.', 'concept'],
    ['tc-quick', 'Quick Sort', 'Time Complexity', 'Understand balanced partitions, worst-case partitions, and recursion depth.', 'concept'],
    ['tc-counting', 'Counting Sort', 'Time Complexity', 'Relate runtime to both input size and key range.', 'concept'],
    ['tc-radix', 'Radix Sort', 'Time Complexity', 'Relate runtime to digit count and the base-range counting pass.', 'concept'],
    ['tc-merge', 'Merge Sort', 'Time Complexity', 'See why divide-and-merge produces O(n log n) runtime.', 'concept'],
    ['tc-linear', 'Linear Search', 'Time Complexity', 'Analyze the number of inspected elements in a sequential search.', 'concept'],
    ['tc-binary', 'Binary Search', 'Time Complexity', 'See why halving the search interval creates logarithmic growth.', 'concept'],
  ].map(([id, title, section, desc, kind]) => makeTopic(id, title, 'Algorithms', section, desc, kind as TopicKind, {
    difficulty: 'Beginner', time: 'See analysis', space: 'See analysis', tags: ['complexity', 'big-o'],
  })),

];

export const categoryOrder = ['Array', 'Stack', 'Queue', 'Stacks & Queues', 'Linked List', 'Hash Tables', 'Tree', 'Graph', 'Graphs', 'Algorithms', 'Strings'];
export const totalModules = topics.length;
