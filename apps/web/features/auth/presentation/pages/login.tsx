'use client';

import { LoginForm } from '../components/login-form';

export default function Page() {
  return (
    <div className="lg:flex flex-row justify-between h-screen">
      <div className="bg-primary hidden lg:flex flex-col justify-between p-12 pt-36 lg:w-1/2 h-full text-background">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center">
            <div className="mr-3 w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex justify-center items-center">
              <div className="font-bold text-center text-primary-foreground text-2xl">
                C
              </div>
            </div>
            <h1>CollabSpace</h1>
          </div>
          <h1 className="text-lg mb-5">Collaborate smarter, deliver faster</h1>

          <p>
            The modern workspace for teams to organize projects, manage tasks,
            and collaborate in real-time.
          </p>
        </div>
        <div>
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
      </div>
      <div className="bg-background text-sm text-muted-foreground p-9 w-full lg:w-1/2 h-full flex flex-col justify-center gap-4 max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
