'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import useFormContext from '../form/useFormContext';

export type InputFieldProps = {
  name: FieldPath<FieldValues>;
  label?: ReactNode;
  placeholder?: string;
  description?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  autoComplete?: string;
};

export default function InputField({
  name,
  label,
  placeholder,
  description,
  type = 'text',
  disabled,
  required,
  className,
  inputClassName,
  autoComplete,
}: InputFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name as FieldPath<FieldValues>}
      render={({ field }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              autoComplete={autoComplete}
              className={inputClassName}
              {...field}
            />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
