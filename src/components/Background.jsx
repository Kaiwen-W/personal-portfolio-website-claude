/* Fixed atmospheric background: three slowly drifting colour blobs
   and a faint grain overlay. Sits behind all page content. */
export default function Background() {
  return (
    <>
      <div
        className="arc-blob"
        style={{ width: 380, height: 380, top: -130, left: -150, background: "#FF3F5C", opacity: 0.26, animation: "arcDrift1 19s ease-in-out infinite" }}
      />
      <div
        className="arc-blob"
        style={{ width: 440, height: 440, top: "34%", right: -200, background: "#3142F0", opacity: 0.24, animation: "arcDrift2 23s ease-in-out infinite" }}
      />
      <div
        className="arc-blob"
        style={{ width: 360, height: 360, bottom: -150, left: "22%", background: "#5B3BF0", opacity: 0.28, animation: "arcDrift3 21s ease-in-out infinite" }}
      />
      <div className="arc-noise" />
    </>
  );
}
