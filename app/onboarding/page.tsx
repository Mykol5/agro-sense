
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
  MapPin,
  Sprout,
  User,
} from "lucide-react";

import { createClient } from "../../lib/supabase/client";

const crops = [
  "Maize",
  "Tomato",
  "Cassava",
  "Rice",
  "Beans",
  "Pepper",
  "Yam",
  "Plantain",
  "Cocoa",
  "Other",
];

const stages = [
  "Just planted",
  "Seedling",
  "Vegetative",
  "Flowering",
  "Fruiting",
  "Maturity",
  "Harvesting",
];

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");

  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [cropArea, setCropArea] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.onboarding_completed) {
        router.replace("/dashboard");
        return;
      }

      setFullName(
        profile?.full_name ||
          user.user_metadata?.full_name ||
          ""
      );

      setPhone(profile?.phone || "");

      setLoading(false);
    };

    loadUser();
  }, [router, supabase]);

  const nextStep = () => {
    setError("");

    if (step === 1 && !fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (step === 2) {
      if (!farmName.trim()) {
        setError("Please enter your farm name.");
        return;
      }

      if (!location.trim()) {
        setError("Please enter your farm location.");
        return;
      }
    }

    setStep((current) => Math.min(current + 1, 3));
  };

  const previousStep = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const finishSetup = async () => {
    setError("");

    if (!cropName) {
      setError("Please select your main crop.");
      return;
    }

    if (!growthStage) {
      setError("Please select the crop growth stage.");
      return;
    }

    setSaving(true);

    try {
      // Update farmer profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          farm_name: farmName.trim(),
          location: location.trim(),
          onboarding_completed: true,
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      // Create farm
      const { data: farm, error: farmError } = await supabase
        .from("farms")
        .insert({
          user_id: userId,
          farm_name: farmName.trim(),
          location: location.trim(),
          farm_size: farmSize
            ? Number(farmSize)
            : null,
          farm_size_unit: "hectares",
        })
        .select("id")
        .single();

      if (farmError) {
        throw farmError;
      }

      // Create first crop
      const { error: cropError } = await supabase
        .from("farm_crops")
        .insert({
          farm_id: farm.id,
          crop_name: cropName,
          variety: variety.trim() || null,
          growth_stage: growthStage,
          area: cropArea
            ? Number(cropArea)
            : null,
        });

      if (cropError) {
        throw cropError;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(
        "We couldn't save your farm setup. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f5ee]">
        <div className="flex flex-col items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0d5b36] text-white">
            <Leaf size={22} />
          </div>

          <div className="text-sm text-black/40">
            Preparing your farm workspace...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">

      {/* Header */}
      <header className="border-b border-black/5 bg-[#f7f5ee]/90">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0d5b36] text-white">
              <Leaf size={19} />
            </span>

            <span className="font-bold tracking-[-.04em]">
              AgroSense{" "}
              <span className="text-[#0d5b36]">AI</span>
            </span>
          </Link>

          <div className="text-xs text-black/35">
            Farm setup · {step} of 3
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1 bg-black/[.04]">
        <div
          className="h-full bg-[#0d5b36] transition-all duration-500"
          style={{
            width: `${(step / 3) * 100}%`,
          }}
        />
      </div>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">

        {/* Heading */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-[.18em] text-[#0d5b36]">
            {step === 1
              ? "About you"
              : step === 2
              ? "Your farm"
              : "Your first crop"}
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-[-.06em] sm:text-5xl">
            {step === 1
              ? "Tell us about yourself."
              : step === 2
              ? "Tell us about your farm."
              : "What are you growing?"}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-black/45">
            {step === 1
              ? "A few details help us create your personalized farming workspace."
              : step === 2
              ? "This helps AgroSense understand where your farm is and how much land you manage."
              : "Start with your main crop. You can add more crops from your dashboard later."}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[28px] border border-black/6 bg-white p-6 shadow-sm sm:p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <InputField
                label="Full name"
                placeholder="Michael Kolawole"
                value={fullName}
                onChange={setFullName}
                icon={<User size={17} />}
              />

              <InputField
                label="Phone number"
                placeholder="+234 801 234 5678"
                value={phone}
                onChange={setPhone}
                icon={<span className="text-sm">+234</span>}
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <InputField
                label="Farm name"
                placeholder="Green Valley Farm"
                value={farmName}
                onChange={setFarmName}
                icon={<Sprout size={17} />}
              />

              <InputField
                label="Farm location"
                placeholder="Abeokuta, Ogun State"
                value={location}
                onChange={setLocation}
                icon={<MapPin size={17} />}
              />

              <InputField
                label="Farm size"
                placeholder="e.g. 5"
                type="number"
                value={farmSize}
                onChange={setFarmSize}
                icon={<span className="text-xs">ha</span>}
              />

              <p className="-mt-2 text-[11px] text-black/30">
                Farm size is measured in hectares.
              </p>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-xs font-semibold text-black/55">
                  Main crop
                </label>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {crops.map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => setCropName(crop)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                        cropName === crop
                          ? "border-[#0d5b36] bg-[#e7f2e9] text-[#0d5b36]"
                          : "border-black/8 bg-[#fafaf7] text-black/55 hover:border-[#0d5b36]/20"
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              <InputField
                label="Variety (optional)"
                placeholder="e.g. Oba Super 6"
                value={variety}
                onChange={setVariety}
                icon={<Leaf size={17} />}
              />

              <div>
                <label className="mb-2 block text-xs font-semibold text-black/55">
                  Growth stage
                </label>

                <select
                  value={growthStage}
                  onChange={(e) =>
                    setGrowthStage(e.target.value)
                  }
                  className="w-full rounded-xl border border-black/10 bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#0d5b36]/40 focus:ring-2 focus:ring-[#0d5b36]/10"
                >
                  <option value="">
                    Select current stage
                  </option>

                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label="Crop area (optional)"
                placeholder="e.g. 2.5"
                type="number"
                value={cropArea}
                onChange={setCropArea}
                icon={<span className="text-xs">ha</span>}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3">

            {step > 1 ? (
              <button
                type="button"
                onClick={previousStep}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-black/45 hover:bg-black/[.03] hover:text-black/70"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 rounded-xl bg-[#0d5b36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#09472a]"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={finishSetup}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[#0d5b36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#09472a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  "Setting up..."
                ) : (
                  <>
                    Finish setup
                    <Check size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-black/30">
          You can update your farm details anytime from Settings.
        </p>
      </section>
    </main>
  );
}

/* --------------------------------
   Input
-------------------------------- */

function InputField({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-black/55">
        {label}
      </span>

      <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#fafaf7] px-4 py-3 transition focus-within:border-[#0d5b36]/40 focus-within:ring-2 focus-within:ring-[#0d5b36]/10">
        <span className="text-black/30">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/25"
        />
      </div>
    </label>
  );
}

