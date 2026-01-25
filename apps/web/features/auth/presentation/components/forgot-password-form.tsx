'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/utils';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (values: ForgotPasswordValues) => {
    setSubmittedEmail(values.email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Check your email</h1>
        <p className="text-muted-foreground mb-8">
          We&apos;ve sent a password reset link to{' '}
          <strong>{submittedEmail}</strong>
        </p>
        <Link
          href={ROUTES.AUTH.LOGIN}
          className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground">
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <Form<ForgotPasswordValues>
        onSubmit={handleSubmit}
        defaultValues={{
          email: '',
        }}
        resolver={zodResolver(forgotPasswordSchema)}
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

            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </>
        )}
      </Form>

      <div className="mt-6 flex items-center justify-center">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </div>
    </>
  );
}
