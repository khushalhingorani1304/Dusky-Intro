import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type MoodboardCard = {
  title: string;
  subtitle?: string;
  image: string;
  rotation: number;
};

type MoodboardColumn = {
  id: string;
  left: string;
  width: string;
  direction: 'up' | 'down';
  speed: number;
  startOffset: string;
  cards: MoodboardCard[];
};

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const columns = useMemo<MoodboardColumn[]>(
    () => [
      {
        id: 'column-a',
        left: '6%',
        width: '240px',
        direction: 'up',
        speed: 80,
        startOffset: '-40%',
        cards: [
          {
            title: 'FLOW',
            subtitle: 'night journal',
            image:
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
            rotation: 2.1,
          },
          {
            title: 'VISION',
            subtitle: 'creative review',
            image:
              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
            rotation: -1.3,
          },
          {
            title: 'LAUNCH KIT',
            subtitle: 'campaign prep',
            image:
              'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
            rotation: 0.8,
          },
        ],
      },
      {
        id: 'column-b',
        left: '36%',
        width: '230px',
        direction: 'down',
        speed: 70,
        startOffset: '-50%',
        cards: [
          {
            title: 'STRATEGY',
            subtitle: 'pitch review',
            image:
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
            rotation: -2.2,
          },
          {
            title: 'MOODBOARD',
            subtitle: 'editorial set',
            image:
              'https://images.unsplash.com/photo-1477506252414-b2954dbdacf0?auto=format&fit=crop&w=900&q=80',
            rotation: 1.7,
          },
          {
            title: 'SOUNDWAVE',
            subtitle: 'podcast edit',
            image:
              'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
            rotation: -0.9,
          },
        ],
      },
      {
        id: 'column-c',
        left: '66%',
        width: '240px',
        direction: 'up',
        speed: 90,
        startOffset: '-60%',
        cards: [
          {
            title: 'WEBINAR',
            subtitle: 'live session',
            image:
              'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=900&q=80',
            rotation: 1.3,
          },
          {
            title: 'DUSKY LAB',
            subtitle: 'case study',
            image:
              'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
            rotation: -1.9,
          },
          {
            title: 'INSIGHT',
            subtitle: 'trend report',
            image:
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
            rotation: 0.6,
          },
        ],
      },
    ],
    []
  );

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="relative flex min-h-screen bg-dusky-flow">
      <style>{`
        @keyframes signinScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        @keyframes signinScrollUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      <div className="relative z-10 flex w-full max-w-xl flex-col justify-between bg-gradient-to-b from-white via-white to-[#f4f7fb] px-12 py-14 text-gray-900 shadow-[40px_0_120px_rgba(0,0,0,0.25)]">
        <header className="flex items-center justify-between text-sm text-gray-500">
          <Link to="/" className="font-semibold text-[#5d5afe] transition hover:text-[#4441ff]">
            ← Back to Dusky
          </Link>
          <button className="rounded-full border border-transparent px-3 py-1 transition hover:border-gray-300 hover:text-gray-900">
            English
          </button>
        </header>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-600">Welcome back! Continue where you left off.</p>
          </div>

          <button
            onClick={() => navigate('/onboarding')}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-[#5d5afe] hover:text-[#5d5afe]"
            type="button"
          >
            <span className="text-lg">🟦</span>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            <div className="h-px flex-1 bg-gray-200" />
            <span>OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (email.trim() && password.trim()) {
                navigate('/onboarding');
              }
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition focus:border-[#5d5afe] focus:outline-none focus:ring-2 focus:ring-[#5d5afe]/30"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link
                  to="#"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5afe] transition hover:text-[#4441ff]"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition focus:border-[#5d5afe] focus:outline-none focus:ring-2 focus:ring-[#5d5afe]/30"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#111111] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#5d5afe]/20 transition hover:bg-[#1f1f1f]"
            >
              Sign in
            </button>
          </form>

          <div className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#5d5afe] transition hover:text-[#4441ff]">
              Sign up
            </Link>
          </div>

          <div className="text-xs text-gray-400">
            By continuing you agree to Dusky&apos;s{' '}
            <a href="#" className="underline transition hover:text-[#5d5afe]">Terms of Service</a> and{' '}
            <a href="#" className="underline transition hover:text-[#5d5afe]">Privacy Policy</a>.
          </div>
        </div>

        <footer className="text-xs font-medium tracking-[0.3em] text-gray-500">
          © {year} DUSKY LABS
        </footer>
      </div>

      <div className="relative hidden flex-1 overflow-hidden md:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-[#161616] via-[#101010] to-[#1f1f1f]" />

        {columns.map((column) => (
          <div
            key={column.id}
            className="pointer-events-none absolute flex h-[160%] flex-col overflow-hidden"
            style={{ left: column.left, top: column.startOffset, width: column.width }}
          >
            <div
              className="flex flex-col gap-8"
              style={{
                animation: `${column.direction === 'down' ? 'signinScrollDown' : 'signinScrollUp'} ${
                  column.speed
                }s linear infinite`,
              }}
            >
              {[...column.cards, ...column.cards].map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
                  style={{
                    transform: `rotate(${card.rotation}deg)`,
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-72 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                      {card.subtitle}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold uppercase tracking-wide text-white drop-shadow-lg">
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SigninPage;
