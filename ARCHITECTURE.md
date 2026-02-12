# Architecture & System Design

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer (Browser)                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Next.js Frontend (React 19)               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │
│  │  │ Landing Page │  │  Auth Page   │  │ Dashboard   │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │   │
│  │         ↓                 ↓                  ↓          │   │
│  │  ┌──────────────────────────────────────────────────┐ │   │
│  │  │     Zustand Global State Management             │ │   │
│  │  │  (currentUser, loading, aiResponse, history)    │ │   │
│  │  └──────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTP Requests
┌─────────────────────────────────────────────────────────────────┐
│                    Application Server (Node.js)                 │
│              Next.js API Routes (Serverless Functions)          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ /api/generate        │ /api/study-suggestions           │  │
│  │ ├─ POST requests     │ ├─ POST requests                │  │
│  │ ├─ Auth validation   │ ├─ Auth validation              │  │
│  │ └─ Gemini calls      │ └─ Gemini calls                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Authentication & Authorization Layer           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Firebase Auth Verification (JWT tokens)        │   │  │
│  │  │  User UID extraction & validation               │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         ↓ Data Operations          ↓ AI Requests            ↓ OAuth
┌──────────────────────┐  ┌─────────────────────┐  ┌──────────────┐
│  Firebase Firestore  │  │   Google Gemini API │  │ Firebase Auth│
│  ┌────────────────┐  │  │ ┌─────────────────┐ │  │ ┌──────────┐ │
│  │ studyHistory   │  │  │ │ Generate:       │ │  │ │ Email/PW │ │
│  │ collection     │  │  │ │ ├─ Summaries   │ │  │ │ OAuth    │ │
│  │ (User data)    │  │  │ │ ├─ Questions   │ │  │ │ Sessions │ │
│  │                │  │  │ │ ├─ Explanations│ │  │ │          │ │
│  │ Real-time ←/→ │  │  │ │ └─ Suggestions │ │  │ │          │ │
│  │ sync           │  │  │ └─────────────────┘ │  │ └──────────┘ │
│  └────────────────┘  │  │ Model: gemini-pro  │  │              │
│                      │  │ Rate: Limited      │  │              │
│                      │  │ Timeout: 30s       │  │              │
│                      │  └─────────────────────┘  │              │
└──────────────────────┘                          └──────────────┘
```

---

## 📋 Data Flow Diagram

### User Registration Flow
```
┌─ User fills email/password
│
├─→ POST /auth (Firebase SignUp)
│   ├─ Validate credentials
│   ├─ Create user in Firebase Auth
│   ├─ Generate JWT token
│   └─ Store in localStorage
│
└─→ Redirect to /dashboard
    └─ AuthProvider detects user → load study history
```

### Content Generation Flow
```
┌─ User enters study text
│
├─→ Select action type (summary|questions|explain)
│
├─→ POST /api/generate
│   ├─ Verify Firebase JWT token
│   ├─ Extract user UID
│   ├─ Create dynamic prompt
│   ├─→ Call Gemini API
│   │   ├─ Send prompt + user text
│   │   ├─ Wait for response (timeout: 30s)
│   │   └─ Return generated content
│   │
│   └─ Save to Firestore
│       ├─ Document: `studyHistory`
│       ├─ Fields: userId, originalText, aiResponse, type, createdAt
│       └─ Return success
│
├─→ Update Zustand state
│   └─ {aiResponse, loading: false}
│
└─→ Display result to user
```

---

## 🗂️ Component Architecture

### Page Structure (App Router)
```
app/
├── page.js (Landing page)
├── auth/page.js (Auth UI)
├── dashboard/page.js (Main app)
├── layout.js (Root wrapper)
└── api/
    ├── generate/route.js
    └── study-suggestions/route.js
```

---

## 🔄 State Management (Zustand Store)

### Store Structure
```javascript
useStore = {
  currentUser,
  setCurrentUser,
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
}
```

---

## 🔐 Authentication Architecture

### Firebase Auth Integration
- User logs in → Firebase generates JWT
- Token stored in browser (Firebase manages)
- Each API request includes token
- API verifies token before proceeding

---

## 📡 API Routes Design

### POST /api/generate
**Request:**
```json
{
  "text": "study content",
  "type": "summary|questions|explain"
}
```

### POST /api/study-suggestions
**Request:**
```json
{
  "topic": "string"
}
```

---

## 🤖 Gemini AI Integration

### Model Selection Strategy
- List available models
- Filter for generative support
- Fallback to 'gemini-pro'

### Prompt Engineering
- Dynamic prompts based on actionType
- User text injected safely
- Clear instructions for output format

---

## 🗄️ Database Schema (Firestore)

### Collection: `studyHistory`
```
studyHistory/{documentId}
├── userId: string
├── originalText: string
├── aiResponse: string
├── type: string
├── createdAt: timestamp
```

---

## 🔒 Security Architecture

- API keys in .env.local (server-side)
- JWT verification on all routes
- Firestore rules enforce userId check
- HTTPS-only communication
- UID-based data isolation

---

## ⚡ Performance Optimizations

- Zustand for minimal re-renders
- Firestore indexes for fast queries
- Server-side API calls
- CSS optimization

---

**Production-ready architecture** ✨
