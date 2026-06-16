export default function HeroBottom() {
    return (
      <section
        className="relative overflow-hidden flex items-center justify-center w-full"
        style={{
          backgroundImage: "url('/images/Group.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "clamp(300px, 50vw, 520px)",
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6 py-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Your next role is<br />already looking for you
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-xs md:max-w-md leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button className="px-5 md:px-7 py-2.5 md:py-3 bg-white text-[#0a0a0f] text-xs md:text-sm font-semibold rounded-xl hover:bg-zinc-100 transition">
              Create a free account
            </button>
            <button className="px-5 md:px-7 py-2.5 md:py-3 bg-[#1a1a2e] border border-zinc-700 text-white text-xs md:text-sm font-medium rounded-xl hover:border-zinc-500 transition">
              View pricing
            </button>
          </div>
        </div>
      </section>
    );
  }