"use client";

import * as React from "react";
import {
    Controller,
    type FieldValues,
    type FieldPath,
    type Control,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldContent,
} from "@/components/ui/field";
import { cn } from "@/src/core/lib/utils";
import { Label } from "./input";

export interface FormTextareaProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    textareaClassName?: string;
    requiredMarker?: boolean;
    orientation?: "vertical" | "horizontal" | "responsive";
}

export function FormTextarea<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    description,
    placeholder,
    disabled,
    className,
    textareaClassName,
    requiredMarker,
    orientation = "vertical",
}: FormTextareaProps<TFieldValues, TName>) {
    const isHorizontal = orientation === "horizontal";

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
                        <Label
                            name={name}
                            label={label}
                            requiredMarker={requiredMarker}
                        />
                    )}
                    <Textarea
                        {...field}
                        id={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        aria-invalid={!!fieldState.error}
                        className={cn("resize-y", textareaClassName)}
                    />
                    {!isHorizontal && description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}

                    {isHorizontal && (label || description) && (
                        <HorizontalTextarea
                            label={label}
                            description={description}
                            name={name}
                            requiredMarker={requiredMarker}
                        />
                    )}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}


export function HorizontalTextarea({
    label = "",
    description = "",
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
                    <Label
                        name={name}
                        label={label}
                        requiredMarker={requiredMarker}
                    />
                )}
                {description && (
                    <FieldDescription>{description}</FieldDescription>
                )}
            </Wrapper>
        </>
    );
}
