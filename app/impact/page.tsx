import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import SiteHeader from "../../components/site-header";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#113f29] text-white">
      <SiteHeader />
      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[.18em] text-white/45">Social impact</div>
          <h1 className="mt-4 text-5xl font-bold tracking-[-.065em] sm:text-6xl">Technology that reaches beyond the screen.</h1>
          <p className="mt-6 text-lg leading-8 text-white/60">The goal is not another dashboard. It is to help farmers detect problems earlier, reduce avoidable losses, make better decisions and improve their path to income.</p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2"><div className="rounded-[26px] border border-white/10 bg-white/5 p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">Reduce crop loss</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Earlier awareness can help farmers respond before small problems become expensive ones.</p>
        </div>
<div className="rounded-[26px] border border-white/10 bg-white/5 p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">Improve access to expertise</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">A phone-based assistant can make useful agricultural guidance easier to reach.</p>
        </div>
<div className="rounded-[26px] border border-white/10 bg-white/5 p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">Support better decisions</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Weather, crop and market signals become understandable actions rather than isolated numbers.</p>
        </div>
<div className="rounded-[26px] border border-white/10 bg-white/5 p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">Design for inclusion</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Low-data patterns, voice interaction and local-language readiness keep the experience grounded in real users.</p>
        </div></div>
        <div className="mt-14 rounded-[28px] bg-white/10 p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div><div className="text-2xl font-bold tracking-[-.04em]">Experience the working prototype.</div><div className="mt-2 text-sm opacity-60">See what AgroSense feels like from the farmer’s side.</div></div>
            <Link href="/dashboard" className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d5b36]">Open AgroSense <ArrowUpRight size={16}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}