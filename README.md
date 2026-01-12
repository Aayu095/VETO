# VETO Protocol - The Power to Undo the Scam
### MNEE Hackathon Submission | Track: AI & Agent Payments

VETO is the first intelligent payment layer that stops Authorized Push Payment (APP) fraud using programmable money and AI. It decouples the "Send" from the "Receive" by introducing an intelligent Time-Lock Vault when risk is detected.

## 🏗️ Project Structure (Monorepo)

- **`/contracts`**: Solidity Smart Contracts (`VetoVault.sol`) deployed on MNEE/Sepolia.
- **`/backend`**: Python/FastAPI Risk Engine that analyzes transaction context.
- **`/web`**: Next.js 14 Web Portal (Landing Page + Vault Dashboard).
- **`/mobile`**: React Native (Expo) Wallet App with "Intervention" capability.

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- Python 3.10+
- Expo Go (on mobile)

### 1. Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile
# Deploy to network
npx hardhat run scripts/deploy.ts --network sepolia
```

### 2. AI Backend (The Brain)
```bash
cd backend
pip install -r requirements.txt
python main.py
# API runs at http://localhost:8000
```

### 3. Web Portal (The Dash)
```bash
cd web
npm install
npm run dev
# Open http://localhost:3000
```

### 4. Mobile App (The Wallet)
```bash
cd mobile
npm install
npx expo start
# Scan QR code with Expo Go app
```

## 🛡️ The Scenario (Demo)
1. **The Setup:** Vinayak (User) receives 1.00 MNEE from a stranger (Scammer).
2. **The Trap:** Scammer asks for 18,000 MNEE.
3. **The Trigger:** Vinayak tries to send 18,000 MNEE to that address.
4. **The VETO:** 
   - App detects "Penny Drop" pattern.
   - Transaction is **VETOED** and moved to the Vault (Smart Contract).
   - Vinayak sees the Red Screen.
5. **The Undo:** Vinayak clicks "Emergency Recall" and funds return to his wallet.

## 📄 License
MIT
