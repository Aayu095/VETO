const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../../sentinel-website.html');
const destPagePath = path.join(__dirname, 'app/page.tsx');
const destCssPath = path.join(__dirname, 'app/globals.css');
const destLayoutPath = path.join(__dirname, 'app/layout.tsx');

let html = fs.readFileSync(srcPath, 'utf8');

// 1. Translations & Renames
html = html.replace(/SENTINEL/g, 'GARUDPAY');
html = html.replace(/Sentinel/g, 'GarudPay');
html = html.replace(/India Ka First/g, 'India\\'s First');
html = html.replace(/Hum fraud ke baad nahi — fraud ke <strong>pehle<\/strong> kaam karte hain./g, 'We don\\'t act after fraud — we act <strong>before<\/strong> fraud.');
html = html.replace(/FRAUD PEHLE<br>HOTA HAI.<br><span style="color:var\(--blue2\)">PAYMENT BAAD.<\/span>/g, 'FRAUD HAPPENS<br>FIRST.<br><span style="color:var(--blue2)">PAYMENT SECOND.</span>');
html = html.replace(/Sentinel sirf account nahi dekha. Wo dekha hai ki <em>aap kis halat mein<\/em> payment kar rahe ho./g, 'GarudPay does not just check the account. It checks the <em>psychological state</em> in which you are making the payment.');
html = html.replace(/Signals Silently Collect Hote Hain/g, 'Signals Silently Collected');
html = html.replace(/Jab aap payment shuru karte ho — background mein 12 behavioral signals collect hote hain.../g, 'When you initiate a payment, 12 behavioral signals are collected in the background...');
html = html.replace(/BCD Engine Score Calculate Karta Hai/g, 'BCD Engine Calculates Risk Score');
html = html.replace(/Behavioral Coercion Detection engine sab signals combine karta hai aur ek risk score banata hai.../g, 'The Behavioral Coercion Detection engine synthesizes these signals and generates a precise real-time risk score...');
html = html.replace(/Normal Ya Vault — 3 Tiers/g, 'Normal or Vault — 3 Tiers');
html = html.replace(/Score 0-39: bilkul normal payment.../g, 'Score 0-39: routine payment. Score 40-69: gentle warning. Score 70+: Vault activates, funds hold, auto-returns in 24 hours.');
html = html.replace(/Smart Contract Escrow — Trustless/g, 'Smart Contract Escrow — Trustless');
html = html.replace(/Vault mein rakha paisa koi nahi chhu sakta.../g, 'Money held in the Vault is untouchable by everyone, including us, the banks, or government. It is controlled objectively by a Smart Contract.');
html = html.replace(/PAISA RUKA<br>RAHEGA.<br><span style="color:var\(--green\)">AAP SOCHO.<\/span>/g, 'PAYMENT STAYS<br>PAUSED.<br><span style="color:var(--green)">YOU GET TO THINK.</span>');
html = html.replace(/Scammers ka sabse bada weapon hai urgency.../g, 'A scammer\\'s biggest weapon is false urgency. The Smart Vault directly attacks this urgency. It enforces a mandatory pause until you realize what is happening.');
html = html.replace(/Override Feature/g, 'Override Feature');
html = html.replace(/Agar genuinely aapka hi transaction hai — ek 3-statement override hai.../g, 'If it is genuinely your transaction, there is a simple 3-statement override. The mandatory friction acts as a mental mirror for the victim.');
html = html.replace(/TECHNOLOGY<br>THAT <span style="color:var\(--blue2\)">THINKS.<\/span>/g, 'TECHNOLOGY<br>THAT <span style="color:var(--blue2)">THINKS.</span>');
html = html.replace(/Teen layers mein protection.../g, 'Three layers of pure protection. Embedded AI intelligence. Immutable Blockchain trust. And above all — zero friction for authentic usage.');
html = html.replace(/Dunia ka pehla payment system jo account nahi.../g, 'The world\\'s first payment infrastructure evaluating psychology. We scan real-time events like rapid copy-paste and unknown call history.');
html = html.replace(/Flagged payment vault mein jaata hai.../g, 'Flagged funds map to a Trustless Vault. You have exactly 24 hours to clear your head. If zero action is taken, code guarantees your return.');
html = html.replace(/Ek user ne report kiya — poori network protected.../g, 'One user intercepts a scam, the entire global network adapts. Fraud mapping prevents bad actors from creating infinite new bank identities.');
html = html.replace(/90%\+ transactions bilkul smooth.../g, 'Over 95% of transactions are executed completely transparently. Advanced statistical thresholds ensure flawless UX for routine payment streams.');
html = html.replace(/AB SAFE<br>RAHNA<br><span style="color:var\(--green\)">SIMPLE HAI.<\/span>/g, 'STAYING EXTREMELY<br>SAFE IS<br><span style="color:var(--green)">SIMPLE.</span>');
html = html.replace(/Ek retired teacher Pune mein ₹4.2 lakh kho gayi..*/g, 'A retired teacher in Pune lost ₹4.2 lakh. Her bank watched the entire pattern occur and did nothing to intervene. If she had used GarudPay, her funds would be secured safely inside the Vault and auto-returned.');
html = html.replace(/Aapka paisa. Aapki marzi. Hamesha./g, 'Your money. Your timeline. Always.');

// 2. Extract CSS
const styleMatch = html.match(/<style>(.*?)<\/style>/s);
if (styleMatch) {
    fs.writeFileSync(destCssPath, `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${styleMatch[1]}`);
}

// 3. Extract Script
const scriptMatch = html.match(/<script>(.*?)<\/script>/s);
let scriptContent = '';
if (scriptMatch) {
    scriptContent = scriptMatch[1];
}

// 4. Extract Body
const bodyMatch = html.match(/<body>(.*?)<\/body>/s);
if (bodyMatch) {
    let bodyCode = bodyMatch[1];
    
    // Convert class to className
    bodyCode = bodyCode.replace(/class=/g, 'className=');
    
    // Convert inline styles. This is risky with regex but works for simple ones.
    // E.g., style="color:var(--blue2)" -> style={{color:'var(--blue2)'}}
    bodyCode = bodyCode.replace(/style="([^"]*)"/g, (match, p1) => {
        const rules = p1.split(';').filter(r => r.trim().length > 0);
        const styleObj = rules.map(rule => {
            let [key, val] = rule.split(':');
            if(!val) return '';
            key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            val = val.trim();
            return `${key}: "${val}"`;
        }).filter(Boolean).join(', ');
        return `style={{${styleObj}}}`;
    });

    // Handle viewBox issues
    bodyCode = bodyCode.replace(/viewBox/g, 'viewBox');
    bodyCode = bodyCode.replace(/stroke-width/g, 'strokeWidth');
    bodyCode = bodyCode.replace(/stroke-dasharray/g, 'strokeDasharray');
    bodyCode = bodyCode.replace(/stroke-dashoffset/g, 'strokeDashoffset');
    bodyCode = bodyCode.replace(/stroke-linecap/g, 'strokeLinecap');

    // Remove `<script>` stuff from body if any.
    bodyCode = bodyCode.replace(/<script>(.*?)<\/script>/gs, '');

    // Razorpay Effect - add to features-grid
    // We update the <div className="features-grid"> to include our sticky parallax effect
    // We already have .features-grid in CSS. Let's just modify the HTML dynamically.
    bodyCode = bodyCode.replace(/<div className="features-grid">([\s\S]*?)<\/section>/, (match, gridContent) => {
        // We will restructure giving it the sticky stack classes. In our CSS we had `.features-container`
        let newGrid = `<div className="features-container">\n`;
        let cards = gridContent.split('<div className="feature-card">');
        cards.shift(); // remove first empty or prefix part
        cards.forEach((cardHtml, i) => {
            newGrid += `
                <div className="feature-sticky-card" style={{ top: \`\${15 + (${i} * 3)}vh\` }}>
                    <div className="feature-card">
                        ${cardHtml}
                </div>
            `;
        });
        newGrid += `</div>\n</section>`;
        return newGrid;
    });

    const pageContent = `
"use client";
import { useEffect } from "react";
import Link from 'next/link';

export default function Page() {
    useEffect(() => {
        // Run the custom script from HTML
        ${scriptContent}
    }, []);

    return (
        <main className="min-h-screen bg-[#060A14] overflow-x-hidden">
            ${bodyCode}
        </main>
    );
}
    `;
    
    fs.writeFileSync(destPagePath, pageContent);
}

console.log("Migration Complete!");
