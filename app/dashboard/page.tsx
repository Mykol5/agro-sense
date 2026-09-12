
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Camera,
  ChevronRight,
  CloudRain,
  Droplets,
  Leaf,
  LineChart,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sprout,
  Sun,
  Thermometer,
  TrendingUp,
  User,
  Wheat,
  X,
} from "lucide-react";

import { createClient } from "../../lib/supabase/client";

const crops = [
  {
    name: "Maize",
    variety: "Maize · 2.4 hectares",
    health: 94,
    status: "Healthy",
    stage: "Vegetative",
    icon: "🌽",
  },
  {
    name: "Tomato",
    variety: "Tomato · 1.1 hectares",
    health: 82,
    status: "Watch",
    stage: "Flowering",
    icon: "🍅",
  },
  {
    name: "Cassava",
    variety: "Cassava · 3.2 hectares",
    health: 97,
    status: "Healthy",
    stage: "Root development",
    icon: "🌿",
  },
];

const marketData = [
  {
    crop: "Maize",
    market: "Kano Central",
    price: "₦1,180",
    change: "+8.4%",
    up: true,
  },
  {
    crop: "Tomato",
    market: "Lagos Mile 12",
    price: "₦72,500",
    change: "+5.2%",
    up: true,
  },
  {
    crop: "Cassava",
    market: "Ibadan",
    price: "₦540",
    change: "-2.1%",
    up: false,
  },
];

