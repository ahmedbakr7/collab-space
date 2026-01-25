import { ReactNode } from "react";
import FormContext from "./FormContext";

export default function FormContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    return <FormContext.Provider value={undefined}>{children}</FormContext.Provider>;
}
