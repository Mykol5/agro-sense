"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Leaf,
  LockKeyhole,
  Mail,
  User,
  Loader2,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import {
  getLoginErrorMessage,
  getSignupErrorMessage,
} from "../../lib/auth-errors";

export default function Login() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "signup">("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        // --------------------------------
        // LOGIN
        // --------------------------------
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          console.error("Login error:", error);
          setError(getLoginErrorMessage(error.code));
          return;
        }

        if (!data.user || !data.session) {
          setError("Unable to sign in. Please try again.");
          return;
        }

        router.push("/dashboard");
        router.refresh();

        return;
      }

      // --------------------------------
      // SIGN UP
      // --------------------------------
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);

        setError(getSignupErrorMessage(error.code));
        return;
      }

      /*
       * GT-002 requires a farmer to be signed in immediately
       * after creating an account.
       *
       * Therefore the Supabase project used for this ticket
       * must have email confirmation disabled.
       */
      if (!data.user || !data.session) {
        setError(
          "Your account was created, but we couldn't sign you in automatically. Please try again."
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">
      <div className="grid min-h-screen lg:grid-cols-[.95fr_1.05fr]">
        {/* --------------------------------
            LEFT SIDE
        -------------------------------- */}
        <section className="hidden bg-[#113f29] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0d5b36]">
              <Leaf size={19} />
            </span>

            <span className="font-bold">AgroSense AI</span>
          </Link>

          <div className="max-w-lg">
            <div className="text-xs font-bold uppercase tracking-[.18em] text-white/40">
              Your farm. Smarter decisions.
            </div>

            <h1 className="mt-5 text-5xl font-bold leading-[1] tracking-[-.06em]">
              {isLogin
                ? "Good farming decisions start with good information."
                : "A smarter way to farm starts here."}
            </h1>

            <p className="mt-6 text-base leading-7 text-white/55">
              {isLogin
                ? "Sign in to your AgroSense workspace and continue where you left off."
                : "Create your AgroSense account and start making better decisions with intelligent farming insights."}
            </p>
          </div>

          <div className="text-xs text-white/35">
            AI for farmers. Better decisions. Less waste. More income.
          </div>
        </section>

        {/* --------------------------------
            RIGHT SIDE
        -------------------------------- */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-[430px]">
            {/* Mobile logo */}
            <Link
              href="/"
              className="mb-10 flex items-center gap-2.5 lg:hidden"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0d5b36] text-white">
                <Leaf size={19} />
              </span>

              <span className="font-bold">
                AgroSense{" "}
                <span className="text-[#0d5b36]">AI</span>
              </span>
            </Link>

            {/* --------------------------------
                HEADER
            -------------------------------- */}
            <div className="text-xs font-bold uppercase tracking-[.18em] text-[#0d5b36]">
              {isLogin ? "Welcome back" : "Get started"}
            </div>

            <h2 className="mt-3 text-4xl font-bold tracking-[-.055em]">
              {isLogin
                ? "Sign in to your farm."
                : "Create your farmer account."}
            </h2>

            <p className="mt-3 text-sm leading-6 text-black/45">
              {isLogin
                ? "Access your crop checks, recommendations and farm insights."
                : "Join AgroSense and bring intelligent farming insights to your fingertips."}
            </p>

            {/* --------------------------------
                LOGIN / SIGNUP TOGGLE
            -------------------------------- */}
            <div className="mt-7 grid grid-cols-2 rounded-xl bg-black/[0.04] p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                  isLogin
                    ? "bg-white text-[#0d5b36] shadow-sm"
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                  !isLogin
                    ? "bg-white text-[#0d5b36] shadow-sm"
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                Create account
              </button>
            </div>

            {/* --------------------------------
                FORM
            -------------------------------- */}
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              {/* Full name — signup only */}
              {!isLogin && (
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-black/55">
                    Full name
                  </span>

                  <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
                    <User size={17} className="text-black/35" />

                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>
              )}

              {/* Email */}
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-black/55">
                  Email address
                </span>

                <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
                  <Mail size={17} className="text-black/35" />

                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-black/55">
                  Password
                </span>

                <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
                  <LockKeyhole size={17} className="text-black/35" />

                  <input
                    required
                    type="password"
                    placeholder={
                      isLogin ? "••••••••" : "At least 6 characters"
                    }
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </label>

              {/* Forgot password */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#0d5b36] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d5b36] py-3.5 text-sm font-semibold text-white transition hover:bg-[#09472a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign in" : "Create account"}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* --------------------------------
                BOTTOM SWITCH
            -------------------------------- */}
            <p className="mt-7 text-center text-xs text-black/40">
              {isLogin ? (
                <>
                  New to AgroSense?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className="font-semibold text-[#0d5b36] hover:underline"
                  >
                    Create your account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-semibold text-[#0d5b36] hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            <p className="mt-6 text-center text-[11px] leading-5 text-black/30">
              By continuing, you agree to use AgroSense AI responsibly and
              provide accurate information about your farm.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}






// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   ArrowRight,
//   Leaf,
//   LockKeyhole,
//   Mail,
//   User,
//   Loader2,
// } from "lucide-react";
// import { createClient } from "../../lib/supabase/client";

// export default function Login() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [mode, setMode] = useState<"login" | "signup">("login");

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const isLogin = mode === "login";

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       if (isLogin) {
//         // --------------------------------
//         // LOGIN
//         // --------------------------------
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email: email.trim(),
//           password,
//         });

//         if (error) {
//           setError(error.message);
//           return;
//         }

//         if (!data.user) {
//           setError("Unable to sign in. Please try again.");
//           return;
//         }

//         // Check whether the farmer has completed onboarding
//         const { data: profile, error: profileError } = await supabase
//           .from("profiles")
//           .select("onboarding_completed")
//           .eq("id", data.user.id)
//           .maybeSingle();

//         if (profileError) {
//           console.error("Profile check error:", profileError);
//         }

//         if (profile?.onboarding_completed) {
//           router.push("/dashboard");
//         } else {
//           router.push("/onboarding");
//         }

//         router.refresh();
//       } else {
//         // --------------------------------
//         // SIGN UP
//         // --------------------------------
//         const { data, error } = await supabase.auth.signUp({
//           email: email.trim(),
//           password,
//           options: {
//             data: {
//               full_name: fullName.trim(),
//             },
//           },
//         });

//         if (error) {
//           setError(error.message);
//           return;
//         }

//         // If email confirmation is enabled,
//         // Supabase returns a user but no session.
//         if (data.user && !data.session) {
//           setSuccess(
//             "Account created successfully. Please check your email to verify your account."
//           );

//           setFullName("");
//           setEmail("");
//           setPassword("");

//           return;
//         }

//         // If email confirmation is disabled,
//         // the user can go directly to onboarding.
//         router.push("/onboarding");
//         router.refresh();
//       }
//     } catch (err) {
//       console.error("Authentication error:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const switchMode = (newMode: "login" | "signup") => {
//     setMode(newMode);
//     setError("");
//     setSuccess("");
//   };

//   return (
//     <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">
//       <div className="grid min-h-screen lg:grid-cols-[.95fr_1.05fr]">

//         {/* --------------------------------
//             LEFT SIDE
//         -------------------------------- */}
//         <section className="hidden bg-[#113f29] p-10 text-white lg:flex lg:flex-col lg:justify-between">
//           <Link href="/" className="flex items-center gap-2.5">
//             <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0d5b36]">
//               <Leaf size={19} />
//             </span>

//             <span className="font-bold">AgroSense AI</span>
//           </Link>

//           <div className="max-w-lg">
//             <div className="text-xs font-bold uppercase tracking-[.18em] text-white/40">
//               Your farm. Smarter decisions.
//             </div>

//             <h1 className="mt-5 text-5xl font-bold leading-[1] tracking-[-.06em]">
//               {isLogin
//                 ? "Good farming decisions start with good information."
//                 : "A smarter way to farm starts here."}
//             </h1>

//             <p className="mt-6 text-base leading-7 text-white/55">
//               {isLogin
//                 ? "Sign in to your AgroSense workspace and continue where you left off."
//                 : "Create your AgroSense account and start making better decisions with intelligent farming insights."}
//             </p>
//           </div>

//           <div className="text-xs text-white/35">
//             AI for farmers. Better decisions. Less waste. More income.
//           </div>
//         </section>

//         {/* --------------------------------
//             RIGHT SIDE
//         -------------------------------- */}
//         <section className="flex items-center justify-center px-5 py-12 sm:px-8">
//           <div className="w-full max-w-[430px]">

//             {/* Mobile logo */}
//             <Link
//               href="/"
//               className="mb-10 flex items-center gap-2.5 lg:hidden"
//             >
//               <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0d5b36] text-white">
//                 <Leaf size={19} />
//               </span>

//               <span className="font-bold">
//                 AgroSense{" "}
//                 <span className="text-[#0d5b36]">AI</span>
//               </span>
//             </Link>

//             {/* --------------------------------
//                 HEADER
//             -------------------------------- */}
//             <div className="text-xs font-bold uppercase tracking-[.18em] text-[#0d5b36]">
//               {isLogin ? "Welcome back" : "Get started"}
//             </div>

//             <h2 className="mt-3 text-4xl font-bold tracking-[-.055em]">
//               {isLogin
//                 ? "Sign in to your farm."
//                 : "Create your farmer account."}
//             </h2>

//             <p className="mt-3 text-sm leading-6 text-black/45">
//               {isLogin
//                 ? "Access your crop checks, recommendations and farm insights."
//                 : "Join AgroSense and bring intelligent farming insights to your fingertips."}
//             </p>

//             {/* --------------------------------
//                 LOGIN / SIGNUP TOGGLE
//             -------------------------------- */}
//             <div className="mt-7 grid grid-cols-2 rounded-xl bg-black/[0.04] p-1">
//               <button
//                 type="button"
//                 onClick={() => switchMode("login")}
//                 className={`rounded-lg py-2.5 text-sm font-semibold transition ${
//                   isLogin
//                     ? "bg-white text-[#0d5b36] shadow-sm"
//                     : "text-black/40 hover:text-black/60"
//                 }`}
//               >
//                 Sign in
//               </button>

//               <button
//                 type="button"
//                 onClick={() => switchMode("signup")}
//                 className={`rounded-lg py-2.5 text-sm font-semibold transition ${
//                   !isLogin
//                     ? "bg-white text-[#0d5b36] shadow-sm"
//                     : "text-black/40 hover:text-black/60"
//                 }`}
//               >
//                 Create account
//               </button>
//             </div>

//             {/* --------------------------------
//                 FORM
//             -------------------------------- */}
//             <form onSubmit={handleSubmit} className="mt-7 space-y-4">

//               {/* Full name — signup only */}
//               {!isLogin && (
//                 <label className="block">
//                   <span className="mb-2 block text-xs font-semibold text-black/55">
//                     Full name
//                   </span>

//                   <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
//                     <User size={17} className="text-black/35" />

//                     <input
//                       required
//                       type="text"
//                       placeholder="Your full name"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       className="min-w-0 flex-1 bg-transparent text-sm outline-none"
//                     />
//                   </div>
//                 </label>
//               )}

//               {/* Email */}
//               <label className="block">
//                 <span className="mb-2 block text-xs font-semibold text-black/55">
//                   Email address
//                 </span>

//                 <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
//                   <Mail size={17} className="text-black/35" />

//                   <input
//                     required
//                     type="email"
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="min-w-0 flex-1 bg-transparent text-sm outline-none"
//                   />
//                 </div>
//               </label>

//               {/* Password */}
//               <label className="block">
//                 <span className="mb-2 block text-xs font-semibold text-black/55">
//                   Password
//                 </span>

//                 <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
//                   <LockKeyhole size={17} className="text-black/35" />

//                   <input
//                     required
//                     type="password"
//                     placeholder={
//                       isLogin ? "••••••••" : "At least 6 characters"
//                     }
//                     minLength={6}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="min-w-0 flex-1 bg-transparent text-sm outline-none"
//                   />
//                 </div>
//               </label>

//               {/* Forgot password */}
//               {isLogin && (
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     className="text-xs font-semibold text-[#0d5b36] hover:underline"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//               )}

//               {/* Error */}
//               {error && (
//                 <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
//                   {error}
//                 </div>
//               )}

//               {/* Success */}
//               {success && (
//                 <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
//                   {success}
//                 </div>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d5b36] py-3.5 text-sm font-semibold text-white transition hover:bg-[#09472a] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     {isLogin ? "Signing in..." : "Creating account..."}
//                   </>
//                 ) : (
//                   <>
//                     {isLogin ? "Sign in" : "Create account"}
//                     <ArrowRight size={16} />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* --------------------------------
//                 BOTTOM SWITCH
//             -------------------------------- */}
//             <p className="mt-7 text-center text-xs text-black/40">
//               {isLogin ? (
//                 <>
//                   New to AgroSense?{" "}
//                   <button
//                     type="button"
//                     onClick={() => switchMode("signup")}
//                     className="font-semibold text-[#0d5b36] hover:underline"
//                   >
//                     Create your account
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => switchMode("login")}
//                     className="font-semibold text-[#0d5b36] hover:underline"
//                   >
//                     Sign in
//                   </button>
//                 </>
//               )}
//             </p>

//             <p className="mt-6 text-center text-[11px] leading-5 text-black/30">
//               By continuing, you agree to use AgroSense AI responsibly and
//               provide accurate information about your farm.
//             </p>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }







// needed this below code to make the page work with supabase auth
//  "use client";

// import Link from "next/link";
// import { ArrowRight, Leaf, LockKeyhole, Mail } from "lucide-react";

// export default function Login() {
//   return (
//     <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">
//       <div className="grid min-h-screen lg:grid-cols-[.95fr_1.05fr]">
//         <section className="hidden bg-[#113f29] p-10 text-white lg:flex lg:flex-col lg:justify-between">
//           <Link href="/" className="flex items-center gap-2.5">
//             <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0d5b36]"><Leaf size={19}/></span>
//             <span className="font-bold">AgroSense AI</span>
//           </Link>
//           <div className="max-w-lg">
//             <div className="text-xs font-bold uppercase tracking-[.18em] text-white/40">Your farm. Smarter decisions.</div>
//             <h1 className="mt-5 text-5xl font-bold leading-[1] tracking-[-.06em]">Good farming decisions start with good information.</h1>
//             <p className="mt-6 text-base leading-7 text-white/55">Sign in to your AgroSense workspace and continue where you left off.</p>
//           </div>
//           <div className="text-xs text-white/35">AI for farmers. Better decisions. Less waste. More income.</div>
//         </section>

//         <section className="flex items-center justify-center px-5 py-12 sm:px-8">
//           <div className="w-full max-w-[430px]">
//             <Link href="/" className="mb-12 flex items-center gap-2.5 lg:hidden">
//               <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0d5b36] text-white"><Leaf size={19}/></span>
//               <span className="font-bold">AgroSense <span className="text-[#0d5b36]">AI</span></span>
//             </Link>
//             <div className="text-xs font-bold uppercase tracking-[.18em] text-[#0d5b36]">Welcome back</div>
//             <h2 className="mt-3 text-4xl font-bold tracking-[-.055em]">Sign in to your farm.</h2>
//             <p className="mt-3 text-sm leading-6 text-black/45">Access your crop checks, recommendations and farm insights.</p>

//             <form onSubmit={(e) => { e.preventDefault(); window.location.href="/dashboard"; }} className="mt-8 space-y-4">
//               <label className="block">
//                 <span className="mb-2 block text-xs font-semibold text-black/55">Email address</span>
//                 <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">
//                   <Mail size={17} className="text-black/35"/>
//                   <input required type="email" placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/>
//                 </div>
//               </label>
//               <label className="block">
//                 <span className="mb-2 block text-xs font-semibold text-black/55">Password</span>
//                 <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">
//                   <LockKeyhole size={17} className="text-black/35"/>
//                   <input required type="password" placeholder="••••••••" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/>
//                 </div>
//               </label>
//               <div className="flex justify-end"><button type="button" className="text-xs font-semibold text-[#0d5b36]">Forgot password?</button></div>
//               <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d5b36] py-3.5 text-sm font-semibold text-white">Sign in <ArrowRight size={16}/></button>
//             </form>

//             <div className="my-7 flex items-center gap-3 text-xs text-black/30"><span className="h-px flex-1 bg-black/10"/><span>or</span><span className="h-px flex-1 bg-black/10"/></div>
//             <Link href="/dashboard" className="block w-full rounded-xl border border-black/10 bg-white py-3.5 text-center text-sm font-semibold">Continue as demo farmer</Link>
//             <p className="mt-7 text-center text-xs text-black/40">New to AgroSense? <Link href="/dashboard" className="font-semibold text-[#0d5b36]">Explore the demo</Link></p>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }
