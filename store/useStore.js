import { create } from 'zustand';

export const useStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
  
  error: null,
  setError: (errorMessage) => set({ error: errorMessage }),
  
  aiResponse: null,
  setAiResponse: (response) => set({ aiResponse: response }),
  
  actionType: 'summary',
  setActionType: (type) => set({ actionType: type }),
  
  studyHistory: [],
  setStudyHistory: (history) => set({ studyHistory: history }),
  addToHistory: (item) => set((state) => ({ 
    studyHistory: [item, ...state.studyHistory] 
  })),
  
  reset: () => set({ aiResponse: null, error: null, loading: false }),
}));
