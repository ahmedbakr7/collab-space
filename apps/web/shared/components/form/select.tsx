'use client';

import * as React from 'react';
import {
  Controller,
  type FieldValues,
  type FieldPath,
  type Control,
} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldContent,
} from '@/shared/components/ui/field';
import { cn } from '@/shared/lib/utils';
import { Label } from './input';

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  options: FormSelectOption[];
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  requiredMarker?: boolean;
  orientation?: 'vertical' | 'horizontal' | 'responsive';
}

export function FormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  options,
  label,
  description,
  placeholder = '',
  disabled,
  className,
  selectClassName,
  requiredMarker,
  orientation = 'vertical',
}: FormSelectProps<TFieldValues, TName>) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation={orientation}
          className={cn(className)}
          data-invalid={!!fieldState.error}
          suppressHydrationWarning
        >
          {!isHorizontal && label && (
            <Label name={name} label={label} requiredMarker={requiredMarker} />
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            disabled={disabled}
          >
            <SelectTrigger
              aria-invalid={!!fieldState.error}
              className={cn(selectClassName)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!isHorizontal && description && (
            <FieldDescription>{description}</FieldDescription>
          )}

          {isHorizontal && (label || description) && (
            <HorizontalSelect
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

export interface SimpleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FormSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  label?: string;
  id?: string;
}

export function SimpleSelect({
  value,
  onValueChange,
  options,
  placeholder = '',
  disabled,
  className,
  selectClassName,
  label,
  id,
}: SimpleSelectProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className={cn(className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <Select
        value={value}
        onValueChange={(val) => {
          if (val !== null) onValueChange(val);
        }}
        disabled={disabled}
      >
        <SelectTrigger id={id} className={cn(selectClassName)}>
          <SelectValue placeholder={placeholder}>
            {selectedLabel ?? placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function HorizontalSelect({
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
