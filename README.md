<div align="center">

# 🛡️ VETO

### **The Undo Button for Payments**

*Stop scams before they happen. Get your money back if they do.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Expo](https://img.shields.io/badge/Expo-54-blue)](https://expo.dev/)
[![Python](https://img.shields.io/badge/Python-3.10-green)](https://python.org/)

[🌐 Live Demo](https://veto-sable.vercel.app) • [📱 Download APK](#) • [📖 Docs](./DEPLOYMENT.md)

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Expo Go app (for mobile)

### 1️⃣ Clone & Install
```bash
git clone https://github.com/Aayu095/VETO.git
cd VETO
```

### 2️⃣ Run Web App
```bash
cd web
npm install
npm run dev
# Open http://localhost:3000
```

### 3️⃣ Run Mobile App
```bash
cd mobile
npm install
npx expo start
# Scan QR code with Expo Go
```

### 4️⃣ Run AI Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
# API at http://localhost:8000
```

**Full deployment guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎯 Demo Scenario

**The Penny Drop Scam (Prevented)**

1. 💸 Scammer sends you 1 MNEE to build trust
2. 📞 Scammer calls: "I sent ₹18,000 by mistake! Send it back!"
3. 🚨 **You try to send ₹18,000**
4. 🛡️ **VETO AI detects the pattern**
5. 🔒 **Funds locked in vault (not sent to scammer)**
6. ⏱️ **You have 24 hours to click "Undo"**
7. ✅ **Money returned to your wallet**

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
