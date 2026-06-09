"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  terms: boolean;
}

interface FieldError {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Special character", pass: /[!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["", "#E63946", "#FFB347", "#F7931A", "#00A86B"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Bar */}
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 rounded-full transition-all duration-300"
            style={{ background: i <= score ? colors[score] : "var(--border)" }} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {checks.map((c) => (
            <span key={c.label}
              className="text-xs flex items-center gap-1"
              style={{ color: c.pass ? "#00A86B" : "var(--text-muted)" }}>
              <Check size={10} className={c.pass ? "opacity-100" : "opacity-30"} />
              {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className="text-xs font-semibold flex-shrink-0 ml-2"
            style={{ color: colors[score] }}>{labels[score]}</span>
        )}
      </div>
    </div>
  );
}

function InputField({
  id, label, type = "text", value, onChange, placeholder, icon, error, rightEl, required
}: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder: string; icon: React.ReactNode; error?: string; rightEl?: React.ReactNode; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1.5"
        style={{ color: "var(--text-primary)" }}>
        {label}{required && <span className="text-brand-orange ml-0.5">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange/40 themed-input"
          style={error ? { borderColor: "#E63946" } : {}}
        />
        {rightEl && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</span>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-1 text-xs mt-1 text-brand-red">
            <AlertCircle size={11} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SignUpForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "", username: "", email: "",
    password: "", confirmPassword: "",
    newsletter: true, terms: false,
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormData) {
    return (value: string | boolean) =>
      setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): FieldError {
    const e: FieldError = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2) e.fullName = "Must be at least 2 characters";

    if (!form.username.trim()) e.username = "Username is required";
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      e.username = "3-20 characters, letters, numbers, underscores only";

    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";

    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";

    if (!form.terms) e.terms = "You must agree to the Terms of Service";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-brand-green" />
        </div>
        <h3 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
          Account created!
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Welcome to CoinLineup, <strong>{form.fullName.split(" ")[0]}</strong>!<br />
          Check your email to verify your account.
        </p>
        <Link href="/"
          className="inline-flex bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold px-8 py-3 rounded-xl transition-colors">
          Go to Homepage
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Social sign up */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Google",
            icon: (
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            ),
          },
          {
            label: "GitHub",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            ),
          },
        ].map((s) => (
          <button key={s.label} type="button"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-colors hover:border-brand-orange"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>or sign up with email</span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Full Name */}
      <InputField
        id="fullName" label="Full Name" value={form.fullName}
        onChange={set("fullName") as (v: string) => void}
        placeholder="Alex Rivera" icon={<User size={16} />}
        error={errors.fullName} required
      />

      {/* Username */}
      <InputField
        id="username" label="Username" value={form.username}
        onChange={set("username") as (v: string) => void}
        placeholder="cryptotrader99" icon={<span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>@</span>}
        error={errors.username} required
      />

      {/* Email */}
      <InputField
        id="email" label="Email Address" type="email" value={form.email}
        onChange={set("email") as (v: string) => void}
        placeholder="you@example.com" icon={<Mail size={16} />}
        error={errors.email} required
      />

      {/* Password */}
      <div>
        <InputField
          id="password" label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={set("password") as (v: string) => void}
          placeholder="Create a strong password"
          icon={<Lock size={16} />}
          error={errors.password}
          required
          rightEl={
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="p-0.5" style={{ color: "var(--text-muted)" }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        <PasswordStrength password={form.password} />
      </div>

      {/* Confirm Password */}
      <InputField
        id="confirmPassword" label="Confirm Password"
        type={showConfirm ? "text" : "password"}
        value={form.confirmPassword}
        onChange={set("confirmPassword") as (v: string) => void}
        placeholder="Repeat your password"
        icon={<Lock size={16} />}
        error={errors.confirmPassword}
        required
        rightEl={
          <div className="flex items-center gap-1.5">
            {form.confirmPassword && form.password === form.confirmPassword && (
              <Check size={15} className="price-up" />
            )}
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              style={{ color: "var(--text-muted)" }}>
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        }
      />

      {/* Checkboxes */}
      <div className="space-y-3 pt-1">
        {/* Newsletter */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input type="checkbox" checked={form.newsletter}
              onChange={(e) => set("newsletter")(e.target.checked)}
              className="sr-only" />
            <div
              className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
              style={form.newsletter
                ? { background: "#F7931A", borderColor: "#F7931A" }
                : { background: "var(--input-bg)", borderColor: "var(--border)" }}>
              {form.newsletter && <Check size={12} className="text-white" />}
            </div>
          </div>
          <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Subscribe to <strong style={{ color: "var(--text-primary)" }}>CoinLineup Daily</strong> — get the top crypto news every morning.
          </span>
        </label>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative flex-shrink-0 mt-0.5">
            <input type="checkbox" checked={form.terms}
              onChange={(e) => set("terms")(e.target.checked)}
              className="sr-only" />
            <div
              className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
              style={form.terms
                ? { background: "#F7931A", borderColor: "#F7931A" }
                : errors.terms
                  ? { background: "var(--input-bg)", borderColor: "#E63946" }
                  : { background: "var(--input-bg)", borderColor: "var(--border)" }}>
              {form.terms && <Check size={12} className="text-white" />}
            </div>
          </div>
          <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            I agree to the{" "}
            <Link href="/terms" className="text-brand-orange hover:underline font-medium">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-brand-orange hover:underline font-medium">Privacy Policy</Link>
            <span className="text-brand-orange ml-0.5">*</span>
          </span>
        </label>
        <AnimatePresence>
          {errors.terms && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-xs text-brand-red -mt-1">
              <AlertCircle size={11} />{errors.terms}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-display font-bold py-3.5 rounded-xl text-base transition-all mt-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account...
          </>
        ) : (
          "Create Free Account"
        )}
      </button>
    </form>
  );
}
