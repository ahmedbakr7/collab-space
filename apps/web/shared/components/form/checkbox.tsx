'use client';

import * as React from 'react';
import {
  Controller,
  type FieldValues,
  type FieldPath,
  type Control,
} from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { FieldError } from '../ui/field';
import { cn } from '@/shared/lib/utils';

export interface FormCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string; // Container class
}

export function FormCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  disabled,
  className,
}: FormCheckboxProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn('space-y-1 leading-none', className)}>
          <div className="flex items-start space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
            />
            <div className="grid gap-1.5 leading-none">
              {label && (
                <label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
}
