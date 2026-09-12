import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import SiteHeader from "../../components/site-header";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#16251b]">
      <SiteHeader />
      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[.18em] text-[#0d5b36]">About</div>
          <h1 className="mt-4 text-5xl font-bold tracking-[-.065em] sm:text-6xl">Built with a simple belief: farmers deserve better tools.</h1>
          <p className="mt-6 text-lg leading-8 text-black/50">AgroSense AI is an agricultural decision-support concept designed around the realities of African smallholder farming.</p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2"><div className="rounded-[26px] border border-black/7 bg-white p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f2ea] text-[#0d5b36]"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">Human first</h2>
          <p className="mt-2 text-sm leading-6 text-black/45">The farmer's next decision stays at the center of the product.</p>
        </div>
<div className="rounded-[26px] border border-black/7 bg-white p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f2ea] text-[#0d5b36]"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">AI with humility</h2>
          <p className="mt-2 text-sm leading-6 text-black/45">Assessments are presented as assistance, not certainty.</p>
        </div>
<div className="rounded-[26px] border border-black/7 bg-white p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f2ea] text-[#0d5b36]"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">Africa-first thinking</h2>
          <p className="mt-2 text-sm leading-6 text-black/45">The experience is designed for mobile access, low-data use and voice-friendly interaction.</p>
        </div>
<div className="rounded-[26px] border border-black/7 bg-white p-7">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f2ea] text-[#0d5b36]"><Leaf size={20} /></div>
          <h2 className="mt-6 text-xl font-bold">From prototype to impact</h2>
          <p className="mt-2 text-sm leading-6 text-black/45">The MVP demonstrates a path from machine-learning model to a useful product.</p>
        </div></div>
        <div className="mt-14 rounded-[28px] bg-[#113f29 text-white] p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div><div className="text-2xl font-bold tracking-[-.04em]">Experience the working prototype.</div><div className="mt-2 text-sm opacity-60">See what AgroSense feels like from the farmer’s side.</div></div>
            <Link href="/dashboard" className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d5b36]">Open AgroSense <ArrowUpRight size={16}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}