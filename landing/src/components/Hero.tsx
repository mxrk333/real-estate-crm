function Hero() {
  const heroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB4tnnqj-X392175F_EJsS7xnOJgSARASszv2AmLm1tWLEI0fpA536YMeXT7DeoMI_WdtFGrwcaVKUKs9-rvxffrLqq8OcSum4bkYo5KdV0IlUC5wr_7t-dkpaE-lGwS8mWQsRxhWPXKLoyeYh-slF6xctdCeVvrDuUEzVEF12W_FBeJDtWNfcnElwKo9E48cBeYUNrbFuigdE_4aWZ8pmZpnawjdQe0jO8FjG5Ndg7WSuRT8g9ci_mMSno1-oziAttSsNCHa47AOM";

  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url("${heroImage}")` }}
      >
        <div className="hero-content">
          <h1>Your Journey to a Perfect Home Starts Here</h1>
          <p>
            Discover the finest properties and expert real estate services
            tailored just for you. We simplify your search for the ideal living
            space.
          </p>
          <div className="hero-actions">
            <button className="btn btn-orange btn-lg">View Properties</button>
            <button className="btn btn-secondary btn-lg">About Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
