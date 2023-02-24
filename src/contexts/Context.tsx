import React from "react";

interface ContextProps {
    context: boolean;
    setContext(context: boolean): void;
}
export const Context = React.createContext<ContextProps>({
    context: false,
    setContext: () => { },
});