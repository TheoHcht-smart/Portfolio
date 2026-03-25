export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_55%)]" />

      <div className="relative flex flex-col items-center gap-5 px-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/20 animate-ping" />
          <span className="h-14 w-14 rounded-full border-4 border-primary/25 border-t-primary animate-spin" />
        </div>

        <p className="text-2xl md:text-4xl font-extrabold tracking-wide text-foreground text-center leading-tight">
          <span className="inline-block opacity-0 animate-fade-in-delay-1">Théo</span>{" "}
          <span className="inline-block opacity-0 animate-fade-in-delay-2">développeur</span>{" "}
          <span className="inline-block opacity-0 animate-fade-in-delay-3">informatique</span>
        </p>

        <p className="text-base md:text-lg font-semibold tracking-wide text-foreground/90 animate-pulse">
          Loading 
        </p>

        <div className="flex items-center gap-2 opacity-0 animate-fade-in-delay-4">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
        </div>

      </div>
    </div>
  );
};
