# Deployment Guide: AI Study Helper

## 🚀 Deploy to Vercel (Recommended)

**Why Vercel?**
- Built for Next.js
- Serverless functions automatically configured
- Instant deploys on git push
- Free tier generous for MVP
- Global CDN for fast performance

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] GitHub repository created & code pushed
- [ ] All documentation complete
- [ ] `.env.local` has all required environment variables
- [ ] `.env.local` is in `.gitignore`
- [ ] Project builds locally: `npm run build`
- [ ] No console errors: `npm run dev`
- [ ] All API routes tested

---

## 🔑 Required Environment Variables

Create `.env.production` with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
```

**Get Your Keys:**

### Firebase Keys
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click ⚙️ → Project Settings
4. Copy config values
5. Save each variable

### Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API key"
3. Copy the key
4. Keep it safe

---

## ✅ Step-by-Step Deployment

### Step 1: Prepare Your GitHub Repository

```bash
# Push all changes to GitHub
git add .
git commit -m "initial commit"
git push origin main
```

### Step 2: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel
5. You're logged in!

### Step 3: Import Your Project

1. In Vercel dashboard, click "New Project"
2. Click "Import Git Repository"
3. Find `ai-study-helper`
4. Click "Import"

### Step 4: Configure Environment Variables

1. **Project Settings** → **Environment Variables**
2. Add each variable from your `.env.production`

⚠️ **Important:** Variables starting with `NEXT_PUBLIC_` are public (safe). Others are secret.

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. See "Congratulations!" → You're live! 🎉

---

## 🔗 Your Live URL

After deployment, you get a URL:

```
https://ai-study-helper-[random].vercel.app
```

**Share this link everywhere!**

---

## ✨ Automatic Deployments

Every time you push to GitHub:
```
git push origin main
  ↓
Vercel rebuilds & deploys
  ↓
Live in 2 minutes
```

---

## 🧪 Test Your Deployment

### 1. Test Landing Page
```
URL: https://your-app.vercel.app
Expected: See landing page
```

### 2. Test Auth
```
1. Enter email: test@example.com
2. Enter password
3. Click "Sign Up"
4. Should redirect to /dashboard
```

### 3. Test AI Feature
```
1. Paste study text
2. Select "Summarize"
3. Click button
4. Wait for response
```

### 4. Test Study History
```
1. Generate content
2. Check if in "Study History"
3. Refresh page
4. History should persist
```

---

## 🐛 Troubleshooting

### Build Fails
```
Error: Cannot find module
Solution: 
1. Check package.json has all dependencies
2. Run: npm install
3. Commit package-lock.json
4. Redeploy
```

### Environment Variables Not Working
```
Error: GEMINI_API_KEY is undefined
Solution:
1. Verify all env vars added in Vercel
2. Redeploy
3. Check names match exactly
```

### Firebase Auth Not Working
```
Error: Firebase initialization failed
Solution:
1. Verify NEXT_PUBLIC_FIREBASE_* variables
2. Check Firebase project is active
3. Enable Email/Password auth in Firebase
4. Redeploy
```

---

## 📊 Monitor Performance

### Vercel Analytics Dashboard
- **Response Time** - Should be <1000ms
- **Error Rate** - Should be <0.1%
- **Build Duration** - Should be <5 min

---

## 🔐 Security Checklist

- [ ] API keys in Vercel env vars (not GitHub)
- [ ] `.env.local` in `.gitignore`
- [ ] HTTPS enabled (automatic)
- [ ] Firebase project in production mode
- [ ] Firestore rules restrict to auth users
- [ ] No sensitive data in logs

---

## 📈 Scaling Considerations

### Free Tier Limits (Fine for MVP)
- **Requests:** 100/second
- **Function timeout:** 10 seconds
- **Build:** 45 minutes max
- **Bandwidth:** 100GB/month

### When to Upgrade ($20/month)
- Exceed 100 requests/second
- Firestore > 100MB
- Custom domains needed
- Team collaboration needed

---

## 🚀 Post-Launch To-Dos

1. **Share Your Project**
   - Post on ProductHunt
   - Share on Reddit
   - Share on Discord
   - Include your live link

2. **Gather Feedback**
   - Monitor user behavior
   - Check error logs
   - Iterate quickly

3. **Documentation**
   - Add FAQs
   - Create tutorials
   - Add video walkthrough (optional)

---

**Your AI Study Helper is live!** 🌟