type Profile = {
  full_name: string | null;
  phone: string | null;
  farm_name: string | null;
  location: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email ?? "");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, phone, farm_name, location")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      setLoadingUser(false);
    };

    loadUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  const fullName =
    profile?.full_name ||
    "Farmer";

  const firstName =
    fullName.split(" ")[0] || "Farmer";

  const farmName =
    profile?.farm_name ||
    "Your farm";

  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-black/5 bg-[#113f29] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0d5b36]">
              <Leaf size={19} />
            </span>

            <span className="font-bold tracking-[-.04em]">
              AgroSense <span className="text-[#a8d7b8]">AI</span>
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-white/50 hover:bg-white/10 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-5">
          <div className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/35">
            Workspace
          </div>

          <SidebarItem
            href="/dashboard"
            icon={<Activity size={18} />}
            label="Overview"
            active
          />

          <SidebarItem
            href="/doctor"
            icon={<Camera size={18} />}
            label="Crop Doctor"
            badge="AI"
          />

          <SidebarItem
            href="/dashboard/intelligence"
            icon={<CloudRain size={18} />}
            label="Farm Intelligence"
          />

          <SidebarItem
            href="/dashboard/market"
            icon={<LineChart size={18} />}
            label="Smart Market"
          />

          <SidebarItem
            href="/dashboard/ask"
            icon={<MessageCircle size={18} />}
            label="Ask AgroSense"
          />

          <div className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[.18em] text-white/35">
            Farm
          </div>

          <SidebarItem
            href="/dashboard/farms"
            icon={<Sprout size={18} />}
            label="My Farms"
          />

          <SidebarItem
            href="/dashboard/alerts"
            icon={<Bell size={18} />}
            label="Alerts"
            badge="3"
          />
        </div>

        {/* User area */}
        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-white/[.07] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#c8ddc8] text-[#113f29]">
                <User size={18} />
              </div>

              <div className="min-w-0">
                {loadingUser ? (
                  <>
                    <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                    <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-white/10" />
                  </>
                ) : (
                  <>
                    <div className="truncate text-sm font-semibold">
                      {fullName}
                    </div>

                    <div className="truncate text-xs text-white/40">
                      {farmName}
                    </div>
                  </>
                )}
              </div>
            </div>

            <Link
              href="/dashboard/settings"
              className="mt-4 flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-white/50 hover:bg-white/5 hover:text-white"
            >
              <Settings size={15} />
              Settings
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs text-white/50 transition hover:bg-white/5 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loggingOut ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <LogOut size={15} />
              )}

              {loggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[270px]">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/5 bg-[#f7f5ee]/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-black/5 bg-white p-2.5 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="hidden items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2 md:flex">
              <Search size={16} className="text-black/30" />

              <input
                placeholder="Search your farm..."
                className="w-48 bg-transparent text-sm outline-none placeholder:text-black/30"
              />
            </div>

            <div className="md:hidden">
              <div className="text-xs text-black/35">
                Tuesday, September 8
              </div>

              <div className="font-semibold">
                {loadingUser
                  ? "Good morning"
                  : `Good morning, ${firstName}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white text-black/50">
              <Bell size={18} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#dc6b45]" />
            </button>

            <div className="hidden h-9 w-px bg-black/10 sm:block" />

            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <div className="text-sm font-semibold">
                  {loadingUser ? "Loading..." : fullName}
                </div>

                <div className="max-w-[220px] truncate text-[11px] text-black/40">
                  {userEmail || "Farm owner"}
                </div>
              </div>

              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d6e5d6] text-[#0d5b36]">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8 lg:px-10">

          {/* Greeting */}
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="hidden text-sm text-black/40 md:block">
                Tuesday, September 8, 2026
              </div>

              <h1 className="mt-1 text-3xl font-bold tracking-[-.055em] sm:text-4xl">
                {loadingUser
                  ? "Good morning."
                  : `Good morning, ${firstName}.`}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
                Your farm is looking good today. Here&apos;s what AgroSense
                thinks you should know.
              </p>
            </div>

            <Link
              href="/doctor"
              className="flex w-fit items-center gap-2 rounded-full bg-[#0d5b36] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0d5b36]/10"
            >
              <Camera size={16} />
              Check a crop
            </Link>
          </section>

          {/* Alert */}
          <section className="mt-7 rounded-[22px] border border-[#e5c78e] bg-[#fff9e9] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1dfae] text-[#85641b]">
                <CloudRain size={19} />
              </div>

              <div className="flex-1">
                <div className="text-sm font-bold">
                  Rain expected tomorrow
                </div>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  AgroSense recommends holding off on irrigation today and
                  checking your tomato field after the rainfall.
                </p>
              </div>

              <button className="flex items-center gap-1 text-xs font-semibold text-[#765b17]">
                View recommendation <ChevronRight size={14} />
              </button>
            </div>
          </section>

          {/* KPI cards */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Farm health"
              value="92%"
              label="Overall crop health"
              icon={<ShieldCheck size={18} />}
              trend="+3.2%"
              positive
            />

            <MetricCard
              title="Active crops"
              value="3"
              label="Across 6.7 hectares"
              icon={<Wheat size={18} />}
              trend="Healthy"
              positive
            />

            <MetricCard
              title="Rain forecast"
              value="18mm"
              label="Expected tomorrow"
              icon={<CloudRain size={18} />}
              trend="Good timing"
              positive
            />

            <MetricCard
              title="Market outlook"
              value="+8.4%"
              label="Maize price this week"
              icon={<TrendingUp size={18} />}
              trend="Favourable"
              positive
            />
          </section>

          {/* Main grid */}
          <section className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">

            {/* Farm health */}
            <div className="rounded-[26px] border border-black/6 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold tracking-[-.03em]">
                    Your crops
                  </h2>

                  <p className="mt-1 text-xs text-black/40">
                    Health overview across your active fields
                  </p>
                </div>

                <Link
                  href="/dashboard/farms"
                  className="text-xs font-semibold text-[#0d5b36]"
                >
                  View all
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {crops.map((crop) => (
                  <CropRow key={crop.name} {...crop} />
                ))}
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/10 py-3 text-xs font-semibold text-black/45 hover:bg-[#fafaf6]">
                <Plus size={15} />
                Add another crop
              </button>
            </div>

            {/* Weather */}
            <div className="overflow-hidden rounded-[26px] bg-[#113f29] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/45">
                    Farm weather
                  </div>

                  <div className="mt-1 text-sm font-semibold">
                    {profile?.location || "Abeokuta, Nigeria"}
                  </div>
                </div>

                <Sun size={20} className="text-[#dce6b5]" />
              </div>

              <div className="mt-7 flex items-end gap-3">
                <div className="text-6xl font-bold tracking-[-.08em]">
                  29°
                </div>

                <div className="pb-2 text-xs text-white/50">
                  Partly cloudy
                </div>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-2">
                <WeatherItem
                  icon={<Droplets size={15} />}
                  value="74%"
                  label="Humidity"
                />

                <WeatherItem
                  icon={<CloudRain size={15} />}
                  value="18mm"
                  label="Rain"
                />

                <WeatherItem
                  icon={<Thermometer size={15} />}
                  value="32°"
                  label="High"
                />
              </div>

              <div className="mt-5 rounded-2xl bg-white/[.08] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <ShieldCheck size={15} />
                  AgroSense recommendation
                </div>

                <p className="mt-2 text-xs leading-5 text-white/50">
                  Weather conditions are favourable for field inspection
                  today. Avoid unnecessary irrigation before tomorrow&apos;s
                  rainfall.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom grid */}
          <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">

            {/* Market */}
            <div className="rounded-[26px] border border-black/6 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold tracking-[-.03em]">
                    Smart Market
                  </h2>

                  <p className="mt-1 text-xs text-black/40">
                    Latest market signals for your crops
                  </p>
                </div>

                <Link
                  href="/dashboard/market"
                  className="flex items-center gap-1 text-xs font-semibold text-[#0d5b36]"
                >
                  Explore market <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[500px] text-left">
                  <thead>
                    <tr className="border-b border-black/6 text-[10px] uppercase tracking-[.12em] text-black/30">
                      <th className="pb-3 font-semibold">Crop</th>
                      <th className="pb-3 font-semibold">Market</th>
                      <th className="pb-3 font-semibold">Price</th>
                      <th className="pb-3 text-right font-semibold">
                        7 days
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {marketData.map((item) => (
                      <tr
                        key={item.crop}
                        className="border-b border-black/5 last:border-0"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#edf3e9] text-sm">
                              {item.crop === "Maize"
                                ? "🌽"
                                : item.crop === "Tomato"
                                ? "🍅"
                                : "🌿"}
                            </span>

                            <span className="text-sm font-semibold">
                              {item.crop}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 text-xs text-black/45">
                          {item.market}
                        </td>

                        <td className="py-4 text-sm font-semibold">
                          {item.price}
                        </td>

                        <td className="py-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                              item.up
                                ? "bg-[#e7f2e9] text-[#0d6b3f]"
                                : "bg-[#fae9e4] text-[#a24e38]"
                            }`}
                          >
                            {item.up ? (
                              <ArrowUpRight size={12} />
                            ) : (
                              <ArrowDownRight size={12} />
                            )}

                            {item.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI activity */}
            <div className="rounded-[26px] border border-black/6 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold tracking-[-.03em]">
                    Recent AI activity
                  </h2>

                  <p className="mt-1 text-xs text-black/40">
                    Your latest AgroSense insights
                  </p>
                </div>

                <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-black/5">
                  <MoreHorizontal size={17} />
                </button>
              </div>

              <div className="mt-5 space-y-2">
                <ActivityItem
                  icon={<Camera size={16} />}
                  title="Tomato crop analysed"
                  description="Possible early blight detected"
                  time="2h ago"
                  color="orange"
                />

                <ActivityItem
                  icon={<CloudRain size={16} />}
                  title="Weather recommendation"
                  description="Rain expected tomorrow"
                  time="5h ago"
                  color="blue"
                />

                <ActivityItem
                  icon={<LineChart size={16} />}
                  title="Market insight"
                  description="Maize prices trending upward"
                  time="Yesterday"
                  color="green"
                />
              </div>

              <Link
                href="/dashboard/ask"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#f3f4ed] py-3 text-xs font-semibold text-[#0d5b36]"
              >
                <MessageCircle size={15} />
                Ask AgroSense something
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-6 overflow-hidden rounded-[28px] bg-[#dfe9dc] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-[#0d5b36]">
                  <SparkleIcon />
                  AI-powered farming
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-[-.045em] sm:text-3xl">
                  Something wrong with a crop?
                  <br />
                  Let&apos;s take a closer look.
                </h2>

                <p className="mt-3 text-sm leading-6 text-black/45">
                  Take a clear photo of the affected leaf, stem or fruit and
                  AgroSense will help you understand what might be happening.
                </p>
              </div>

              <Link
                href="/doctor"
                className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#0d5b36] px-6 py-3.5 text-sm font-semibold text-white"
              >
                <Camera size={17} />
                Open Crop Doctor
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>

          <footer className="pb-8 pt-10 text-center text-[11px] text-black/30">
            AgroSense AI · AI for farmers. Better decisions. Less waste. More
            income.
          </footer>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function SidebarItem({
  href,
  icon,
  label,
  active,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "bg-white text-[#113f29] shadow-sm"
          : "text-white/55 hover:bg-white/[.07] hover:text-white"
      }`}
    >
      {icon}

      <span className="flex-1">{label}</span>

      {badge && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            active
              ? "bg-[#dceadd] text-[#0d5b36]"
              : "bg-white/10 text-white/55"
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

function MetricCard({
  title,
  value,
  label,
  icon,
  trend,
  positive,
}: {
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  trend: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-[22px] border border-black/6 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e9f1e9] text-[#0d5b36]">
          {icon}
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            positive
              ? "bg-[#e7f2e9] text-[#0d6b3f]"
              : "bg-black/5 text-black/40"
          }`}
        >
          {trend}
        </span>
      </div>

      <div className="mt-5 text-[11px] font-medium text-black/35">
        {title}
      </div>

      <div className="mt-1 text-3xl font-bold tracking-[-.055em]">
        {value}
      </div>

      <div className="mt-1 text-xs text-black/40">
        {label}
      </div>
    </div>
  );
}

