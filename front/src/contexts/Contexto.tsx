import { createContext, useState } from "react";
import { UfProps, ContextProps } from "../types";

const Contexto = createContext({} as ContextProps);

function Provider({ children }: any) {
  const [ufs, setUfs] = useState([] as UfProps[]);

  return (
    <Contexto.Provider value={{ ufs }}>
      {children}
    </Contexto.Provider>
  );
}

export { Contexto, Provider };
