import type { Language } from './implementations';

export type ExtendedCodeMap = Record<Language, string[]>;
const make = (ts: string[], js: string[], py: string[], java: string[], cpp: string[]): ExtendedCodeMap => ({ TypeScript: ts, JavaScript: js, Python: py, Java: java, 'C++': cpp });


const patterns: Record<string, ExtendedCodeMap> = {
  'Merge Sort': make(
    ['function mergeSort(a: number[]): number[] {','  if (a.length < 2) return a;','  const mid = Math.floor(a.length / 2);','  return merge(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid)));','}'],
    ['function mergeSort(a) {','  if (a.length < 2) return a;','  const mid = Math.floor(a.length / 2);','  return merge(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid)));','}'],
    ['def merge_sort(a):','    if len(a) < 2: return a','    mid = len(a) // 2','    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))'],
    ['static int[] mergeSort(int[] a) {','    if (a.length < 2) return a;','    int mid = a.length / 2;','    return merge(mergeSort(Arrays.copyOfRange(a, 0, mid)), mergeSort(Arrays.copyOfRange(a, mid, a.length)));','}'],
    ['vector<int> mergeSort(vector<int> a) {','    if (a.size() < 2) return a;','    auto mid = a.begin() + a.size() / 2;','    return merge(mergeSort(vector<int>(a.begin(), mid)), mergeSort(vector<int>(mid, a.end())));','}'],
  ),
  'Quick Sort': make(
    ['function quickSort(a: number[], lo = 0, hi = a.length - 1) {','  if (lo >= hi) return;','  const p = partition(a, lo, hi);','  quickSort(a, lo, p - 1);','  quickSort(a, p + 1, hi);','}'],
    ['function quickSort(a, lo = 0, hi = a.length - 1) {','  if (lo >= hi) return;','  const p = partition(a, lo, hi);','  quickSort(a, lo, p - 1);','  quickSort(a, p + 1, hi);','}'],
    ['def quick_sort(a):','    if len(a) < 2: return a','    pivot = a[-1]','    left = [x for x in a[:-1] if x <= pivot]','    right = [x for x in a[:-1] if x > pivot]','    return quick_sort(left) + [pivot] + quick_sort(right)'],
    ['static void quickSort(int[] a, int lo, int hi) {','    if (lo >= hi) return;','    int p = partition(a, lo, hi);','    quickSort(a, lo, p - 1);','    quickSort(a, p + 1, hi);','}'],
    ['void quickSort(vector<int>& a, int lo, int hi) {','    if (lo >= hi) return;','    int p = partition(a, lo, hi);','    quickSort(a, lo, p - 1);','    quickSort(a, p + 1, hi);','}'],
  ),
  'Bellman-Ford': make(
    ['function bellmanFord(edges: [number, number, number][], n: number, source: number) {','  const dist = Array(n).fill(Infinity);','  dist[source] = 0;','  for (let i = 1; i < n; i++) {','    for (const [u, v, w] of edges) {','      if (dist[u] !== Infinity) dist[v] = Math.min(dist[v], dist[u] + w);','    }','  }','  return dist;','}'],
    ['function bellmanFord(edges, n, source) {','  const dist = Array(n).fill(Infinity);','  dist[source] = 0;','  for (let i = 1; i < n; i++) for (const [u, v, w] of edges)','    if (dist[u] !== Infinity) dist[v] = Math.min(dist[v], dist[u] + w);','  return dist;','}'],
    ['def bellman_ford(edges, n, source):','    dist = [float("inf")] * n','    dist[source] = 0','    for _ in range(n - 1):','        for u, v, w in edges:','            if dist[u] != float("inf"):','                dist[v] = min(dist[v], dist[u] + w)','    return dist'],
    ['static int[] bellmanFord(int[][] edges, int n, int source) {','    int[] dist = new int[n];','    Arrays.fill(dist, Integer.MAX_VALUE);','    dist[source] = 0;','    for (int i = 1; i < n; i++)','        for (int[] e : edges)','            if (dist[e[0]] != Integer.MAX_VALUE) dist[e[1]] = Math.min(dist[e[1]], dist[e[0]] + e[2]);','    return dist;','}'],
    ['vector<int> bellmanFord(const vector<array<int,3>>& edges, int n, int source) {','    const int INF = 1e9;','    vector<int> dist(n, INF); dist[source] = 0;','    for (int i = 1; i < n; ++i)','        for (auto [u,v,w] : edges)','            if (dist[u] < INF) dist[v] = min(dist[v], dist[u] + w);','    return dist;','}'],
  ),
  "Dijkstra's Algorithm": make(
    ['function dijkstra(graph: [number, number][][], source: number) {','  const dist = Array(graph.length).fill(Infinity);','  const used = new Set<number>();','  dist[source] = 0;','  for (let step = 0; step < graph.length; step++) {','    let u = -1;','    for (let i = 0; i < dist.length; i++) if (!used.has(i) && (u < 0 || dist[i] < dist[u])) u = i;','    if (u < 0) break;','    used.add(u);','    for (const [v, w] of graph[u]) dist[v] = Math.min(dist[v], dist[u] + w);','  }','  return dist;','}'],
    ['function dijkstra(graph, source) {','  const dist = Array(graph.length).fill(Infinity), used = new Set([source]);','  dist[source] = 0;','  for (let step = 0; step < graph.length; step++) {','    let u = -1;','    for (let i = 0; i < dist.length; i++) if (!used.has(i) && (u < 0 || dist[i] < dist[u])) u = i;','    if (u < 0) break;','    used.add(u);','    for (const [v, w] of graph[u]) dist[v] = Math.min(dist[v], dist[u] + w);','  }','  return dist;','}'],
    ['import heapq','','def dijkstra(graph, source):','    dist = [float("inf")] * len(graph)','    dist[source] = 0','    pq = [(0, source)]','    while pq:','        d, u = heapq.heappop(pq)','        if d != dist[u]: continue','        for v, w in graph[u]:','            nd = d + w','            if nd < dist[v]:','                dist[v] = nd','                heapq.heappush(pq, (nd, v))','    return dist'],
    ['static int[] dijkstra(List<List<int[]>> graph, int source) {','    int[] dist = new int[graph.size()]; Arrays.fill(dist, Integer.MAX_VALUE);','    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(x -> x[1]));','    dist[source] = 0; pq.offer(new int[]{source, 0});','    while (!pq.isEmpty()) {','        int[] cur = pq.poll(); int u = cur[0], d = cur[1];','        if (d != dist[u]) continue;','        for (int[] edge : graph.get(u)) {','            int v = edge[0], w = edge[1];','            if (d + w < dist[v]) { dist[v] = d + w; pq.offer(new int[]{v, dist[v]}); }','        }','    }','    return dist;','}'],
    ['vector<int> dijkstra(const vector<vector<pair<int,int>>>& g, int source) {','    const int INF = 1e9; vector<int> dist(g.size(), INF);','    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;','    dist[source] = 0; pq.push({0, source});','    while (!pq.empty()) {','        auto [d,u] = pq.top(); pq.pop();','        if (d != dist[u]) continue;','        for (auto [v,w] : g[u]) if (d + w < dist[v]) { dist[v] = d + w; pq.push({dist[v], v}); }','    }','    return dist;','}'],
  ),
  'Floyd-Warshall': make(
    ['function floydWarshall(d: number[][]) {','  const dist = d.map(row => [...row]);','  for (let k = 0; k < dist.length; k++)','    for (let i = 0; i < dist.length; i++)','      for (let j = 0; j < dist.length; j++)','        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);','  return dist;','}'],
    ['function floydWarshall(d) {','  const dist = d.map(row => [...row]);','  for (let k = 0; k < dist.length; k++) for (let i = 0; i < dist.length; i++) for (let j = 0; j < dist.length; j++)','    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);','  return dist;','}'],
    ['def floyd_warshall(dist):','    dist = [row[:] for row in dist]','    for k in range(len(dist)):','        for i in range(len(dist)):','            for j in range(len(dist)):','                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])','    return dist'],
    ['static void floydWarshall(int[][] dist) {','    for (int k = 0; k < dist.length; k++)','        for (int i = 0; i < dist.length; i++)','            for (int j = 0; j < dist.length; j++)','                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);','}'],
    ['void floydWarshall(vector<vector<int>>& d) {','    for (int k = 0; k < d.size(); ++k)','        for (int i = 0; i < d.size(); ++i)','            for (int j = 0; j < d.size(); ++j)','                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);','}'],
  ),
  'Cycle Detection — Undirected': make(
    ['function hasCycle(graph: number[][]): boolean {','  const seen = new Set<number>();','  function dfs(u: number, parent: number) {','    seen.add(u);','    for (const v of graph[u]) {','      if (!seen.has(v)) { if (dfs(v, u)) return true; }','      else if (v !== parent) return true;','    }','    return false;','  }','  for (let u = 0; u < graph.length; u++) if (!seen.has(u) && dfs(u, -1)) return true;','  return false;','}'],
    ['function hasCycle(graph) {','  const seen = new Set();','  function dfs(u, parent) {','    seen.add(u);','    for (const v of graph[u]) {','      if (!seen.has(v)) { if (dfs(v, u)) return true; }','      else if (v !== parent) return true;','    }','    return false;','  }','  for (let u = 0; u < graph.length; u++) if (!seen.has(u) && dfs(u, -1)) return true;','  return false;','}'],
    ['def has_cycle(graph):','    seen = set()','    def dfs(u, parent):','        seen.add(u)','        for v in graph[u]:','            if v not in seen:','                if dfs(v, u): return True','            elif v != parent: return True','        return False','    return any(u not in seen and dfs(u, -1) for u in range(len(graph)))'],
    ['static boolean hasCycle(List<List<Integer>> graph) {','    boolean[] seen = new boolean[graph.size()];','    for (int u = 0; u < graph.size(); u++) if (!seen[u] && dfs(graph, u, -1, seen)) return true;','    return false;','}'],
    ['bool hasCycle(const vector<vector<int>>& g) {','    vector<bool> seen(g.size());','    function<bool(int,int)> dfs = [&](int u,int p){','        seen[u]=true;','        for(int v:g[u]) if(!seen[v] ? dfs(v,u) : v!=p) return true;','        return false;','    };','    for(int u=0;u<g.size();++u) if(!seen[u] && dfs(u,-1)) return true;','    return false;','}'],
  ),
  'Greedy Algorithms': make(
    ['function greedy(values: number[]) {','  values.sort((a, b) => b - a);','  const chosen: number[] = [];','  for (const value of values) {','    if (canTake(value, chosen)) chosen.push(value);','  }','  return chosen;','}'],
    ['function greedy(values) {','  values.sort((a, b) => b - a);','  const chosen = [];','  for (const value of values) if (canTake(value, chosen)) chosen.push(value);','  return chosen;','}'],
    ['def greedy(values):','    values.sort(reverse=True)','    chosen = []','    for value in values:','        if can_take(value, chosen):','            chosen.append(value)','    return chosen'],
    ['static List<Integer> greedy(List<Integer> values) {','    values.sort(Comparator.reverseOrder());','    List<Integer> chosen = new ArrayList<>();','    for (int value : values) if (canTake(value, chosen)) chosen.add(value);','    return chosen;','}'],
    ['vector<int> greedy(vector<int> values) {','    sort(values.rbegin(), values.rend());','    vector<int> chosen;','    for (int value : values) if (canTake(value, chosen)) chosen.push_back(value);','    return chosen;','}'],
  ),
  'Huffman Coding': make(
    ['type Node = { char: string; freq: number; left?: Node; right?: Node };','const heap: Node[] = frequencies.map(([char, freq]) => ({ char, freq }));','while (heap.length > 1) {','  heap.sort((a, b) => a.freq - b.freq);','  const left = heap.shift()!;','  const right = heap.shift()!;','  heap.push({ char: "", freq: left.freq + right.freq, left, right });','}','const root = heap[0];'],
    ['const heap = frequencies.map(([char, freq]) => ({ char, freq }));','while (heap.length > 1) {','  heap.sort((a, b) => a.freq - b.freq);','  const left = heap.shift();','  const right = heap.shift();','  heap.push({ char: "", freq: left.freq + right.freq, left, right });','}','const root = heap[0];'],
    ['import heapq','heap = [(freq, char, None, None) for char, freq in frequencies]','heapq.heapify(heap)','while len(heap) > 1:','    left = heapq.heappop(heap)','    right = heapq.heappop(heap)','    heapq.heappush(heap, (left[0] + right[0], "", left, right))','root = heap[0]'],
    ['PriorityQueue<Node> heap = new PriorityQueue<>(Comparator.comparingInt(n -> n.freq));','for (Node node : nodes) heap.offer(node);','while (heap.size() > 1) {','    Node left = heap.poll();','    Node right = heap.poll();','    heap.offer(new Node("", left.freq + right.freq, left, right));','}','Node root = heap.poll();'],
    ['priority_queue<Node, vector<Node>, Compare> heap;','for (auto node : nodes) heap.push(node);','while (heap.size() > 1) {','    Node left = heap.top(); heap.pop();','    Node right = heap.top(); heap.pop();','    heap.push(Node{"", left.freq + right.freq, left, right});','}','Node root = heap.top();'],
  ),
  'Traveling Salesman Problem': make(
    ['function tsp(dist: number[][]): number {','  const n = dist.length;','  const memo = new Map<string, number>();','  function dp(mask: number, u: number): number {','    if (mask === (1 << n) - 1) return dist[u][0];','    const key = `${mask},${u}`;','    if (memo.has(key)) return memo.get(key)!;','    let best = Infinity;','    for (let v = 0; v < n; v++) if (!(mask & (1 << v))) best = Math.min(best, dist[u][v] + dp(mask | (1 << v), v));','    memo.set(key, best); return best;','  }','  return dp(1, 0);','}'],
    ['function tsp(dist) {','  const n = dist.length, memo = new Map();','  function dp(mask, u) {','    if (mask === (1 << n) - 1) return dist[u][0];','    const key = `${mask},${u}`;','    if (memo.has(key)) return memo.get(key);','    let best = Infinity;','    for (let v = 0; v < n; v++) if (!(mask & (1 << v))) best = Math.min(best, dist[u][v] + dp(mask | (1 << v), v));','    memo.set(key, best); return best;','  }','  return dp(1, 0);','}'],
    ['def tsp(dist):','    n = len(dist)','    memo = {}','    def dp(mask, u):','        if mask == (1 << n) - 1: return dist[u][0]','        if (mask, u) in memo: return memo[(mask, u)]','        memo[(mask, u)] = min(dist[u][v] + dp(mask | (1 << v), v) for v in range(n) if not mask & (1 << v))','        return memo[(mask, u)]','    return dp(1, 0)'],
    ['static int tsp(int[][] d, int mask, int u, Map<String,Integer> memo) {','    if (mask == (1 << d.length) - 1) return d[u][0];','    String key = mask + ":" + u;','    if (memo.containsKey(key)) return memo.get(key);','    int best = Integer.MAX_VALUE;','    for (int v = 0; v < d.length; v++) if ((mask & (1 << v)) == 0) best = Math.min(best, d[u][v] + tsp(d, mask | (1 << v), v, memo));','    memo.put(key, best); return best;','}'],
    ['int tsp(const vector<vector<int>>& d, int mask, int u, map<pair<int,int>,int>& memo) {','    if (mask == (1 << d.size()) - 1) return d[u][0];','    if (memo.count({mask,u})) return memo[{mask,u}];','    int best = INT_MAX;','    for (int v=0; v<d.size(); ++v) if (!(mask & (1<<v))) best=min(best,d[u][v]+tsp(d,mask|(1<<v),v,memo));','    return memo[{mask,u}] = best;','}'],
  ),
}

export function getPatternImplementation(title: string): ExtendedCodeMap | undefined {
  return patterns[title];
}
