import type { Topic } from './topics';

const map: Record<string, string[]> = {
  'Bubble Sort': ['REPEAT for each unsorted pass', '  FOR each adjacent pair', '    IF left > right, swap them', '  Mark the largest remaining item as sorted', 'STOP early if a full pass makes no swaps'],
  'Selection Sort': ['FOR each position i', '  Set minIndex = i', '  Scan the remaining elements', '  Update minIndex when a smaller value is found', '  Swap a[i] with a[minIndex]'],
  'Insertion Sort': ['FOR each item after the first', '  Store the current value as key', '  Shift larger sorted-prefix values one position right', '  Insert key into the open position'],
  'Merge Sort': ['IF the range has 0 or 1 item, return', 'Split the range into two halves', 'Recursively sort the left half', 'Recursively sort the right half', 'Merge the two sorted halves'],
  'Quick Sort': ['IF the range has at most one item, return', 'Choose a pivot', 'Partition values into items smaller/larger than the pivot', 'Place the pivot in its final position', 'Recursively sort both partitions'],
  'Heap Sort': ['Build a max heap', 'REPEAT until the heap has one item', '  Swap the root with the final heap position', '  Shrink the heap', '  Heapify the root'],
  'Counting Sort': ['Find the key range', 'Create a frequency count for each key', 'Accumulate counts when stable placement is required', 'Place values using the counts', 'Return the ordered output'],
  'Radix Sort': ['Find the maximum number of digit positions', 'FOR each digit position from least to most significant', '  Stable-sort by the current digit', 'Return the resulting array'],
  'Linear Search': ['FOR each element from left to right', '  IF the current value equals target, return its index', 'Return not found'],
  'Binary Search': ['Set low to first index and high to last index', 'WHILE low <= high', '  Inspect the middle index', '  If target matches, return it', '  Otherwise discard the half that cannot contain target', 'Return not found'],
  'Push & Pop': ['PUSH: add the value at the top', 'POP: if empty, report underflow', 'Otherwise remove and return the top value'],
  'Peek': ['IF the stack is empty, report empty', 'Otherwise return the top value without removing it'],
  'Enqueue & Dequeue': ['ENQUEUE: add the value at the rear', 'DEQUEUE: if empty, report underflow', 'Otherwise remove and return the front value'],
  'Peek Front': ['IF the queue is empty, report empty', 'Otherwise return the front value without removing it'],
  'Postfix': ['Create an empty operand stack', 'Read tokens from left to right', 'Push operands', 'For an operator, pop the right and left operands', 'Apply the operator and push the result', 'Return the final stack value'],
  'Prefix': ['Create an empty operand stack', 'Read tokens from right to left', 'Push operands', 'For an operator, pop two operands', 'Apply the operator and push the result', 'Return the final stack value'],
  'Traversal': ['Start at head', 'WHILE current is not null', 'Process current value', 'Move current to current.next'],
  'Searching': ['Start at head', 'WHILE current is not null', '  IF current value equals target, return current', '  Move to next node', 'Return not found'],
  'Reverse': ['Set previous = null and current = head', 'WHILE current exists', '  Save current.next', '  Point current.next to previous', '  Move previous and current forward', 'Return previous as the new head'],
  'Merge': ['Set pointers at both sorted list heads', 'Choose the smaller current node', 'Attach it to the result', 'Advance the chosen pointer', 'Attach the remaining suffix'],
  'Breadth-First Search (BFS)': ['Put the start vertex in a queue and mark it visited', 'WHILE the queue is not empty', '  Remove the front vertex', '  Visit each unvisited neighbor and enqueue it'],
  'Depth-First Search (DFS)': ['Mark the current vertex visited', 'Process the vertex', 'FOR each unvisited neighbor', '  Recursively visit that neighbor'],
  "Dijkstra's": ['Set source distance to 0 and all others to infinity', 'Choose the unvisited vertex with smallest tentative distance', 'Relax each outgoing edge', 'Repeat until no useful vertex remains', 'Return the distance table'],
  'Bellman-Ford': ['Set source distance to 0 and others to infinity', 'Repeat V - 1 times', '  Relax every edge', 'Run one more pass to detect a reachable negative cycle'],
  "Prim's": ['Choose a start vertex', 'Put its crossing edges into a min-priority queue', 'Take the cheapest edge to an unvisited vertex', 'Add that edge and vertex to the tree', 'Repeat until all vertices are connected'],
  "Kruskal's": ['Sort all edges by weight', 'Create one disjoint set per vertex', 'FOR each edge in increasing order', '  If endpoints are in different sets, add the edge and union the sets'],
  'Euclidean Algorithm': ['WHILE b is not zero', '  Set (a, b) = (b, a mod b)', 'Return a as the greatest common divisor'],
  '0/1 Knapsack': ['Create DP states for capacity', 'FOR each item', '  Consider skipping the item', '  If it fits, consider taking it', 'Keep the better value'],
  'Memoization': ['Define the recursive state', 'IF the state is cached, return the cached value', 'Compute the state from smaller states', 'Cache the result', 'Return it'],
  'Tabulation': ['Create a table for the subproblems', 'Initialize base cases', 'Fill states in dependency order', 'Return the target state'],
  "Kadane's Algorithm": ['Set currentSum and bestSum to the first value', 'FOR each next value', '  currentSum = max(value, currentSum + value)', '  bestSum = max(bestSum, currentSum)', 'Return bestSum'],
  'KMP String Matching': ['Build the prefix-function/LPS table for the pattern', 'Scan text and pattern together', 'On mismatch, jump using the LPS table', 'On a full match, report the starting index'],
  'Palindrome Check': ['Set left at the first character and right at the last', 'WHILE left < right', '  If characters differ, return false', '  Move both pointers inward', 'Return true'],
};

export function getPseudocode(topic: Topic): string[] {
  return map[topic.title] ?? topic.steps.map(step => step.replace(/\.$/, ''));
}
