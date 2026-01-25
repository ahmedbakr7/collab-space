import { useContext } from "react";
import FormContext from "./FormContext";

export default function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within FormComponent (FormContext.Provider)");
    }

    return context;
}
