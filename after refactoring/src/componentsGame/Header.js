export function Header({ children }) {
  return (
    <div className="header">
      <div className="title-box">
        <p className="title-game">memory</p>
      </div>
      <div className="container-buttons">{children}</div>
    </div>
  );
}
