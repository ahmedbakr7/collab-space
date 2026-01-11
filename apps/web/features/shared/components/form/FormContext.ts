import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormContextType = UseFormReturn<any> | undefined;

const FormContext = createContext<FormContextType>(undefined);

export default FormContext;
