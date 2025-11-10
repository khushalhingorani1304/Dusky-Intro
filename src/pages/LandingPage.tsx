import React from 'react';
import { Link } from 'react-router-dom';

const heroCards = [
  {
    title: 'The art of Botany',
    description: 'Generate stunning visuals and layouts with a single prompt.',
    gradient: 'from-purple-500 via-purple-400 to-blue-300',
  },
  {
    title: 'Improve writing',
    description: 'Transform rough notes into polished copy instantly.',
    gradient: 'from-blue-500 via-sky-400 to-indigo-400',
  },
  {
    title: 'Pitch Ready',
    description: 'Craft persuasive presentations that win over every audience.',
    gradient: 'from-purple-600 via-fuchsia-400 to-rose-400',
  },
];

const featureSections = [
  {
    eyebrow: 'Create',
    title: 'Ideas to execution in minutes',
    copy: 'Dusky turns your thoughts into beautiful canvases, docs, and decks. Generate structure, visuals, and copy in a single flow.',
    bullets: ['AI-assisted layouts', 'Smart theming', 'Instant image suggestions'],
  },
  {
    eyebrow: 'Collaborate',
    title: 'Designed for teams that move fast',
    copy: 'Comment, edit, and present without exporting a single slide. Bring product, design, and marketing together in one space.',
    bullets: ['Real-time edits', 'Shared brand styles', 'One-click sharing'],
  },
  {
    eyebrow: 'Publish',
    title: 'Share anywhere, seamlessly',
    copy: 'Deliver polished content whether you’re presenting live, embedding on the web, or sending a link. Dusky adapts to your workflow.',
    bullets: ['Presenter mode', 'Responsive pages', 'Analytics ready'],
  },
];

const testimonialLogos = ['Notion', 'Figma', 'Linear', 'Canva', 'Adobe'];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dusky-flow text-gray-900">
      <header className="border-b border-purple-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-black tracking-tight text-purple-700">Dusky</span>
            <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
              <a href="#solutions" className="hover:text-purple-600">Solutions</a>
              <a href="#features" className="hover:text-purple-600">Features</a>
              <a href="#pricing" className="hover:text-purple-600">Pricing</a>
              <a href="#stories" className="hover:text-purple-600">Customers</a>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/admin" className="hidden rounded-lg border border-purple-200 px-3 py-1.5 text-purple-600 hover:bg-purple-50 md:block">
              Admin
            </Link>
            <Link to="/signup" className="rounded-full bg-purple-600 px-4 py-2 text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700">
              Start for free
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto flex max-w-6xl flex-col items-start gap-12 px-6 py-16 md:flex-row md:items-center">
          <div className="w-full max-w-xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Introducing Dusky AI</p>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              Effortless AI design for presentations, websites, and more
            </h1>
            <p className="text-lg text-gray-600">
              Your ideas are brilliant. Dusky makes them shine. Generate polished canvases for decks, docs, marketing sites, and anything else in minutes – all with your brand style baked in.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
              >
                Start for free
              </Link>
              <a
                href="#features"
                className="flex items-center justify-center rounded-full border border-purple-200 px-6 py-3 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
              >
                Watch demo
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wide text-gray-400">
              {testimonialLogos.map((logo) => (
                <span key={logo} className="rounded-full border border-gray-200 px-3 py-1">
                  {logo}
                </span>
              ))}
            </div>
          </div>

          <div className="grid w-full max-w-xl gap-4 md:grid-cols-2">
            {heroCards.map((card) => (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-30" />
                <div className="relative flex h-full flex-col justify-between space-y-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-semibold">
                    AI
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{card.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>Generate</span>
                    <span>•</span>
                    <span>Design</span>
                    <span>•</span>
                    <span>Share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="bg-white py-16">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3">
            {featureSections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-purple-100 bg-purple-50/40 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-bold text-gray-900">{section.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{section.copy}</p>
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="solutions" className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 py-20 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Templates</p>
            <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Ready-to-run canvases for every team
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
              From product launches to investor updates, Dusky offers curated starting points that you can adapt in seconds. Customize the tone, structure, imagery, and layout with a single prompt.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {['Product launch', 'Sales playbook', 'Investor update'].map((template) => (
                <div
                  key={template}
                  className="rounded-3xl bg-white/10 p-6 text-left shadow-lg shadow-purple-900/20 backdrop-blur transition hover:bg-white/15"
                >
                  <h4 className="text-lg font-semibold">{template}</h4>
                  <p className="mt-3 text-sm text-white/70">
                    Generate a complete storyline, visuals, and speaker notes tailored to your brand voice.
                  </p>
                  <button className="mt-4 text-sm font-semibold text-white/90 hover:text-white">Use this →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="bg-white py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">“Dusky lets our teams present ideas faster than ever.”</h3>
              <p className="mt-4 text-sm text-gray-600">
                “Before Dusky we spent hours cobbling together slides and layouts. Now we generate beautiful canvases in minutes and focus on the story we’re telling.”
              </p>
              <div className="mt-6 text-xs uppercase tracking-wide text-gray-400">
                — Maya Patel, VP Product Marketing
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">“Our founders love the speed.”</h3>
              <p className="mt-4 text-sm text-gray-600">
                “Investor updates, board reports, launch plans — it’s all handled in Dusky now. The consistency and polish are game changing.”
              </p>
              <div className="mt-6 text-xs uppercase tracking-wide text-gray-400">
                — Richard Gomez, COO
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t border-purple-100 bg-purple-50 py-16">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h3 className="text-3xl font-black text-gray-900">Plans for every team</h3>
            <p className="mt-3 text-sm text-gray-600">
              Start for free. Upgrade when you need more collaboration, publishing, or analytics.
            </p>
            <div className="mt-10 flex flex-col gap-6 md:flex-row">
              {[
                { name: 'Starter', price: 'Free', description: 'Create unlimited canvases with core AI features.' },
                { name: 'Pro', price: '$16', description: 'Unlock team collaboration and custom branding.' },
                { name: 'Scale', price: 'Let’s talk', description: 'Enterprise governance, SSO, and advanced analytics.' },
              ].map((plan) => (
                <div key={plan.name} className="flex-1 rounded-3xl border border-purple-200 bg-white p-6 text-left shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">{plan.name}</p>
                  <div className="mt-2 text-3xl font-bold text-gray-900">{plan.price}</div>
                  <p className="mt-3 text-sm text-gray-600">{plan.description}</p>
                  <button className="mt-6 w-full rounded-full border border-purple-200 px-4 py-3 text-sm font-semibold text-purple-600 transition hover:bg-purple-50">
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-purple-100 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 text-sm text-gray-500 md:flex-row">
          <div>
            <span className="text-lg font-black text-purple-700">Dusky</span>
            <p className="mt-2 max-w-sm">
              AI-first canvases for presentations, docs, and anything your team imagines.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800">Product</h4>
              <a href="#features" className="block hover:text-purple-600">Features</a>
              <a href="#pricing" className="block hover:text-purple-600">Pricing</a>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800">Company</h4>
              <a href="#stories" className="block hover:text-purple-600">Customers</a>
              <a href="/signup" className="block hover:text-purple-600">Start free</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
