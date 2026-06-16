export default function Spinner({ size = "md" }) {
    const sizes = {
    //   sm: "w-8 h-8 border-[2.5px]",
      md: "w-12 h-12 border-[3px]",
    //   lg: "w-16 h-16 border-[3.5px]",
    };
  
    return (
      <div className="flex items-center justify-center">
        <div
          className={`${sizes[size]} rounded-full border-violet-500/20 border-t-violet-600 animate-spin`}
        />
      </div>
    );
  }