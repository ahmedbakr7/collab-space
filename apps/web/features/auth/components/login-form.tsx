'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { FormCheckbox } from '@/shared/components/form/checkbox';
import { ROUTES } from '@/shared/config/routes';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (values: LoginValues) => {
    // Validate and submit logic here
    console.log('Logging in with', values.email, values.password);
    // Simulate login success
    router.push(ROUTES.ROOT);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to your CollabSpace account
        </p>
      </div>

      <Form<LoginValues>
        onSubmit={handleSubmit}
        defaultValues={{
          email: '',
          password: '',
          remember: false,
        }}
        resolver={zodResolver(loginSchema)}
        className="space-y-4"
      >
        {(form) => (
          <>
            <FormInput
              control={form.control}
              name="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              startContent={<Mail className="w-5 h-5 text-muted-foreground" />}
              className="space-y-2"
            />

            <FormInput
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              startContent={<Lock className="w-5 h-5 text-muted-foreground" />}
              className="space-y-2"
              requiredMarker
            />

            <div className="flex items-center justify-between">
              <FormCheckbox
                control={form.control}
                name="remember"
                label="Remember me"
                className="space-y-0"
              />
              <Link
                href={ROUTES.AUTH.FORGOT_PASSWORD}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </>
        )}
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href={ROUTES.AUTH.SIGNUP}
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
