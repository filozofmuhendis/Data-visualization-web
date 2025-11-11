type Props = {
  title: string;
  value: string | number;
  trendLabel?: string;
};

export default function StatCard({ title, value, trendLabel }: Props) {
  return (
    <div className="card" style={{ display: "grid", gap: 6 }}>
      <div className="muted" style={{ fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
      {trendLabel && <div className="chip" style={{ width: "fit-content" }}>{trendLabel}</div>}
    </div>
  );
}