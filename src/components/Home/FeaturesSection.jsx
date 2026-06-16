import {
    BsSearch,
    BsGraphUp,
    BsBuilding,
    BsBookmark,
    BsLightning,
    BsFileEarmarkText,
    BsBullseye,
    BsBarChartLine,
  } from "react-icons/bs";
  
  const FEATURES = [
    {
      icon: <BsSearch className="text-[18px]" />,
      title: "Smart Search",
      desc: "Find your ideal job with advanced filters.",
    },
    {
      icon: <BsGraphUp className="text-[18px]" />,
      title: "Salary Insights",
      desc: "Get real salary data to negotiate confidently.",
    },
    {
      icon: <BsBuilding className="text-[18px]" />,
      title: "Top Companies",
      desc: "Apply to vetted companies that are hiring.",
    },
    {
      icon: <BsBookmark className="text-[18px]" />,
      title: "Saved Jobs",
      desc: "Manage apps & favorites on your dashboard.",
    },
    {
      icon: <BsLightning className="text-[18px]" />,
      title: "One-Click Apply",
      desc: "Simplify your job applications for an easier process!",
    },
    {
      icon: <BsFileEarmarkText className="text-[18px]" />,
      title: "Resume Builder",
      desc: "Create professional resumes with modern templates.",
    },
    {
      icon: <BsBullseye className="text-[18px]" />,
      title: "Skill-Based Matching",
      desc: "Discover jobs that match your skills and experience.",
    },
    {
      icon: <BsBarChartLine className="text-[18px]" />,
      title: "Career Growth Resources",
      desc: "Boost your career with quick interview tips.",
    },
  ];
  
  function FeatureCard({ icon, title, desc }) {
    return (
      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-200 group">
        {/* Icon box */}
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/8 flex items-center justify-center text-white/60 group-hover:text-violet-400 group-hover:border-violet-500/20 group-hover:bg-violet-500/10 transition-all duration-200 shrink-0">
          {icon}
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] font-semibold text-white">{title}</h3>
          <p className="text-[12px] text-white/35 leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  }
  
  export default function FeaturesSection() {
    return (
      <section className="bg-[#0d0d14] py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
  
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-[0.15em]">
                Features Job
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-tight max-w-md">
              Everything you need to succeed
            </h2>
          </div>
  
          {/* Grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
  
        </div>
      </section>
    );
  }