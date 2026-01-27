'use client';

import { signUpSchema, SignUpValues } from '@repo/shared-schemas';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { FormCheckbox } from '@/shared/components/form/checkbox';
import { ROUTES } from '@/shared/config/routes';
import { useSignup } from '../hooks/use-signup';
import { toast } from 'sonner';

export function SignUpForm() {
  const router = useRouter();
  const { signup } = useSignup();

  const handleSubmit = async (values: SignUpValues) => {
    try {
      await signup(values.email, values.password, values.name, values.company);
      toast.success('Account created successfully! Please check your email.');
      router.push(ROUTES.ONBOARDING);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    }
  };

  return (
    <>
      <div className="mb-2 text-center">
        <h1 className="mb-1 text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground">
          Start collaborating with your team today
        </p>
      </div>

      <Form<SignUpValues>
        onSubmit={handleSubmit}
        defaultValues={{
          name: '',
          email: '',
          company: '',
          password: '',
          terms: undefined,
        }}
        resolver={zodResolver(signUpSchema)}
        fieldGroupClassName="gap-2"
      >
        {(form) => (
          <>
            <div className="space-y-4">
              <FormInput
                control={form.control}
                name="name"
                label="Full name"
                type="text"
                placeholder="John Doe"
                startContent={
                  <User className="w-5 h-5 text-muted-foreground" />
                }
                className="space-y-1"
              />

              <FormInput
                control={form.control}
                name="email"
                label="Email address"
                type="email"
                placeholder="you@company.com"
                startContent={
                  <Mail className="w-5 h-5 text-muted-foreground" />
                }
                className="space-y-1"
              />

              <FormInput
                control={form.control}
                name="company"
                label="Company name"
                type="text"
                placeholder="Acme Inc."
                startContent={
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                }
                className="space-y-1"
              />

              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Create a strong password"
                startContent={
                  <Lock className="w-5 h-5 text-muted-foreground" />
                }
                className="space-y-1"
              />

              <FormCheckbox
                control={form.control}
                name="terms"
                className="items-start"
                label={
                  <span className="leading-tight">
                    I agree to the{' '}
                    <Link
                      href={ROUTES.TERMS}
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href={ROUTES.PRIVACY}
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                }
              />

              <Button type="submit" className="w-full">
                Create account
              </Button>
            </div>
          </>
        )}
      </Form>

      <p className="mt-1 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href={ROUTES.AUTH.LOGIN} className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
