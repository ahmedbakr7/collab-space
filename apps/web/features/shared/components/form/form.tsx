"use client";

import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useForm,
    type FieldValues,
    type DefaultValues,
    type SubmitHandler,
} from "react-hook-form";

import { Form } from "@/components/ui/form";
import FormContext from "./FormContext";

// Generic form wrapper that infers types from the provided Zod schema
export type FormComponentProps<TFieldValues extends FieldValues> = {
    formSchema: z.ZodType<TFieldValues>;
    defaultValues?: DefaultValues<TFieldValues>;
    onSubmitAction?: (values: TFieldValues) => void | Promise<void>;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
};

export function FormComponent<TFieldValues extends FieldValues>({
    formSchema,
    defaultValues,
    onSubmitAction,
    children,
    className,
    style,
}: FormComponentProps<TFieldValues>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolver = zodResolver(formSchema as any);

    const form = useForm<TFieldValues>({ resolver, defaultValues });

    const handleSubmit: SubmitHandler<TFieldValues> = (values) =>
        onSubmitAction?.(values);

    return (
        <FormContext.Provider value={form ?? undefined}>
            <Form {...form}>
                <form
                    style={style}
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className={className}
                    noValidate
                >
                    {children}
                </form>
            </Form>
        </FormContext.Provider>
    );
}
