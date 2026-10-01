export type TraceStep = {
  values: number[];
  active: number[];
  sorted?: number[];
  line: number;
  message: string;
  variables: Record<string, string>;
};
