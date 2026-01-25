"use client";

import * as React from "react";
import {
    useForm,
    FormProvider,
    type FieldValues,
    type UseFormReturn,
    type SubmitErrorHandler,
    type DefaultValues,
} from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { cn } from "@/src/core/lib/utils";
import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "../ui/field";

export interface FormProps<TFieldValues extends FieldValues> {
    defaultValues: DefaultValues<TFieldValues>;
    children: (form: UseFormReturn<TFieldValues>) => React.ReactNode;
    resolver?: Resolver<TFieldValues>;
    mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
    reValidateMode?: "onBlur" | "onChange" | "onSubmit";
    className?: string;
    id?: string;
    disabled?: boolean;
    onError?: (
        errors: UseFormReturn<TFieldValues>["formState"]["errors"],
        form: UseFormReturn<TFieldValues>
    ) => void;
    /** Server action for progressive enhancement (works without JavaScript) */
    action?: (formData: FormData) => void | Promise<void>;
    onSubmit: (
        values: TFieldValues,
        form: UseFormReturn<TFieldValues>
    ) => void | Promise<void>;
    legend?: string;
    description?: string;
}

export function Form<TFieldValues extends FieldValues>(
    props: FormProps<TFieldValues>
) {
    const {
        defaultValues,
        onSubmit,
        children,
        resolver,
        mode = "onBlur",
        reValidateMode = "onChange",
        // className,
        id,
        disabled = false,
        onError,
        action,
        legend,
        description,
    } = props;

    const form = useForm<TFieldValues>({
        defaultValues,
        resolver,
        mode,
        reValidateMode,
    });

    function handleSuccess(values: TFieldValues) {
        return onSubmit(values, form);
    }
    const handleError: SubmitErrorHandler<TFieldValues> = (errors) => {
        onError?.(errors, form);
    };

    return (
        <FormProvider {...form}>
            <form
                id={id}
                action={action}
                onSubmit={form.handleSubmit(handleSuccess, handleError)}
                noValidate
            >
                <FieldSet
                    disabled={disabled}
                // className={cn("space-y-6", className)}
                >
                    {legend && <FieldLegend>{legend}</FieldLegend>}
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    <FieldGroup>{children(form)}</FieldGroup>
                </FieldSet>
            </form>
        </FormProvider>
    );
}

export { useForm };
