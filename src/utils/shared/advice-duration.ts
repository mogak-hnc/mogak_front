export const DURATION_MAP: Record<number, AdviceDuration> = {
  0.016: "ONE_MINUTE",
  1: "ONE_HOUR",
  3: "THREE_HOURS",
  6: "SIX_HOURS",
  12: "TWELVE_HOURS",
  24: "TWENTY_FOUR_HOURS",
};

export type AdviceDuration =
  | "ONE_MINUTE"
  | "ONE_HOUR"
  | "THREE_HOURS"
  | "SIX_HOURS"
  | "TWELVE_HOURS"
  | "TWENTY_FOUR_HOURS";
