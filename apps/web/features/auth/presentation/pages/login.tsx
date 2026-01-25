'use client';

import { FormComponent } from '../../shared/components/form/form';
import { z } from 'zod';
import InputField from '../../shared/components/Input/FormInput';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';
import { Button } from '@/shared/components/ui/button';
import useFormCtx from '../../shared/components/form/useFormContext';
import Link from 'next/link';
import { Checkbox } from '@/shared/components/ui/checkbox';

// Sign in form schema
const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(false),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function Page() {
  const handleSignIn = async (values: SignInFormValues) => {
    // TODO: integrate with your auth flow
    console.log('Sign in submitted', values);
  };

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
      <div className="bg-background text-sm text-muted-foreground text-center p-9 w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-foreground text-2xl">Welcome back</h1>
        <span className="text-muted-foreground text-sm">
          Sign in to your CollabSpace account
        </span>
        <FormComponent<SignInFormValues>
          formSchema={signInSchema}
          defaultValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmitAction={handleSignIn}
          className="w-full max-w-sm space-y-4 mt-6"
        >
          <InputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            // autoComplete="email"
            required
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            // autoComplete="current-password"
            // autoComplete="none"
            required
          />

          <div className="flex flex-row justify-between items-center">
            <RememberMeField />
            <span className="text-primary hover:underline cursor-pointer text-sm">
              Forgot password?
            </span>
          </div>

          <Button type="submit" className="cursor-pointer w-full">
            Sign in
          </Button>
        </FormComponent>

        <p>
          Don&apos;t have an account?{' '}
          <Link href="/" className="text-primary hover:underline font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

function RememberMeField() {
  const form = useFormCtx();
  return (
    <FormField
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name={'rememberMe' as any}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <label className="flex items-center justify-between cursor-pointer">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(v) => {
                  field.onChange(v);
                }}
                aria-label="Remember me"
              />
            </FormControl>
            <span className="ml-3 text-muted-foreground text-sm">
              Remember me
            </span>
          </label>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
