const stats = [
  { value: "1500+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "120+", label: "Expert Agents" },
  { value: "25", label: "Years Experience" },
];

function Stats() {
  return (
    <section className="stats-section" aria-label="Company statistics">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}

export default Stats;
