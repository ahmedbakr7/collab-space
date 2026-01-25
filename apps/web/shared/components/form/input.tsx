'use client';

import * as React from 'react';
import {
  Controller,
  type FieldValues,
  type FieldPath,
  type Control,
} from 'react-hook-form';
import { Input } from '../ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from '../ui/field';
import { cn } from '@/shared/lib/utils';

export interface InputComponentProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  requiredMarker?: boolean;
  orientation?: 'vertical' | 'horizontal' | 'responsive';
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export default function InputComponent<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  placeholder,
  type = 'text',
  autoComplete = 'off',
  disabled,
  className,
  inputClassName,
  requiredMarker,
  orientation = 'vertical',
  startContent,
  endContent,
}: InputComponentProps<TFieldValues, TName>) {
  const isHorizontal = orientation === 'horizontal';
  const hasAddon = !!(startContent || endContent);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation={orientation}
          className={cn(className)}
          data-invalid={!!fieldState.error}
        >
          {!isHorizontal && label && (
            <Label name={name} label={label} requiredMarker={requiredMarker} />
          )}

          {hasAddon ? (
            <InputGroup className={cn(inputClassName)}>
              {startContent && (
                <InputGroupAddon align="inline-start">
                  {startContent}
                </InputGroupAddon>
              )}
              <InputGroupInput
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                aria-invalid={!!fieldState.error}
              />
              {endContent && (
                <InputGroupAddon align="inline-end">
                  {endContent}
                </InputGroupAddon>
              )}
            </InputGroup>
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              className={cn(inputClassName)}
            />
          )}

          {!isHorizontal && description && (
            <FieldDescription>{description}</FieldDescription>
          )}

          {isHorizontal && (label || description) && (
            <HorizontalInput
              label={label}
              description={description}
              name={name}
              requiredMarker={requiredMarker}
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function Label({
  name,
  label,
  requiredMarker,
}: {
  name: string;
  label: string;
  requiredMarker?: boolean;
}) {
  return (
    <FieldLabel htmlFor={name}>
      {label}
      {requiredMarker && <span className="text-destructive ml-1">*</span>}
    </FieldLabel>
  );
}

export function HorizontalInput({
  label = '',
  description = '',
  name,
  requiredMarker,
}: {
  label?: string;
  description?: string;
  name: string;
  requiredMarker?: boolean;
}) {
  const Wrapper: React.ElementType =
    label && description ? FieldContent : React.Fragment;

  return (
    <>
      <Wrapper>
        {label && (
          <Label name={name} label={label} requiredMarker={requiredMarker} />
        )}
        {description && <FieldDescription>{description}</FieldDescription>}
      </Wrapper>
    </>
  );
}
