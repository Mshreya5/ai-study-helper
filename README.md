# AI Study Helper

**AI-Powered Study Assistant using Next.js, Firebase & Gemini API**

An intelligent learning platform that transforms study notes into summaries, quiz questions, and actionable insights using Google's Gemini AI.

![Status](https://img.shields.io/badge/Status-MVP%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🎯 Product Overview

**AI Study Helper** is a SaaS application designed to help students learn more effectively by leveraging artificial intelligence. Instead of passively reading notes, users can instantly generate:

- **Smart Summaries** - Extract key concepts from lengthy notes
- **Practice Questions** - Auto-generated quizzes for self-assessment
- **Interactive Explanations** - Simplify complex topics
- **Study Suggestions** - Personalized tips for effective learning

### Key Problem Solved
Students spend hours reviewing notes or creating flashcards manually. AI Study Helper automates these tasks, freeing time for active learning and deeper understanding.

---

## 🚀 Live Demo

**[Deploy on Vercel](#deployment)** | **[GitHub Repository](https://github.com/Mshreya5/ai-study-helper)**

---

## 🏗️ Technology Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19** with hooks
- **Tailwind CSS 4** - Responsive design
- **Zustand** - State management

### Backend
- **Next.js API Routes** - Serverless functions
- **Firebase Admin** - Server-side operations

### Database & Auth
- **Firebase Authentication** - Email/password signup
- **Firebase Firestore** - Study history & user data
- **Secure UID-based data isolation**

### AI Integration
- **Google Gemini API** - Core AI engine for content generation
- **Adaptive model selection** - Automatic fallback handling

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Firebase project ([Create one](https://firebase.google.com))
- Gemini API key ([Get here](https://ai.google.dev))

### 1. Clone Repository
```bash
git clone https://github.com/Mshreya5/ai-study-helper.git
cd ai-study-helper
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env.local` in the project root:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🎨 Features & Workflows

### Authentication Flow
1. **Signup/Login** via Firebase Authentication
2. **Protected Dashboard** - Redirect unauthenticated users to auth page
3. **Persistent Sessions** - User data maintained via Firebase tokens

### Core AI Features

#### 1️⃣ Summarize
- Extracts key concepts from long study notes
- Returns concise, structured summaries
- Best for: Long textbooks, lectures, articles

#### 2️⃣ Generate Questions
- Creates 5 short quiz questions with answers
- Tests understanding of content
- Best for: Self-assessment, exam prep

#### 3️⃣ Explain Simply
- Rephrases complex topics for beginners
- Includes helpful examples
- Best for: Difficult concepts, learning new subjects

#### 4️⃣ Study Suggestions
- Provides 5 actionable tips per topic
- Tailored learning strategies
- Best for: Overcoming learning challenges

### Study History
- All generated results saved to Firestore
- Timestamped & organized chronologically
- Linked to individual user accounts

---

## 📊 Project Structure

```
ai-study-helper/
├── app/
│   ├── api/
│   │   ├── generate/route.js       # Summary, questions, explanations
│   │   └── study-suggestions/route.js  # Study tips endpoint
│   ├── auth/page.js                # Authentication UI
│   ├── dashboard/page.js           # Main app interface
│   ├── page.js                     # Landing page
│   ├── layout.js                   # Root layout & Auth provider
│   └── globals.css                 # Tailwind setup
├── lib/
│   ├── AuthContext.js              # Firebase auth logic
│   ├── firebase.js                 # Firebase initialization
│   ├── firestore.js                # Firestore CRUD operations
│   └── genModel.js                 # Gemini model selection
├── store/
│   └── useStore.js                 # Zustand state management
├── public/                         # Static assets
└── package.json                    # Dependencies
```

---

## 🔐 Authentication & Security

- **Firebase Auth SDK** - Industry-standard authentication
- **Server-side validation** - API routes verify user tokens
- **UID-based isolation** - Users can only access their own data
- **Environment variable protection** - API keys never exposed to frontend

---

## 🤖 AI Integration Details

**See [AI_WORKFLOW.md](./AI_WORKFLOW.md) for in-depth explanation of:**
- Gemini API integration patterns
- Model selection logic
- Prompt engineering strategies
- Rate limiting & error handling

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy with one click!

**[Detailed Deployment Guide](./DEPLOYMENT.md)**

### Deploy on Firebase Hosting

```bash
npm run build
firebase deploy
```

---

## 📋 API Endpoints

### Generate Content
```http
POST /api/generate
Content-Type: application/json

{
  "text": "study notes here...",
  "type": "summary" | "questions" | "explain"
}

Response: { "success": true, "response": "generated content..." }
```

### Study Suggestions
```http
POST /api/study-suggestions
Content-Type: application/json

{
  "topic": "Mathematics"
}

Response: { "suggestions": "5 actionable tips..." }
```

---

## 🧪 Testing

Run tests (if available):
```bash
npm test
```

---

## 📈 Performance & Optimization

- **Server-side Gemini calls** - Keeps API keys secure
- **Zustand state management** - Lightweight & efficient
- **Firestore real-time listeners** - Instant data sync
- **Next.js image optimization** - Automatic asset compression
- **CSS modules + Tailwind** - Minimal CSS footprint

---

## 🛠️ Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes & test locally
3. Commit with clear messages: `git commit -m "Add feature description"`
4. Push to GitHub: `git push origin feature/your-feature`
5. Create Pull Request for review

---

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` has correct credentials
- Check Firebase project is active in console
- Ensure Firestore is initialized

### Gemini API Errors
- Confirm API key is valid & has quota
- Check request payload format matches schema
- Review rate limiting (varies by API tier)

### Build Failures
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

---

## 📚 Architecture & Design

**[See ARCHITECTURE.md](./ARCHITECTURE.md)** for:
- System diagram
- Data flow visualization
- Component hierarchy
- State management patterns

---

## 🎯 Product Brief

**[See PRODUCT_BRIEF.md](./PRODUCT_BRIEF.md)** for:
- Problem statement
- Target audience
- Core features
- Competitive differentiation
- MVP scope definition

---

## 📝 Future Enhancements

- [ ] OAuth login (Google, GitHub)
- [ ] Export notes as PDF
- [ ] Spaced repetition algorithm
- [ ] Collaborative study groups
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] API rate limiting per user

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👤 Author

**Shreya** - Full-stack developer  
GitHub: [@Mshreya5](https://github.com/Mshreya5)

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/Mshreya5/ai-study-helper/issues)
- **Email**: Contact via GitHub profile

---

**Built with ❤️ using Next.js, Firebase & Gemini AI**
