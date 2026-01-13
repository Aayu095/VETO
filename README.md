<div align="center">

# 🛡️ VETO

### **The Undo Button for Payments**

*Stop scams before they happen. Get your money back if they do.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Expo](https://img.shields.io/badge/Expo-54-blue)](https://expo.dev/)
[![Python](https://img.shields.io/badge/Python-3.10-green)](https://python.org/)

[🌐 Live Demo](https://veto-sable.vercel.app)

</div>

---

## 💡 The Problem

**₹18,000 lost in 3 seconds.** That's what happened to Vinayak when a scammer sent him ₹1 to build trust, then asked for ₹18,000 back claiming it was a "mistake."

This is called **Authorized Push Payment (APP) fraud** — and it's the fastest-growing scam in crypto. Once you hit "Send," your money is gone. Forever.

**VETO changes that.**

---

## ⚡ The Solution

VETO is an **AI-powered payment layer** that gives you **time to think** before your money disappears.

### How It Works (3 Seconds to Stop a Scam)

```
1. 🔍 AI Scans Every Transaction
   ↓ Detects patterns like "Penny Drop," fresh wallets, urgency signals
   
2. 🔒 Suspicious? Money Goes to Vault
   ↓ Funds locked in a smart contract (not sent to scammer)
   
3. ⏱️ You Have Time to Recall
   ↓ 4-24 hour window to click "Undo" and get a full refund
```

**No scammer. No middleman. Just you and a smart contract.**

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Fraud Detection** | Real-time pattern recognition trained on thousands of scam cases |
| 🔐 **Smart Vault System** | Time-locked escrow powered by Ethereum smart contracts |
| 📱 **Mobile-First** | Native iOS/Android app with biometric security |
| ⚡ **Instant Recall** | Emergency "Undo" button for high-risk transactions |
| 🌍 **Universal** | Works with any wallet, optimized for MNEE blockchain |

---

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend (Web)** | Next.js 16, React 19, TailwindCSS, RainbowKit |
| **Mobile App** | React Native (Expo 54), TypeScript, NativeWind |
| **AI Backend** | Python 3.10, FastAPI, Custom ML Models |
| **Blockchain** | Solidity, Hardhat, Ethereum/MNEE, ethers.js |

</div>

---

## 🚀 Quick Start for Judges

### ⚠️ Prerequisites (Install These First)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Python 3.10+** - [Download here](https://www.python.org/downloads/)
- **Expo Go app** - [Download for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 📱 **FASTEST WAY TO TEST (Recommended)**

**Mobile App Demo (2 minutes setup):**
```bash
# 1. Clone the repo
git clone https://github.com/Aayu095/VETO.git
cd VETO/mobile

# 2. Install dependencies
npm install

# 3. Start the app
npx expo start --tunnel
```

**What you'll see:**
- A QR code will appear in your terminal
- Open **Expo Go** app on your phone
- Scan the QR code
- The VETO app will load on your phone!

**Note:** Your terminal must stay open while testing.

---

### 🌐 **Web App Setup (3 minutes)**

```bash
# Navigate to web folder
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

**Open in browser:** http://localhost:3000

**What you'll see:**
- Landing page with VETO branding
- "Download App" button
- Features showcase
- Vault dashboard (connect wallet to test)

---

### 🤖 **AI Backend Setup (Optional - 5 minutes)**

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the API server
python main.py
```

**API will run at:** http://localhost:8000

**What it does:**
- Analyzes transaction patterns
- Detects fraud signals (penny drops, fresh wallets)
- Returns risk scores to mobile app

**Note:** Mobile app works without backend (uses mock data for demo)

---

### 🔧 **Troubleshooting**

**Problem: "npm install" fails**
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

**Problem: "Expo Go can't connect"**
```bash
# Use tunnel mode for better connectivity
npx expo start --tunnel
```

**Problem: Python dependencies fail**
```bash
# Use a virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

**Problem: Port already in use**
```bash
# Web: Change port in package.json or kill process on 3000
# Backend: Change port in main.py or kill process on 8000
```

## 🎯 Demo Scenario

**The Penny Drop Scam (Prevented)**

1. Scammer sends you 1 MNEE to build trust
2. Scammer calls: "I sent ₹18,000 by mistake! Send it back!"
3. You try to send ₹18,000
4. VETO AI detects the pattern
5. Funds locked in vault (not sent to scammer)
6. You have 24 hours to click "Undo"
7. Money returned to your wallet

**Without VETO:** ₹18,000 lost forever.  
**With VETO:** ₹18,000 saved.

---

## 📂 Project Structure

```
veto-project/
├── web/              # Next.js landing page + vault dashboard
├── mobile/           # React Native wallet app
├── backend/          # Python AI fraud detection engine
├── contracts/        # Solidity smart contracts
└── README.md         # You are here
```

---

## 🤝 Contributing

We welcome contributions! This is an open-source project built for the MNEE Hackathon 2026.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Built For

**MNEE Hackathon 2026** | Track: Financial Automation

---

<div align="center">

**Made with ❤️ by Team VETO**

*Protecting your money, one transaction at a time.*

[⭐ Star this repo](https://github.com/Aayu095/VETO) if you believe crypto needs an undo button!

</div>
