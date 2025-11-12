import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { WelcomeScreen } from './screens/WelcomeScreen';
import IntentSelectionScreen from './screens/IntentSelectionScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import EducationRoleSelectionScreen from './screens/EducationRoleSelectionScreen';
import EducatorDetailSelectionScreen from './screens/EducatorDetailSelectionScreen';
import StudentDetailSelectionScreen from './screens/StudentDetailSelectionScreen';
import TeamSizeScreen from './screens/TeamSizeScreen';
import GoalsSelectionScreen from './screens/GoalsSelectionScreen';
import ReferralSelectionScreen from './screens/ReferralSelectionScreen';
import { CompanySelectionScreen } from './screens/CompanySelectionScreen';
import { NameInputScreen } from './screens/NameInputScreen';
import { ChallengeSelectionScreen } from './screens/ChallengeSelectionScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { useOnboardingConfig } from './context/OnboardingConfigContext';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

type Step =
  | 'welcome'
  | 'intent'
  | 'companyEarly'
  | 'teamPrimaryRole'
  | 'teamSize'
  | 'educationRole'
  | 'educatorDetail'
  | 'studentDetail'
  | 'goals'
  | 'referral'
  | 'name'
  | 'challenge'
  | 'loading';

const AnimatedStep = ({ step, children }: { step: Step; children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [step]);

  return (
    <div ref={containerRef} key={step}>
      {children}
    </div>
  );
};

