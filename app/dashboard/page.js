"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { saveStudyHistory, getStudyHistory } from '@/lib/firestore';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2, LogOut, BookOpen, Lightbulb, FileQuestion } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const {
    currentUser,
    loading,
    setLoading,
    aiResponse,
    setAiResponse,
    error,
    setError,
    actionType,
    setActionType,
    studyHistory,
    setStudyHistory,
    addToHistory,
    reset
  } = useStore();
  
  const [studyText, setStudyText] = useState('');
  const [suggestionsText, setSuggestionsText] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth');
    } else {
      loadStudyHistory();
    }
  }, [currentUser]);

  const loadStudyHistory = async () => {
    try {
      const userHistory = await getStudyHistory(currentUser.uid);
      setStudyHistory(userHistory);
    } catch (error) {
      setStudyHistory([]);
    }
  };

  const generateContent = async () => {
    const trimmedText = studyText.trim();
    if (!trimmedText) {
      setError('Please enter some study content');
      return;
    }

    reset();
    setLoading(true);
    setSuggestionsText('');

    try {
      const generatedContent = actionType === 'suggestions'
        ? await fetchStudySuggestions(trimmedText)
        : await fetchStudyContent(trimmedText, actionType);

      processGeneratedContent(generatedContent);

      const aiResult = generatedContent.response || generatedContent.suggestions || '';
      await saveToFirestore(trimmedText, aiResult);
      
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processGeneratedContent = (generatedContent) => {
    if (actionType === 'suggestions') {
      if (generatedContent.suggestions) {
        setSuggestionsText(generatedContent.suggestions);
        setAiResponse(generatedContent.suggestions);
      } else {
        setError(generatedContent.error || 'Failed to generate suggestions');
      }
    } else {
      if (generatedContent.success) {
        setAiResponse(generatedContent.response);
      } else {
        setError(generatedContent.error || 'Failed to generate response');
      }
    }
  };

  const saveToFirestore = async (originalContent, aiResult) => {
    await saveStudyHistory(currentUser.uid, {
      originalText: originalContent,
      aiResponse: aiResult,
      type: actionType
    });

    addToHistory({
      originalText: originalContent,
      aiResponse: aiResult,
      type: actionType,
      createdAt: new Date().toISOString()
    });
  };

  const fetchStudyContent = async (text, type) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, type })
    });
    return await response.json();
  };

  const fetchStudySuggestions = async (topic) => {
    const response = await fetch('/api/study-suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    return await response.json();
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/auth');
  };

  const handleHistoryItemClick = (historyItem) => {
    setStudyText(historyItem.originalText);
    setAiResponse(historyItem.aiResponse);
    setActionType(historyItem.type);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <DashboardNav onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MainContentArea
            studyText={studyText}
            onStudyTextChange={setStudyText}
            actionType={actionType}
            onActionTypeChange={setActionType}
            loading={loading}
            onGenerate={generateContent}
            aiResponse={aiResponse}
            error={error}
            suggestionsText={suggestionsText}
          />

          <HistorySidebar
            studyHistory={studyHistory}
            onHistoryItemClick={handleHistoryItemClick}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardNav({ onLogout }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AI Study Helper</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border-none rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}

function MainContentArea({
  studyText,
  onStudyTextChange,
  actionType,
  onActionTypeChange,
  loading,
  onGenerate,
  aiResponse,
  error,
  suggestionsText,
}) {
  const isGenerateDisabled = loading || !studyText.trim();

  return (
    <div className="lg:col-span-2">
      <StudyContentInput
        value={studyText}
        onChange={onStudyTextChange}
      />

      <ActionSelector
        actionType={actionType}
        onActionChange={onActionTypeChange}
        loading={loading}
        isGenerateDisabled={isGenerateDisabled}
        onGenerateClick={onGenerate}
      />

      {(aiResponse || error) && (
        <ResponseDisplay
          aiResponse={aiResponse}
          error={error}
          actionType={actionType}
          suggestionsText={suggestionsText}
        />
      )}
    </div>
  );
}

function StudyContentInput({ value, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Study Content</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your study notes, textbook content, or any material you want to learn..."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
      />
    </div>
  );
}

function ActionSelector({
  actionType,
  onActionChange,
  loading,
  isGenerateDisabled,
  onGenerateClick,
}) {
  const actions = [
    { type: 'summary', icon: <BookOpen size={20} />, label: 'Summary', color: 'blue-600' },
    { type: 'explain', icon: <Lightbulb size={20} />, label: 'Explain', color: 'green-600' },
    { type: 'questions', icon: <FileQuestion size={20} />, label: 'Questions', color: 'purple-600' },
    { type: 'suggestions', icon: <FileQuestion size={20} />, label: 'Suggestions', color: 'amber-600' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Choose Action</h3>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {actions.map((action) => (
          <ActionButton
            key={action.type}
            icon={action.icon}
            label={action.label}
            isActive={actionType === action.type}
            color={action.color}
            onClick={() => onActionChange(action.type)}
          />
        ))}
      </div>

      <button
        onClick={onGenerateClick}
        disabled={isGenerateDisabled}
        className={`w-full mt-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
          isGenerateDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Generating...
          </>
        ) : (
          'Generate'
        )}
      </button>
    </div>
  );
}

function ResponseDisplay({ aiResponse, error, actionType, suggestionsText }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {error ? 'Error' : 'AI Response'}
      </h3>
      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div>
          {actionType === 'suggestions' && suggestionsText ? (
            <div className="whitespace-pre-wrap text-black">{suggestionsText}</div>
          ) : (
            <pre className="whitespace-pre-wrap text-black font-sans">
              {aiResponse}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

function HistorySidebar({ studyHistory, onHistoryItemClick }) {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
        <h3 className="text-lg font-semibold mb-4">Recent History</h3>
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {studyHistory.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No history yet
            </p>
          ) : (
            studyHistory.map((item, index) => (
              <HistoryItem
                key={item.id || index}
                item={item}
                onClick={() => onHistoryItemClick(item)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, isActive, color, onClick }) {
  const bgColor = {
    'blue-600': 'bg-blue-600',
    'green-600': 'bg-green-600',
    'purple-600': 'bg-purple-600',
    'amber-600': 'bg-amber-600'
  }[color] || 'bg-blue-600';

  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-4 rounded-lg border-none cursor-pointer font-medium transition ${
        isActive 
          ? `${bgColor} text-white` 
          : 'bg-white text-gray-800 hover:bg-gray-100'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function HistoryItem({ item, onClick }) {
  const formattedDate = new Date(item.createdAt).toLocaleDateString();

  return (
    <div
      onClick={onClick}
      className="p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs px-2 py-1 rounded text-black font-medium bg-gray-100">
          {item.type}
        </span>
      </div>
      <p className="text-sm text-black line-clamp-2">
        {item.originalText}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {formattedDate}
      </p>
    </div>
  );
}
