export const usUnemploymentRate = [
  { date: new Date(2020, 0), rate: 3.5 },
  { date: new Date(2020, 1), rate: 3.6 },
  { date: new Date(2020, 2), rate: 14.4 },
  { date: new Date(2020, 3), rate: 2.7 },
  { date: new Date(2020, 4), rate: 13.3 },
  { date: new Date(2020, 5), rate: 4.7 },
  { date: new Date(2020, 6), rate: 13.3 },
  { date: new Date(2020, 7), rate: 14.7 },
  { date: new Date(2020, 8), rate: 3.3 },
  { date: new Date(2020, 9), rate: 4.7 },
  { date: new Date(2020, 10), rate: 3.3 },
  { date: new Date(2020, 11), rate: 14.7 },
];

export const percentageFormatter = (value: number | null) =>
  value === null ? "" : `${value}%`;

export const dateAxisFormatter = (date: Date | null) =>
  date ? date.getFullYear().toString() : "";