const OnboardingFlow = () => {
  const { config } = useOnboardingConfig();
  const [step, setStep] = useState<Step>('welcome');
  const [intent, setIntent] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState<string | null>(null);
  const [teamSizeBackStep, setTeamSizeBackStep] = useState<Step>('teamPrimaryRole');
  const [educationRoleChoice, setEducationRoleChoice] = useState<string | null>(null);
  const [educatorType, setEducatorType] = useState<string | null>(null);
  const [studentType, setStudentType] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [referrals, setReferrals] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [companyCompletedEarly, setCompanyCompletedEarly] = useState(false);

  useEffect(() => {
    if (step === 'companyEarly' && intent !== 'work') {
      setCompanyCompletedEarly(false);
      if (intent === 'education') {
        setStep('educationRole');
      } else if (intent) {
        setStep('teamPrimaryRole');
      }
    }
  }, [step, intent]);

  const PROGRESS_TOTAL = 9;
  const isEducatorFlow = intent === 'education' && educationRoleChoice === 'educator';

  const handleComplete = () => {
    console.log('Onboarding complete!', {
      intent,
      company,
      teamSize,
      educationRole: educationRoleChoice,
      educatorType,
      studentType,
      goals,
      referrals,
      name,
      challenges,
    });
    alert('Onboarding complete! Check console for collected data.');
  };

  const challengeTitle = config.challenge.title.includes('{name}')
    ? config.challenge.title.replace('{name}', name || 'your')
    : config.challenge.title;

  const renderStep = () => {
    const companyEarlyProgress = 3;
    const teamSizeProgress = isEducatorFlow ? 5 : 4;
    const goalsProgress =
      intent === 'education' ? (isEducatorFlow ? 6 : 5) : 5;
    const referralProgress =
      intent === 'education' ? (isEducatorFlow ? 7 : 6) : 6;
    const challengeProgress = referralProgress + 1;

    switch (step) {
      case 'welcome':
        return (
          <WelcomeScreen
            onNext={() => setStep('name')}
            greeting={config.welcome.greeting}
            subheading={config.welcome.subheading}
            whatsNextTitle={config.welcome.whatsNextTitle}
            whatsNextDescription={config.welcome.whatsNextDescription}
            features={config.welcome.features}
          />
        );
      case 'intent':
        return (
          <IntentSelectionScreen
            onSelect={(value) => setIntent(value)}
            onNext={(selected) => {
              if (selected) {
                setIntent(selected);
                if (selected === 'education') {
                setCompanyCompletedEarly(false);
                setCompany(null);
                  setStep('educationRole');
                } else if (selected === 'work') {
                  setCompanyCompletedEarly(false);
                  setCompany(null);
                  setStep('companyEarly');
                } else {
                  setCompanyCompletedEarly(false);
                  setCompany(null);
                  setStep('teamPrimaryRole');
                }
              }
            }}
            progressActive={2}
            progressTotal={PROGRESS_TOTAL}
            userName={name}
          />
        );
      case 'companyEarly':
        return (
          <CompanySelectionScreen
            title={config.company.title}
            subtitle={config.company.subtitle}
            options={config.company.options}
            selectedOption={company}
            onSelect={(value) => setCompany(value)}
            onBack={() => {
              setCompanyCompletedEarly(false);
              setCompany(null);
              setStep('intent');
            }}
            onNext={() => {
              if (company) {
                setCompanyCompletedEarly(true);
                setStep('teamPrimaryRole');
              }
            }}
            progressActive={companyEarlyProgress}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'teamPrimaryRole':
        return (
          <RoleSelectionScreen
            title="Which of the following best describes your role?"
            subtitle="We’ll tailor Dusky to the kind of work you do."
            options={[
              {
                id: 'marketing',
                label: 'Marketing',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <defs>
                      <linearGradient id="megaphoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFA65B" />
                        <stop offset="100%" stopColor="#FF6B2C" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M14 26l26-12v36L14 38V26Z"
                      fill="url(#megaphoneGradient)"
                      stroke="#F06D2F"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 19l10-5v32l-10-5"
                      stroke="#FF8E3F"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M18 40l4 8"
                      stroke="#FF934D"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                ),
              },
              {
                id: 'creator',
                label: 'Creator',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <defs>
                      <linearGradient id="paletteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF8BA7" />
                        <stop offset="100%" stopColor="#FF6F61" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M32 10c11.6 0 21 7.8 21 17.5 0 6.2-4 8.5-8 8.5-3.2 0-5 1.8-5 4.5 0 3 2.5 5.5 5.5 5.5-3.8 5.1-9.6 8-15.5 8C18.9 54 11 46.3 11 36.5S20.4 10 32 10Z"
                      fill="url(#paletteGradient)"
                    />
                    <circle cx="24" cy="26" r="3" fill="#FFE28A" />
                    <circle cx="32" cy="22" r="3" fill="#9AD6FF" />
                    <circle cx="40" cy="26" r="3" fill="#C3F4A6" />
                  </svg>
                ),
              },
              {
                id: 'consultant',
                label: 'Consultant',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <defs>
                      <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F5D76E" />
                        <stop offset="100%" stopColor="#F0A92C" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 24L32 6l20 18-8 26H20l-8-26Z"
                      fill="url(#gemGradient)"
                      stroke="#E59B1F"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M32 6v44"
                      stroke="#FBE098"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                    <path
                      d="M12 24h40"
                      stroke="#FBE098"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                ),
              },
              {
                id: 'sales',
                label: 'Sales service',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <defs>
                      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF7BA6" />
                        <stop offset="100%" stopColor="#FF4182" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 12h8l4 10-8 6a24 24 0 0010 10l6-8 10 4v8c0 4-3 7-7 7-20.5 0-37-16.5-37-37 0-4 3-7 7-7Z"
                      fill="url(#phoneGradient)"
                      stroke="#EC3C7C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                id: 'ops',
                label: 'Ops and Finance',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <rect x="16" y="24" width="8" height="24" rx="3" fill="#FF7FAA" />
                    <rect x="28" y="18" width="8" height="30" rx="3" fill="#55C8FF" />
                    <rect x="40" y="30" width="8" height="18" rx="3" fill="#6EE7B7" />
                    <path
                      d="M18 22l12-8 12 6 6-8"
                      stroke="#7E7BFF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.7"
                    />
                  </svg>
                ),
              },
              {
                id: 'leadership',
                label: 'Leadership',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <defs>
                      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE27A" />
                        <stop offset="100%" stopColor="#FFC233" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M32 8l6.8 13.7 15.2 2.2-11 10.7 2.6 15.4L32 43.6 18.4 50l2.6-15.4-11-10.7 15.2-2.2L32 8Z"
                      fill="url(#starGradient)"
                      stroke="#E6B12E"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                id: 'engineering',
                label: 'Engineering or Data',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <defs>
                      <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7CADEB" />
                        <stop offset="100%" stopColor="#2D63E6" />
                      </linearGradient>
                    </defs>
                    <rect x="12" y="16" width="40" height="28" rx="6" fill="url(#monitorGradient)" />
                    <rect x="18" y="22" width="28" height="16" rx="4" fill="#E3EEFF" opacity="0.9" />
                    <rect x="26" y="44" width="12" height="6" rx="2" fill="#2B58D1" opacity="0.7" />
                    <rect x="24" y="48" width="16" height="4" rx="2" fill="#274CB5" opacity="0.6" />
                  </svg>
                ),
              },
              {
                id: 'more',
                label: 'Others',
                icon: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
                    <circle cx="22" cy="32" r="5" fill="#9CA3AF" />
                    <circle cx="32" cy="32" r="5" fill="#9CA3AF" />
                    <circle cx="42" cy="32" r="5" fill="#9CA3AF" />
                  </svg>
                ),
              },
            ]}
            onBack={() => {
              if (intent === 'work') {
                setCompanyCompletedEarly(true);
              }
              setStep('intent');
            }}
            onNext={(roleId) => {
              if (roleId) {
                setTeamSize(null);
                setTeamSizeBackStep('teamPrimaryRole');
                setStep('teamSize');
              }
            }}
            progressActive={3}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'teamSize':
        return (
          <TeamSizeScreen
            onBack={() => setStep(teamSizeBackStep)}
            onNext={(selectedSize) => {
              if (selectedSize) {
                setTeamSize(selectedSize);
                setStep('goals');
              }
            }}
            progressActive={teamSizeProgress}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'educationRole':
        return (
          <EducationRoleSelectionScreen
            title="Which of the following best describes you?"
            options={[
              { id: 'educator', label: 'Educator', icon: '🧑‍🏫' },
              { id: 'student', label: 'Student', icon: '🚌' },
            ]}
            onBack={() => setStep('intent')}
            onNext={(roleId) => {
              if (roleId) {
                setEducationRoleChoice(roleId);
                if (roleId === 'educator') {
                  setStep('educatorDetail');
                } else {
                  setStep('studentDetail');
                }
              }
            }}
            progressActive={2}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'educatorDetail':
        return (
          <EducatorDetailSelectionScreen
            title="Which of the following best describes you?"
            options={[
              { id: 'elementary-teacher', label: 'Elementary or secondary school teacher', icon: '🍎' },
              { id: 'university-teacher', label: 'University or postsecondary teacher', icon: '📚' },
              { id: 'course-instructor', label: 'Course or masterclass instructor', icon: '☕' },
            ]}
            onBack={() => setStep('educationRole')}
            onNext={(detailId) => {
              if (detailId) {
                setEducatorType(detailId);
                setTeamSize(null);
                setTeamSizeBackStep('educatorDetail');
                setStep('teamSize');
              }
            }}
            progressActive={3}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'studentDetail':
        return (
          <StudentDetailSelectionScreen
            title="What type of student are you?"
            options={[
              { id: 'high-school', label: 'High school', icon: '🌱' },
              { id: 'undergraduate', label: 'Undergraduate', icon: '🌿' },
              { id: 'graduate', label: 'Graduate', icon: '🌳' },
              { id: 'professional', label: 'Professional training program', icon: '🌲' },
            ]}
            onBack={() => setStep('educationRole')}
            onNext={(detailId) => {
              if (detailId) {
                setStudentType(detailId);
                setStep('goals');
              }
            }}
            progressActive={3}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'goals':
        return (
          <GoalsSelectionScreen
            selectedGoals={goals}
            onToggle={(goalId) =>
              setGoals((prev) =>
                prev.includes(goalId) ? prev.filter((item) => item !== goalId) : [...prev, goalId]
              )
            }
            onBack={() => {
              if (intent === 'education') {
                if (educationRoleChoice === 'educator') {
                  setStep('teamSize');
                } else {
                  setStep('studentDetail');
                }
              } else {
                setStep('teamSize');
              }
            }}
            onNext={(selected) => {
              if (selected.length > 0) {
                setGoals(selected);
                setStep('referral');
              }
            }}
            progressActive={goalsProgress}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'referral':
        return (
          <ReferralSelectionScreen
            selectedReferrals={referrals}
            onToggle={(referralId) =>
              setReferrals((prev) =>
                prev.includes(referralId)
                  ? prev.filter((item) => item !== referralId)
                  : [...prev, referralId]
              )
            }
            onBack={() => setStep('goals')}
            onNext={(selected) => {
              setReferrals(selected);
              setStep('challenge');
            }}
            progressActive={referralProgress}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'name':
        return (
          <NameInputScreen
            onNext={(userName) => {
              setName(userName);
              setStep('intent');
            }}
            progressActive={1}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'challenge':
        return (
          <ChallengeSelectionScreen
            title={challengeTitle}
            subtitle={config.challenge.subtitle}
            options={config.challenge.options}
            maxSelections={config.challenge.maxSelections}
            onNext={(selectedChallenges) => {
              setChallenges(selectedChallenges);
              setStep('loading');
            }}
            progressActive={challengeProgress}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      case 'loading':
        return (
          <LoadingScreen
            onComplete={handleComplete}
            progressActive={PROGRESS_TOTAL}
            progressTotal={PROGRESS_TOTAL}
          />
        );
      default:
        return null;
    }
  };

  return <AnimatedStep step={step}>{renderStep()}</AnimatedStep>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

