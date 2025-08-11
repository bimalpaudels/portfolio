export const breadcrumbPuns = [
  "bread & butter",
  "loaf around",
  "toast to success",
  "bun in the oven",
  "slice of life",
  "dough-lightful",
  "knead to know",
  "rise to the occasion",
  "flour power",
  "yeast or west"
];

export function getRandomBreadcrumbPun(): string {
  const randomIndex = Math.floor(Math.random() * breadcrumbPuns.length);
  return breadcrumbPuns[randomIndex];
}
