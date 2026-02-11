'use client';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';

const FEATURES = [
  { title: 'Summarize', description: 'Quickly extract the essentials from long notes.' },
  { title: 'Generate Questions', description: 'Create practice questions to check your understanding.' },
  { title: 'Study Suggestions', description: 'Get actionable tips tailored to your topic.' },
  { title: 'Secure by Design', description: 'Your notes stay private — we only use them to generate results for you.' },
];

export default function Home() {
  const router = useRouter();
  const navigateToAuth = () => router.push('/auth');

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <HeaderNav onLoginClick={navigateToAuth} />

      <main className="max-w-5xl mx-auto px-6 py-24">
        <HeroSection onGetStartedClick={navigateToAuth} />
        <FeaturesGrid features={FEATURES} />
      </main>
    </div>
  );
}

function HeaderNav({ onLoginClick }) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Brain className="text-blue-600" size={28} />
          <h1 className="text-xl font-semibold">AI Study Helper</h1>
        </div>
        <button 
          onClick={onLoginClick}
          className="text-sm border bg-blue-500 border-gray-200 px-3 py-1 rounded-md text-gray-800 hover:bg-green-500 transition"
        >
          Login
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ onGetStartedClick }) {
  return (
    <section className="text-center">
      <h2 className="text-4xl font-bold mb-4">Study smarter — not harder</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Turn your notes into concise summaries and study plans. Simple, fast, and privacy-conscious.
      </p>
      <div className="mt-8">
        <button 
          onClick={onGetStartedClick}
          className="bg-black hover:bg-orange-500  text-white px-6 py-3 rounded-md font-medium hover:opacity-95 transition animate-bounce"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function FeaturesGrid({ features }) {
  return (
    <section className="mt-16 grid md:grid-cols-2 gap-6">
      {features.map((feature) => (
        <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
      ))}
    </section>
  );
}
