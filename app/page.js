'use client';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';

const FEATURES = [
  { title: 'Summarize', description: 'Quickly extract the essentials from long notes.' },
  { title: 'Generate Questions', description: 'Create practice questions to check your understanding.' },
  { title: 'Study Suggestions', description: 'Get actionable tips tailored to your topic.' },
  { title: 'Secure by Design', description: 'Your notes stay private — we only use them to generate results for you.' },
];

<<<<<<< HEAD
const animationStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-slide-down {
    animation: slideDown 0.6s ease-out;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.5s ease-out;
  }

  .stagger-1 {
    animation-delay: 0.1s;
  }

  .stagger-2 {
    animation-delay: 0.2s;
  }

  .stagger-3 {
    animation-delay: 0.3s;
  }

  .stagger-4 {
    animation-delay: 0.4s;
  }
`;

=======
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
export default function Home() {
  const router = useRouter();
  const navigateToAuth = () => router.push('/auth');

  return (
    <div className="min-h-screen bg-gray-50 text-black">
<<<<<<< HEAD
      <style>{animationStyles}</style>
=======
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
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
<<<<<<< HEAD
    <nav className="bg-white border-b animate-slide-down">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 animate-slide-in-right">
=======
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
          <Brain className="text-blue-600" size={28} />
          <h1 className="text-xl font-semibold">AI Study Helper</h1>
        </div>
        <button 
          onClick={onLoginClick}
<<<<<<< HEAD
          className="text-sm border bg-blue-500 border-gray-200 px-3 py-1 rounded-md text-gray-800 hover:bg-green-500 hover:scale-105 transition transform"
=======
          className="text-sm border bg-blue-500 border-gray-200 px-3 py-1 rounded-md text-gray-800 hover:bg-green-500 transition"
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
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
<<<<<<< HEAD
      <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">Study smarter — not harder</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up stagger-1">
        Turn your notes into concise summaries and study plans. Simple, fast, and privacy-conscious.
      </p>
      <div className="mt-8 animate-fade-in-up stagger-2">
        <button 
          onClick={onGetStartedClick}
          className="bg-black hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:opacity-95 transition transform hover:scale-110 animate-bounce"
=======
      <h2 className="text-4xl font-bold mb-4">Study smarter — not harder</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Turn your notes into concise summaries and study plans. Simple, fast, and privacy-conscious.
      </p>
      <div className="mt-8">
        <button 
          onClick={onGetStartedClick}
          className="bg-black hover:bg-orange-500  text-white px-6 py-3 rounded-md font-medium hover:opacity-95 transition animate-bounce"
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
<<<<<<< HEAD
    <div className="bg-white p-6 rounded-lg shadow-sm border animate-scale-in hover:shadow-lg hover:scale-105 transition transform cursor-pointer">
=======
    <div className="bg-white p-6 rounded-lg shadow-sm border">
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function FeaturesGrid({ features }) {
  return (
    <section className="mt-16 grid md:grid-cols-2 gap-6">
<<<<<<< HEAD
      {features.map((feature, index) => (
        <div key={feature.title} className={`stagger-${index + 1}`}>
          <FeatureCard title={feature.title} description={feature.description} />
        </div>
=======
      {features.map((feature) => (
        <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
>>>>>>> baf611a81c99807a3de8e2b3d44142072a2c8b26
      ))}
    </section>
  );
}
