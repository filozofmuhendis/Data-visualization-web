export default function HomePage() {
  return (
    <section>
      <h1>MSA Dashboard</h1>
      <p>Qt arayüzünün statik Next.js versiyonu.</p>
      <ul className="grid">
        <li className="card"><a href="/login">Login</a></li>
        <li className="card"><a href="/analyst">Analyst Dashboard</a></li>
        <li className="card"><a href="/commander">Commander Dashboard</a></li>
        <li className="card"><a href="/health">Health Dashboard</a></li>
      </ul>
    </section>
  );
}