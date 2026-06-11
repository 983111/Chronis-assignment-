import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword as createUserAuth, signInWithEmailAndPassword as signInAuth } from "../firebase";
import { Lock, Mail, User, Loader2, AlertCircle } from "lucide-react";

interface AuthPageProps {
  onAuthSuccess: (uid: string, name: string, email: string, isBrandNew: boolean) => void;
  onBack: () => void;
}

export default function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error("Full Name is required.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");

        // Create Auth Account
        const userCredential = await createUserAuth(auth, email, password);
        const user = userCredential.user;

        // Secure User Document creation in LocalStorage
        const profileData = {
          id: user.uid,
          name: name.trim(),
          email: email.trim(),
          onboarded: false,
          trackingPref: [],
          onboardingPersonalization: "",
          collectionPreference: "",
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(`chronis_profile_${user.uid}`, JSON.stringify(profileData));

        // Success Callback
        onAuthSuccess(user.uid, name.trim(), email.trim(), true);
      } else {
        // Sign In Account
        const userCredential = await signInAuth(auth, email, password);
        const user = userCredential.user;

        // Fetch User profile from LocalStorage
        const localProfile = localStorage.getItem(`chronis_profile_${user.uid}`);
        let fetchedName = "Chronis User";
        let isBrandNew = true;

        if (localProfile) {
          const profile = JSON.parse(localProfile);
          fetchedName = profile.name || fetchedName;
          isBrandNew = !profile.onboarded;
        } else {
          // Fallback if auth is out of sync with LocalStorage
          const profileData = {
            id: user.uid,
            name: "Chronis User",
            email: email.trim(),
            onboarded: false,
            trackingPref: [],
            onboardingPersonalization: "",
            collectionPreference: "",
            createdAt: new Date().toISOString()
          };
          localStorage.setItem(`chronis_profile_${user.uid}`, JSON.stringify(profileData));
        }

        onAuthSuccess(user.uid, fetchedName, email, isBrandNew);
      }
    } catch (err: any) {
      const isExpectedUserError = 
        err?.code === "auth/email-already-in-use" || 
        err?.message?.includes("email-already-in-use") ||
        err?.code === "auth/invalid-credential" || 
        err?.message?.includes("invalid-credential") ||
        err?.code === "auth/wrong-password" || 
        err?.message?.includes("wrong-password") ||
        err?.code === "auth/invalid-email" || 
        err?.message?.includes("invalid-email") ||
        err?.code === "auth/weak-password" ||
        err?.message?.includes("weak-password") ||
        err?.code === "auth/operation-not-allowed" ||
        err?.message?.includes("operation-not-allowed");

      if (!isExpectedUserError) {
        console.error("Auth Fail", err);
      } else {
        console.warn("Auth Validation Handled", err?.message || err);
      }

      let msg = "An authentication error occurred.";
      const errorStr = ((err?.code || "") + " " + (err?.message || "")).toLowerCase();
      if (errorStr.includes("email-already-in-use")) {
        msg = "This email is already in use.";
      } else if (
        errorStr.includes("invalid-credential") || 
        errorStr.includes("wrong-password")
      ) {
        msg = "Invalid email or password.";
      } else if (errorStr.includes("invalid-email")) {
        msg = "Please enter a valid email address.";
      } else if (errorStr.includes("weak-password")) {
        msg = "Password must be at least 6 characters.";
      } else if (errorStr.includes("operation-not-allowed")) {
        msg = "Authentication is currently unavailable. Please ensure that the sign-in provider is fully configured.";
      } else {
        msg = err?.message || "An authentication error occurred.";
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800 flex flex-col justify-center items-center px-4 font-sans leading-relaxed select-none">
      
      {/* Brand header */}
      <div className="mb-10 text-center">
        <div className="w-10 h-10 relative mx-auto mb-3.5">
          <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
            <path
              d="M10,25 C12,18 16,14 22,12 C28,10 32,15 30,22 C28,29 24,33 18,34 C12,35 8,32 10,25 Z"
              fill="#C084FC"
              opacity="0.9"
            />
            <path
              d="M12,28 C14,21 19,16 25,18 C31,20 33,25 30,31 C27,37 21,38 15,36 C10,34 10,31 12,28 Z"
              fill="#F43F5E"
              opacity="0.65"
              style={{ mixBlendMode: "multiply" }}
            />
          </svg>
        </div>
        <h1 className="text-2xl font-serif tracking-tight text-slate-900 font-normal">CHRONIS</h1>
        <p className="text-xs text-slate-400 mt-1 font-space uppercase tracking-widest">Connect to Your Pattern</p>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-100/80 rounded-3xl p-6.5 md:p-8 shadow-xs">
        <h2 className="text-lg font-serif font-medium text-slate-900 text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {errorMsg && (
          <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <User className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded-xl outline-hidden font-medium transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Mail className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded-xl outline-hidden font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Lock className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded-xl outline-hidden font-medium transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 mt-6 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <span>{isSignUp ? "Register" : "Sign In"}</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-rose-500 hover:text-rose-600 font-semibold cursor-pointer"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create one"}
          </button>
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-8 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
      >
        ← Back to Home
      </button>

    </div>
  );
}
