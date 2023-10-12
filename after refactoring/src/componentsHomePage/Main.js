export function Main({ children }) {
  return (
    <main className="main">
      <p className="title-memory">memory</p>
      <div className="box-main">{children}</div>
    </main>
  );
}
