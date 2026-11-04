export function simulateLatency(ms = 650) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nowIso() {
  return new Date().toISOString();
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value;
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function maskPhone(value: string) {
  const digits = normalizePhone(value);
  if (digits.length < 4) return "•••-•••-••••";
  return `•••-•••-${digits.slice(-4)}`;
}

export function randomId(prefix: string) {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${n}`;
}

export function availabilityLabel(availability: string) {
  if (availability === "AVAILABLE_AT_BLAZE") return "Available at Blaze";
  if (availability === "LIMITED") return "Limited availability";
  return "Coming soon";
}

export function collectionLabel(id: string) {
  const labels: Record<string, string> = {
    "blaze-essentials": "Blaze Essentials",
    statement: "The Statement Collection",
    "modern-classics": "Modern Classics",
    "studio-edit": "The Studio Edit",
  };
  return labels[id] ?? id;
}

export function titleCase(value: string) {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
