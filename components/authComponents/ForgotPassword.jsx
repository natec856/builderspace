"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // your Supabase client
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1">
      {success ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Check Your Email</h2>
          <p>Password reset instructions sent.</p>
          <p className="mt-2 text-sm text-gray-700">
            If you registered using your email and password, you will receive a password reset email.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleForgotPassword}
        >
          <h2 className="text-2xl font-semibold mb-2 text-slate-900">Reset Your Password</h2>
          <p className="mb-4 text-slate-500">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="me@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send reset email"}
          </button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}