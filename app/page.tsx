import Link from "next/link";
import { ArrowUpRight, Camera, CloudSun, Leaf, LineChart, MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import SiteHeader from "../components/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">
      <SiteHeader />

      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0d5b36]/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#0d5b36]">
              <Sparkles size={13} /> AI for social impact · Agriculture
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[.97] tracking-[-.065em] sm:text-6xl lg:text-[78px]">
              A smarter way to <span className="text-[#0d5b36]">grow.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-black/55 sm:text-lg">
              AgroSense AI gives smallholder farmers an intelligent copilot for crop health,
              weather, farm decisions and better market opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 rounded-full bg-[#0d5b36] px-6 py-3.5 text-sm font-semibold text-white shadow-xl">
                Explore AgroSense <ArrowUpRight size={17} />
              </Link>
              <Link href="/features" className="rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold">
                See how it works
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-xs text-black/45">
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0d6b3f]" /> African farms</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0d6b3f]" /> Low-data friendly</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0d6b3f]" /> Voice-ready</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[34px] bg-[#113f29] p-3 shadow-[0_30px_80px_rgba(20,58,35,.18)]">
              <div className="rounded-[26px] bg-[#f7f5ee] p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div><div className="text-xs text-black/40">Good morning, David</div><div className="mt-1 text-xl font-bold">Farm overview</div></div>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#dfe9dc] text-[#0d5b36]"><Leaf size={18} /></div>
                </div>

                <div className="mt-5 rounded-2xl bg-[#0f472b] p-6 text-white">
                  <div className="text-xs text-white/55">Overall farm health</div>
                  <div className="mt-1 text-6xl font-bold tracking-[-.07em]">92%</div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/65"><ShieldCheck size={14} /> Looking healthy today</div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    ["Crop Doctor", Camera, "Ready"],
                    ["Weather", CloudSun, "29°C"],
                    ["Market", LineChart, "+8.4%"],
                  ].map(([label, Icon, value]) => (
                    <div key={String(label)} className="rounded-2xl bg-white p-3">
                      <Icon size={16} className="text-[#0d5b36]" />
                      <div className="mt-4 text-[11px] text-black/40">{String(label)}</div>
                      <div className="mt-1 text-sm font-semibold">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8f2ea] text-[#0d5b36]"><MessageCircle size={17}/></span>
                <div><div className="text-[11px] text-black/40">AI recommendation</div><div className="text-sm font-semibold">Rain expected tomorrow</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
          {[
            ["01", "Detect earlier", "Spot crop problems before they become bigger losses."],
            ["02", "Decide smarter", "Turn farm and weather signals into simple next steps."],
            ["03", "Earn better", "Understand market trends and selling opportunities."],
          ].map(([n, title, text]) => (
            <div key={n}>
              <div className="text-xs font-bold text-[#0d5b36]">{n}</div>
              <div className="mt-2 text-xl font-bold tracking-[-.03em]">{title}</div>
              <p className="mt-2 text-sm leading-6 text-black/45">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[.16em] text-[#0d5b36]">One intelligent platform</div>
          <h2 className="mt-3 text-4xl font-bold tracking-[-.05em]">Everything a farmer needs for the next decision.</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            ["Crop Doctor", "AI-assisted crop image analysis for disease and pest patterns.", Camera],
            ["Farm Intelligence", "Weather, crop stage and conditions turned into useful recommendations.", CloudSun],
            ["Smart Market", "Market prices and trends to help farmers think beyond the farm gate.", LineChart],
            ["Ask AgroSense", "Ask questions by text or voice with a farmer-friendly experience.", MessageCircle],
          ].map(([title, text, Icon]) => (
            <div key={String(title)} className="rounded-[26px] border border-black/7 bg-[#fbfaf5] p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e7f1e9] text-[#0d5b36]"><Icon size={20}/></div>
              <h3 className="mt-5 text-xl font-bold">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-black/45">{String(text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#113f29] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-7 px-5 py-16 sm:px-8 md:flex-row md:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[.16em] text-white/45">Built for impact</div>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-.05em] sm:text-4xl">
              Less waste. Better decisions. More resilient farms.
            </h2>
          </div>
          <Link href="/dashboard" className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d5b36]">
            Enter AgroSense <ArrowUpRight size={16}/>
          </Link>
        </div>
      </section>
    </main>
  );
}
