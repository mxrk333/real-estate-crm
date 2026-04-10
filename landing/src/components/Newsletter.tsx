function Newsletter() {
  return (
    <section id="contact" className="newsletter-section">
      <div className="newsletter-glow-1" />
      <div className="newsletter-glow-2" />
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <h2>Stay Updated on New Listings</h2>
          <p>
            Join our newsletter to get the latest property updates, market
            trends, and exclusive offers delivered straight to your inbox.
          </p>
        </div>
        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="newsletter-input"
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
          />
          <button className="btn btn-orange btn-lg" type="submit">
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
