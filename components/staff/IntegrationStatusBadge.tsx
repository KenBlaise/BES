export function IntegrationStatusBadge({
  label,
  connected,
}: {
  label: string;
  connected: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2 py-1 text-[11px] tracking-wide ${
        connected ? "border-ink" : "border-charcoal/20 text-stone"
      }`}
    >
      {label} {connected ? "Connected" : "Not connected"}
    </span>
  );
}
