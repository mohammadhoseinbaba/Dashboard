export const usUnemploymentRate = [
  { date: new Date(2020, 0), rate: 3.5 },
  { date: new Date(2020, 1), rate: 3.6 },
  { date: new Date(2020, 2), rate: 4.4 },
  { date: new Date(2020, 3), rate: 14.7 },
  { date: new Date(2020, 4), rate: 13.3 },
];

export const percentageFormatter = (value: number | null) =>
  value === null ? "" : `${value}%`;

export const dateAxisFormatter = (date: Date | null) =>
  date ? date.getFullYear().toString() : "";