function CropRow({
  name,
  variety,
  health,
  status,
  stage,
  icon,
}: {
  name: string;
  variety: string;
  health: number;
  status: string;
  stage: string;
  icon: string;
}) {
  return (
    <Link
      href="/dashboard/farms"
      className="group flex items-center gap-4 rounded-2xl border border-black/5 p-3 transition hover:border-[#0d5b36]/15 hover:bg-[#fafbf7]"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#edf3e9] text-xl">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold">{name}</span>

          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
              status === "Healthy"
                ? "bg-[#e7f2e9] text-[#0d6b3f]"
                : "bg-[#fff1dc] text-[#91611c]"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mt-1 text-[11px] text-black/35">
          {variety}
        </div>

        <div className="mt-2 h-1.5 max-w-[220px] overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-[#0d6b3f]"
            style={{ width: `${health}%` }}
          />
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <div className="text-lg font-bold">{health}%</div>
        <div className="text-[10px] text-black/35">{stage}</div>
      </div>

      <ChevronRight
        size={16}
        className="text-black/20 transition group-hover:translate-x-0.5 group-hover:text-[#0d5b36]"
      />
    </Link>
  );
}

function WeatherItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white/[.08] p-3">
      <div className="text-white/45">{icon}</div>

      <div className="mt-2 text-sm font-semibold">
        {value}
      </div>

      <div className="mt-0.5 text-[10px] text-white/35">
        {label}
      </div>
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  description,
  time,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  color: "orange" | "blue" | "green";
}) {
  const backgrounds = {
    orange: "bg-[#faece6] text-[#a45239]",
    blue: "bg-[#e8eff4] text-[#466d83]",
    green: "bg-[#e7f2e9] text-[#0d6b3f]",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-[#fafaf6]">
      <div
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${backgrounds[color]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold">
          {title}
        </div>

        <div className="mt-0.5 truncate text-[10px] text-black/35">
          {description}
        </div>
      </div>

      <div className="shrink-0 text-[10px] text-black/25">
        {time}
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0d5b36] text-white">
      <span className="text-[9px]">✦</span>
    </span>
  );
}


// "use client";

// import Link from "next/link";
// import {
//   Activity,
//   ArrowDownRight,
//   ArrowUpRight,
//   Bell,
//   Camera,
//   ChevronRight,
//   CloudRain,
//   Droplets,
//   Leaf,
//   LineChart,
//   Menu,
//   MessageCircle,
//   MoreHorizontal,
//   Plus,
//   Search,
//   Settings,
//   ShieldCheck,
//   Sprout,
//   Sun,
//   Thermometer,
//   TrendingUp,
//   User,
//   Wheat,
//   X,
// } from "lucide-react";
// import { useState } from "react";

// const crops = [
//   {
//     name: "Maize",
//     variety: "Maize · 2.4 hectares",
//     health: 94,
//     status: "Healthy",
//     stage: "Vegetative",
//     icon: "🌽",
//   },
//   {
//     name: "Tomato",
//     variety: "Tomato · 1.1 hectares",
//     health: 82,
//     status: "Watch",
//     stage: "Flowering",
//     icon: "🍅",
//   },
//   {
//     name: "Cassava",
//     variety: "Cassava · 3.2 hectares",
//     health: 97,
//     status: "Healthy",
//     stage: "Root development",
//     icon: "🌿",
//   },
// ];

// const marketData = [
//   { crop: "Maize", market: "Kano Central", price: "₦1,180", change: "+8.4%", up: true },
//   { crop: "Tomato", market: "Lagos Mile 12", price: "₦72,500", change: "+5.2%", up: true },
//   { crop: "Cassava", market: "Ibadan", price: "₦540", change: "-2.1%", up: false },
// ];

// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <button
//           aria-label="Close menu"
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 z-40 bg-black/30 lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-black/5 bg-[#113f29] text-white transition-transform duration-300 lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex h-20 items-center justify-between px-6">
//           <Link href="/" className="flex items-center gap-2.5">
//             <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0d5b36]">
//               <Leaf size={19} />
//             </span>
//             <span className="font-bold tracking-[-.04em]">
//               AgroSense <span className="text-[#a8d7b8]">AI</span>
//             </span>
//           </Link>

//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="rounded-lg p-2 text-white/50 hover:bg-white/10 lg:hidden"
//           >
//             <X size={19} />
//           </button>
//         </div>

//         <div className="px-4 pt-5">
//           <div className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/35">
//             Workspace
//           </div>

//           <SidebarItem
//             href="/dashboard"
//             icon={<Activity size={18} />}
//             label="Overview"
//             active
//           />

//           <SidebarItem
//             href="/doctor"
//             icon={<Camera size={18} />}
//             label="Crop Doctor"
//             badge="AI"
//           />

//           <SidebarItem
//             href="/dashboard/intelligence"
//             icon={<CloudRain size={18} />}
//             label="Farm Intelligence"
//           />

//           <SidebarItem
//             href="/dashboard/market"
//             icon={<LineChart size={18} />}
//             label="Smart Market"
//           />

//           <SidebarItem
//             href="/dashboard/ask"
//             icon={<MessageCircle size={18} />}
//             label="Ask AgroSense"
//           />

//           <div className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[.18em] text-white/35">
//             Farm
//           </div>

//           <SidebarItem
//             href="/dashboard/farms"
//             icon={<Sprout size={18} />}
//             label="My Farms"
//           />

//           <SidebarItem
//             href="/dashboard/alerts"
//             icon={<Bell size={18} />}
//             label="Alerts"
//             badge="3"
//           />
//         </div>

//         <div className="mt-auto p-4">
//           <div className="rounded-2xl bg-white/[.07] p-4">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 place-items-center rounded-full bg-[#c8ddc8] text-[#113f29]">
//                 <User size={18} />
//               </div>

//               <div className="min-w-0">
//                 <div className="truncate text-sm font-semibold">
//                   David Okafor
//                 </div>
//                 <div className="truncate text-xs text-white/40">
//                   Green Valley Farm
//                 </div>
//               </div>
//             </div>

//             <Link
//               href="/dashboard/settings"
//               className="mt-4 flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-white/50 hover:bg-white/5 hover:text-white"
//             >
//               <Settings size={15} />
//               Settings
//             </Link>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="lg:pl-[270px]">
//         {/* Top bar */}
//         <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/5 bg-[#f7f5ee]/90 px-5 backdrop-blur-xl sm:px-8">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="rounded-xl border border-black/5 bg-white p-2.5 lg:hidden"
//             >
//               <Menu size={20} />
//             </button>

//             <div className="hidden items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2 md:flex">
//               <Search size={16} className="text-black/30" />
//               <input
//                 placeholder="Search your farm..."
//                 className="w-48 bg-transparent text-sm outline-none placeholder:text-black/30"
//               />
//             </div>

//             <div className="md:hidden">
//               <div className="text-xs text-black/35">Tuesday, September 8</div>
//               <div className="font-semibold">Good morning, David</div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button className="relative grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white text-black/50">
//               <Bell size={18} />
//               <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#dc6b45]" />
//             </button>

//             <div className="hidden h-9 w-px bg-black/10 sm:block" />

//             <div className="hidden items-center gap-3 sm:flex">
//               <div className="text-right">
//                 <div className="text-sm font-semibold">David Okafor</div>
//                 <div className="text-[11px] text-black/40">
//                   Farm owner
//                 </div>
//               </div>

//               <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d6e5d6] text-[#0d5b36]">
//                 <User size={18} />
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8 lg:px-10">
//           {/* Greeting */}
//           <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
//             <div>
//               <div className="hidden text-sm text-black/40 md:block">
//                 Tuesday, September 8, 2026
//               </div>

//               <h1 className="mt-1 text-3xl font-bold tracking-[-.055em] sm:text-4xl">
//                 Good morning, David.
//               </h1>

//               <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
//                 Your farm is looking good today. Here&apos;s what AgroSense
//                 thinks you should know.
//               </p>
//             </div>

//             <Link
//               href="/doctor"
//               className="flex w-fit items-center gap-2 rounded-full bg-[#0d5b36] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0d5b36]/10"
//             >
//               <Camera size={16} />
//               Check a crop
//             </Link>
//           </section>

//           {/* Alert */}
//           <section className="mt-7 rounded-[22px] border border-[#e5c78e] bg-[#fff9e9] p-4 sm:p-5">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1dfae] text-[#85641b]">
//                 <CloudRain size={19} />
//               </div>

//               <div className="flex-1">
//                 <div className="text-sm font-bold">
//                   Rain expected tomorrow
//                 </div>
//                 <p className="mt-1 text-xs leading-5 text-black/45">
//                   AgroSense recommends holding off on irrigation today and
//                   checking your tomato field after the rainfall.
//                 </p>
//               </div>

//               <button className="flex items-center gap-1 text-xs font-semibold text-[#765b17]">
//                 View recommendation <ChevronRight size={14} />
//               </button>
//             </div>
//           </section>

//           {/* KPI cards */}
//           <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             <MetricCard
//               title="Farm health"
//               value="92%"
//               label="Overall crop health"
//               icon={<ShieldCheck size={18} />}
//               trend="+3.2%"
//               positive
//             />

//             <MetricCard
//               title="Active crops"
//               value="3"
//               label="Across 6.7 hectares"
//               icon={<Wheat size={18} />}
//               trend="Healthy"
//               positive
//             />

//             <MetricCard
//               title="Rain forecast"
//               value="18mm"
//               label="Expected tomorrow"
//               icon={<CloudRain size={18} />}
//               trend="Good timing"
//               positive
//             />

//             <MetricCard
//               title="Market outlook"
//               value="+8.4%"
//               label="Maize price this week"
//               icon={<TrendingUp size={18} />}
//               trend="Favourable"
//               positive
//             />
//           </section>

//           {/* Main grid */}
//           <section className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
//             {/* Farm health */}
//             <div className="rounded-[26px] border border-black/6 bg-white p-5 sm:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="font-bold tracking-[-.03em]">
//                     Your crops
//                   </h2>
//                   <p className="mt-1 text-xs text-black/40">
//                     Health overview across your active fields
//                   </p>
//                 </div>

//                 <Link
//                   href="/dashboard/farms"
//                   className="text-xs font-semibold text-[#0d5b36]"
//                 >
//                   View all
//                 </Link>
//               </div>

//               <div className="mt-6 space-y-3">
//                 {crops.map((crop) => (
//                   <CropRow key={crop.name} {...crop} />
//                 ))}
//               </div>

//               <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/10 py-3 text-xs font-semibold text-black/45 hover:bg-[#fafaf6]">
//                 <Plus size={15} />
//                 Add another crop
//               </button>
//             </div>

//             {/* Weather */}
//             <div className="overflow-hidden rounded-[26px] bg-[#113f29] p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-white/45">Farm weather</div>
//                   <div className="mt-1 text-sm font-semibold">
//                     Abeokuta, Nigeria
//                   </div>
//                 </div>

//                 <Sun size={20} className="text-[#dce6b5]" />
//               </div>

//               <div className="mt-7 flex items-end gap-3">
//                 <div className="text-6xl font-bold tracking-[-.08em]">
//                   29°
//                 </div>
//                 <div className="pb-2 text-xs text-white/50">
//                   Partly cloudy
//                 </div>
//               </div>

//               <div className="mt-7 grid grid-cols-3 gap-2">
//                 <WeatherItem
//                   icon={<Droplets size={15} />}
//                   value="74%"
//                   label="Humidity"
//                 />
//                 <WeatherItem
//                   icon={<CloudRain size={15} />}
//                   value="18mm"
//                   label="Rain"
//                 />
//                 <WeatherItem
//                   icon={<Thermometer size={15} />}
//                   value="32°"
//                   label="High"
//                 />
//               </div>

//               <div className="mt-5 rounded-2xl bg-white/[.08] p-4">
//                 <div className="flex items-center gap-2 text-xs font-semibold">
//                   <ShieldCheck size={15} />
//                   AgroSense recommendation
//                 </div>
//                 <p className="mt-2 text-xs leading-5 text-white/50">
//                   Weather conditions are favourable for field inspection
//                   today. Avoid unnecessary irrigation before tomorrow&apos;s
//                   rainfall.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Bottom grid */}
//           <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
//             {/* Market */}
//             <div className="rounded-[26px] border border-black/6 bg-white p-5 sm:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="font-bold tracking-[-.03em]">
//                     Smart Market
//                   </h2>
//                   <p className="mt-1 text-xs text-black/40">
//                     Latest market signals for your crops
//                   </p>
//                 </div>

//                 <Link
//                   href="/dashboard/market"
//                   className="flex items-center gap-1 text-xs font-semibold text-[#0d5b36]"
//                 >
//                   Explore market <ArrowUpRight size={14} />
//                 </Link>
//               </div>

//               <div className="mt-6 overflow-x-auto">
//                 <table className="w-full min-w-[500px] text-left">
//                   <thead>
//                     <tr className="border-b border-black/6 text-[10px] uppercase tracking-[.12em] text-black/30">
//                       <th className="pb-3 font-semibold">Crop</th>
//                       <th className="pb-3 font-semibold">Market</th>
//                       <th className="pb-3 font-semibold">Price</th>
//                       <th className="pb-3 text-right font-semibold">
//                         7 days
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {marketData.map((item) => (
//                       <tr
//                         key={item.crop}
//                         className="border-b border-black/5 last:border-0"
//                       >
//                         <td className="py-4">
//                           <div className="flex items-center gap-3">
//                             <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#edf3e9] text-sm">
//                               {item.crop === "Maize"
//                                 ? "🌽"
//                                 : item.crop === "Tomato"
//                                 ? "🍅"
//                                 : "🌿"}
//                             </span>
//                             <span className="text-sm font-semibold">
//                               {item.crop}
//                             </span>
//                           </div>
//                         </td>

//                         <td className="py-4 text-xs text-black/45">
//                           {item.market}
//                         </td>

//                         <td className="py-4 text-sm font-semibold">
//                           {item.price}
//                         </td>

//                         <td className="py-4 text-right">
//                           <span
//                             className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
//                               item.up
//                                 ? "bg-[#e7f2e9] text-[#0d6b3f]"
//                                 : "bg-[#fae9e4] text-[#a24e38]"
//                             }`}
//                           >
//                             {item.up ? (
//                               <ArrowUpRight size={12} />
//                             ) : (
//                               <ArrowDownRight size={12} />
//                             )}
//                             {item.change}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* AI activity */}
//             <div className="rounded-[26px] border border-black/6 bg-white p-5 sm:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="font-bold tracking-[-.03em]">
//                     Recent AI activity
//                   </h2>
//                   <p className="mt-1 text-xs text-black/40">
//                     Your latest AgroSense insights
//                   </p>
//                 </div>

//                 <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-black/5">
//                   <MoreHorizontal size={17} />
//                 </button>
//               </div>

//               <div className="mt-5 space-y-2">
//                 <ActivityItem
//                   icon={<Camera size={16} />}
//                   title="Tomato crop analysed"
//                   description="Possible early blight detected"
//                   time="2h ago"
//                   color="orange"
//                 />

//                 <ActivityItem
//                   icon={<CloudRain size={16} />}
//                   title="Weather recommendation"
//                   description="Rain expected tomorrow"
//                   time="5h ago"
//                   color="blue"
//                 />

//                 <ActivityItem
//                   icon={<LineChart size={16} />}
//                   title="Market insight"
//                   description="Maize prices trending upward"
//                   time="Yesterday"
//                   color="green"
//                 />
//               </div>

//               <Link
//                 href="/dashboard/ask"
//                 className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#f3f4ed] py-3 text-xs font-semibold text-[#0d5b36]"
//               >
//                 <MessageCircle size={15} />
//                 Ask AgroSense something
//               </Link>
//             </div>
//           </section>

//           {/* CTA */}
//           <section className="mt-6 overflow-hidden rounded-[28px] bg-[#dfe9dc] p-6 sm:p-8">
//             <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
//               <div className="max-w-xl">
//                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-[#0d5b36]">
//                   <SparkleIcon />
//                   AI-powered farming
//                 </div>

//                 <h2 className="mt-3 text-2xl font-bold tracking-[-.045em] sm:text-3xl">
//                   Something wrong with a crop?
//                   <br />
//                   Let&apos;s take a closer look.
//                 </h2>

//                 <p className="mt-3 text-sm leading-6 text-black/45">
//                   Take a clear photo of the affected leaf, stem or fruit and
//                   AgroSense will help you understand what might be happening.
//                 </p>
//               </div>

//               <Link
//                 href="/doctor"
//                 className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#0d5b36] px-6 py-3.5 text-sm font-semibold text-white"
//               >
//                 <Camera size={17} />
//                 Open Crop Doctor
//                 <ArrowUpRight size={15} />
//               </Link>
//             </div>
//           </section>

//           <footer className="pb-8 pt-10 text-center text-[11px] text-black/30">
//             AgroSense AI · AI for farmers. Better decisions. Less waste. More
//             income.
//           </footer>
//         </div>
//       </div>
//     </main>
//   );
// }

// /* ---------------- Components ---------------- */

// function SidebarItem({
//   href,
//   icon,
//   label,
//   active,
//   badge,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   active?: boolean;
//   badge?: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
//         active
//           ? "bg-white text-[#113f29] shadow-sm"
//           : "text-white/55 hover:bg-white/[.07] hover:text-white"
//       }`}
//     >
//       {icon}
//       <span className="flex-1">{label}</span>

//       {badge && (
//         <span
//           className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
//             active
//               ? "bg-[#dceadd] text-[#0d5b36]"
//               : "bg-white/10 text-white/55"
//           }`}
//         >
//           {badge}
//         </span>
//       )}
//     </Link>
//   );
// }

// function MetricCard({
//   title,
//   value,
//   label,
//   icon,
//   trend,
//   positive,
// }: {
//   title: string;
//   value: string;
//   label: string;
//   icon: React.ReactNode;
//   trend: string;
//   positive?: boolean;
// }) {
//   return (
//     <div className="rounded-[22px] border border-black/6 bg-white p-5">
//       <div className="flex items-center justify-between">
//         <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e9f1e9] text-[#0d5b36]">
//           {icon}
//         </div>

//         <span
//           className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
//             positive
//               ? "bg-[#e7f2e9] text-[#0d6b3f]"
//               : "bg-black/5 text-black/40"
//           }`}
//         >
//           {trend}
//         </span>
//       </div>

//       <div className="mt-5 text-[11px] font-medium text-black/35">
//         {title}
//       </div>

//       <div className="mt-1 text-3xl font-bold tracking-[-.055em]">
//         {value}
//       </div>

//       <div className="mt-1 text-xs text-black/40">{label}</div>
//     </div>
//   );
// }

// function CropRow({
//   name,
//   variety,
//   health,
//   status,
//   stage,
//   icon,
// }: {
//   name: string;
//   variety: string;
//   health: number;
//   status: string;
//   stage: string;
//   icon: string;
// }) {
//   return (
//     <Link
//       href="/dashboard/farms"
//       className="group flex items-center gap-4 rounded-2xl border border-black/5 p-3 transition hover:border-[#0d5b36]/15 hover:bg-[#fafbf7]"
//     >
//       <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#edf3e9] text-xl">
//         {icon}
//       </div>

//       <div className="min-w-0 flex-1">
//         <div className="flex flex-wrap items-center gap-2">
//           <span className="text-sm font-bold">{name}</span>

//           <span
//             className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
//               status === "Healthy"
//                 ? "bg-[#e7f2e9] text-[#0d6b3f]"
//                 : "bg-[#fff1dc] text-[#91611c]"
//             }`}
//           >
//             {status}
//           </span>
//         </div>

//         <div className="mt-1 text-[11px] text-black/35">{variety}</div>

//         <div className="mt-2 h-1.5 max-w-[220px] overflow-hidden rounded-full bg-black/5">
//           <div
//             className="h-full rounded-full bg-[#0d6b3f]"
//             style={{ width: `${health}%` }}
//           />
//         </div>
//       </div>

//       <div className="hidden text-right sm:block">
//         <div className="text-lg font-bold">{health}%</div>
//         <div className="text-[10px] text-black/35">{stage}</div>
//       </div>

//       <ChevronRight
//         size={16}
//         className="text-black/20 transition group-hover:translate-x-0.5 group-hover:text-[#0d5b36]"
//       />
//     </Link>
//   );
// }

// function WeatherItem({
//   icon,
//   value,
//   label,
// }: {
//   icon: React.ReactNode;
//   value: string;
//   label: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white/[.08] p-3">
//       <div className="text-white/45">{icon}</div>
//       <div className="mt-2 text-sm font-semibold">{value}</div>
//       <div className="mt-0.5 text-[10px] text-white/35">{label}</div>
//     </div>
//   );
// }

// function ActivityItem({
//   icon,
//   title,
//   description,
//   time,
//   color,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   time: string;
//   color: "orange" | "blue" | "green";
// }) {
//   const backgrounds = {
//     orange: "bg-[#faece6] text-[#a45239]",
//     blue: "bg-[#e8eff4] text-[#466d83]",
//     green: "bg-[#e7f2e9] text-[#0d6b3f]",
//   };

//   return (
//     <div className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-[#fafaf6]">
//       <div
//         className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${backgrounds[color]}`}
//       >
//         {icon}
//       </div>

//       <div className="min-w-0 flex-1">
//         <div className="truncate text-xs font-semibold">{title}</div>
//         <div className="mt-0.5 truncate text-[10px] text-black/35">
//           {description}
//         </div>
//       </div>

//       <div className="shrink-0 text-[10px] text-black/25">{time}</div>
//     </div>
//   );
// }

// function SparkleIcon() {
//   return (
//     <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0d5b36] text-white">
//       <span className="text-[9px]">✦</span>
//     </span>
//   );
// }
