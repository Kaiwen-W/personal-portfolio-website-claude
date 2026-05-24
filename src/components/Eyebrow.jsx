/* The numbered label that heads each section (e.g. "01 / Experience"). */
export default function Eyebrow({ num, label, accent }) {
  return (
    <div className="arc-eyebrow">
      <span className="arc-eyebrow-num arc-mono" style={{ color: accent }}>
        {num}
      </span>
      <span className="arc-eyebrow-label">{label}</span>
      <span className="arc-eyebrow-rule" />
    </div>
  );
}
