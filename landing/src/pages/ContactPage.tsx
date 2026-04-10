import { useState } from "react";

const contactInfo = [
  {
    icon: "location_on",
    title: "Visit Our Office",
    lines: ["100 Luxury Blvd, Suite 500", "Beverly Hills, CA 90210"],
  },
  {
    icon: "call",
    title: "Call Us",
    lines: ["(310) 555-ELITE", "Mon – Fri, 9am – 7pm PST"],
  },
  {
    icon: "mail",
    title: "Email Us",
    lines: ["hello@eliteestate.com", "We respond within 24 hours"],
  },
  {
    icon: "schedule",
    title: "Office Hours",
    lines: ["Monday – Friday: 9AM – 7PM", "Saturday: 10AM – 4PM"],
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyInterest: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      propertyInterest: "",
    });
  };

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="relative w-full px-6 md:px-10 py-8 max-w-7xl mx-auto">
        <div className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/50 z-10" />
            <img
              alt="Contact Us"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIx2paer5R7yPM5uK0DHKHp3NDazn1iK584mV-5Z8lw9zwkwO7N4UO-r8oqFku982U7hCL_Z0xYrFVtKRJq3apvxgtgI8XvnKRwv23Tt8OH8f7lCWAcZGOE3eU1JDLjW7qqUG7u4LiN8_x6MLqufQ2pUbTljtQR1Wh4NVs4FVA8NpiXgHNk-bvBA_rEKlbkW8RLl7s6-i9ailhhJARm8jZnKe6kgKsgWZjbZPpI5wlKmtXqDH2PB2NrH7FYPPdwAJAQt12PgYMtGc"
            />
          </div>
          <div className="relative z-20 text-center px-8 max-w-3xl animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              Get In Touch
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Whether you're looking to buy, sell, or invest — our team is ready
              to provide the guidance you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all hover:-translate-y-2 text-center animate-fade-in-up"
            >
              <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-navy-dark dark:text-white text-lg font-bold mb-3">
                {item.title}
              </h3>
              {item.lines.map((line) => (
                <p
                  key={line}
                  className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 lg:p-12 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
              Send Us a Message
            </h3>
            <h2 className="text-navy-dark dark:text-white text-3xl md:text-4xl font-black leading-tight mb-8">
              How Can We Help?
            </h2>

            {isSubmitted && (
              <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3 animate-slide-down">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <p className="text-navy-dark dark:text-white font-medium text-sm">
                  Thank you! Your message has been sent. We'll get back to you
                  within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy-dark dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-dark dark:text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy-dark dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(310) 555-1234"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-dark dark:text-white mb-2">
                    I'm Interested In
                  </label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  >
                    <option value="">Select an option</option>
                    <option value="buying">Buying a Property</option>
                    <option value="selling">Selling a Property</option>
                    <option value="renting">Renting a Property</option>
                    <option value="investment">Investment Advisory</option>
                    <option value="management">Property Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark dark:text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your real estate needs..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-navy-dark px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">send</span>
                Send Message
              </button>
            </form>
          </div>

          {/* Map / Info Side */}
          <div className="flex flex-col gap-8">
            {/* Map placeholder with image */}
            <div className="rounded-3xl overflow-hidden h-80 lg:h-96 shadow-xl">
              <img
                alt="Office Location Map"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIx2paer5R7yPM5uK0DHKHp3NDazn1iK584mV-5Z8lw9zwkwO7N4UO-r8oqFku982U7hCL_Z0xYrFVtKRJq3apvxgtgI8XvnKRwv23Tt8OH8f7lCWAcZGOE3eU1JDLjW7qqUG7u4LiN8_x6MLqufQ2pUbTljtQR1Wh4NVs4FVA8NpiXgHNk-bvBA_rEKlbkW8RLl7s6-i9ailhhJARm8jZnKe6kgKsgWZjbZPpI5wlKmtXqDH2PB2NrH7FYPPdwAJAQt12PgYMtGc"
              />
            </div>

            {/* FAQ */}
            <div className="bg-navy-dark rounded-3xl p-10 flex-1">
              <h3 className="text-white text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {[
                  {
                    q: "What areas do you serve?",
                    a: "We specialize in luxury properties across Beverly Hills, Malibu, Manhattan, Miami, Aspen, and other premium markets nationwide.",
                  },
                  {
                    q: "How quickly can I schedule a viewing?",
                    a: "Private viewings can typically be arranged within 24-48 hours. Contact us for same-day availability on select properties.",
                  },
                  {
                    q: "Do you handle international buyers?",
                    a: "Absolutely. We have extensive experience working with international clients and can guide you through the entire US purchasing process.",
                  },
                ].map((faq) => (
                  <div
                    key={faq.q}
                    className="border-b border-slate-700 pb-5 last:border-0 last:pb-0"
                  >
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">
                        help
                      </span>
                      {faq.q}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-[2.5rem] p-12 lg:p-16 text-center">
          <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl">
              support_agent
            </span>
          </div>
          <h2 className="text-navy-dark dark:text-white text-3xl md:text-4xl font-black leading-tight mb-4">
            Prefer to Speak Directly?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Call our dedicated team for an immediate consultation. Available
            Monday through Friday, 9AM – 7PM PST.
          </p>
          <a
            href="tel:+13105551234"
            className="inline-flex items-center gap-2 bg-navy-dark text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined">call</span>
            (310) 555-ELITE
          </a>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
