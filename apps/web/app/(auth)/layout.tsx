export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary/95 to-primary/80 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary-foreground/[0.05] bg-size-[32px_32px]" />
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-primary-foreground text-2xl font-bold">
                C
              </span>
            </div>
            <span className="text-primary-foreground text-2xl font-semibold">
              CollabSpace
            </span>
          </div>
          <div className="max-w-md">
            <h1 className="text-primary-foreground mb-4 text-4xl font-bold">
              Collaborate smarter, deliver faster
            </h1>
            <p className="text-primary-foreground/90 text-lg">
              The modern workspace for teams to organize projects, manage tasks,
              and collaborate in real-time.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
              <div className="text-primary-foreground/90 text-sm mb-1">
                Active Projects
              </div>
              <div className="text-primary-foreground text-2xl font-semibold">
                1,234
              </div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
              <div className="text-primary-foreground/90 text-sm mb-1">
                Team Members
              </div>
              <div className="text-primary-foreground text-2xl font-semibold">
                5,678
              </div>
            </div>
          </div>
          <p className="text-primary-foreground/70 text-sm mt-6">
            Trusted by 500+ teams worldwide
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">{children}</div>
      </div>
    </div>
  );
}
