export type ResizeOption =
  | { enabled: false }
  | { enabled: true; fitMethod: "contain" | "stretch"; width: number; height: number };
