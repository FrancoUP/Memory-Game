export function MobileMenuOverlay({ overlay, children }) {
  return (
    <div
      className="overlay"
      style={
        overlay
          ? { backgroundColor: "rgba(0,0,0,0.5)", zIndex: "1" }
          : { opacity: "0", zIndex: "0" }
      }
    >
      {children}
    </div>
  );
}
