"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

type Step = "signup" | "verify" | "success";

export default function SignUpPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("signup");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [resendCountdown, setResendCountdown] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(8);

  /*
   * Countdown for requesting another verification OTP.
   */
  useEffect(() => {
    if (resendCountdown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCountdown]);

  /*
   * After successful verification, show the success screen
   * and redirect to the workspace after 5 seconds.
   */
  useEffect(() => {
    if (step !== "success") {
      return;
    }

    if (redirectCountdown <= 0) {
      router.push("/workspace");
      router.refresh();
      return;
    }

    const timer = window.setTimeout(() => {
      setRedirectCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [step, redirectCountdown, router]);

  /*
   * Request a new verification OTP.
   *
   * This is only used when the user explicitly clicks
   * "Resend code". We do NOT call this immediately after
   * signup because Neon Auth already sends the initial OTP.
   */
  async function sendVerificationOtp() {
    const result = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    if (result.error) {
      throw new Error(
        result.error.message || "Unable to send verification code."
      );
    }
  }

  /*
   * Create the account.
   *
   * Neon Auth automatically sends the initial verification
   * OTP after successful signup.
   */
  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Unable to create account.");
        return;
      }

      /*
       * Do not call sendVerificationOtp() here.
       *
       * Neon Auth is already configured to send the verification
       * OTP during signup. Sending another OTP here would invalidate
       * the first code and cause the user to receive two emails.
       */
      setStep("verify");
      setResendCountdown(30);
      setMessage(`We sent a verification code to ${email}.`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Verify the OTP entered by the user.
   */
  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp: otp.trim(),
      });

      if (result.error) {
        setError(
          result.error.message || "The verification code is incorrect."
        );
        return;
      }

      /*
       * Verification succeeded.
       *
       * Show a confirmation screen before redirecting to the
       * editorial workspace.
       */
      setRedirectCountdown(8);
      setStep("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify your email address."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Send another OTP when requested by the user.
   */
  async function handleResend() {
    if (resendCountdown > 0 || resending) {
      return;
    }

    setError("");
    setMessage("");
    setResending(true);

    try {
      await sendVerificationOtp();

      setResendCountdown(30);
      setMessage(`A new verification code was sent to ${email}.`);
      setOtp("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to resend the verification code."
      );
    } finally {
      setResending(false);
    }
  }

  /*
   * Return to the signup form if the user wants to change
   * their email address.
   */
  function handleChangeEmail() {
    setStep("signup");
    setOtp("");
    setError("");
    setMessage("");
    setResendCountdown(0);
  }

  /*
   * Allow the user to skip the remaining countdown.
   */
  function handleGoToWorkspace() {
    router.push("/workspace");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-wide text-slate-500">
            EcoMicroVerse
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {step === "signup"
              ? "Create editorial account"
              : step === "verify"
                ? "Verify your email"
                : "Email successfully verified"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {step === "signup"
              ? "Create the initial account for the EcoMicroVerse editorial workspace."
              : step === "verify"
                ? "Enter the verification code sent to your email address."
                : "Your EcoMicroVerse editorial account is now verified and ready to use."}
          </p>
        </div>

        {step === "signup" ? (
          /*
           * SIGNUP FORM
           */
          <form
            onSubmit={handleSignUp}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Use at least 8 characters.
              </p>
            </div>

            {error ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        ) : step === "verify" ? (
          /*
           * OTP VERIFICATION FORM
           */
          <form
            onSubmit={handleVerify}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Verification email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-slate-800">
                {email}
              </p>
            </div>

            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-center text-2xl tracking-[0.4em] outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />

              <p className="mt-2 text-xs text-slate-500">
                Enter the 6-digit code from your EcoMicroVerse email.
              </p>
            </div>

            {message ? (
              <div
                role="status"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700"
              >
                {message}
              </div>
            ) : null}

            {error ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify email"}
            </button>

            <div className="flex items-center justify-between gap-4 text-sm">
              <button
                type="button"
                onClick={handleChangeEmail}
                className="text-slate-600 underline underline-offset-4 hover:text-slate-900"
              >
                Change email
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending || resendCountdown > 0}
                className="text-slate-600 underline underline-offset-4 hover:text-slate-900 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
              >
                {resending
                  ? "Sending…"
                  : resendCountdown > 0
                    ? `Resend in ${resendCountdown}s`
                    : "Resend code"}
              </button>
            </div>
          </form>
        ) : (
          /*
           * SUCCESS SCREEN
           */
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8 text-green-600"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
              Email successfully verified
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your EcoMicroVerse editorial account has been verified
              successfully and is ready to use.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Redirecting you to your workspace in{" "}
              <span className="font-semibold text-slate-900">
                {redirectCountdown}
              </span>{" "}
              {redirectCountdown === 1 ? "second" : "seconds"}…
            </p>

            <button
              type="button"
              onClick={handleGoToWorkspace}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Go to workspace now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}