import { createContext } from 'react';

export const isAuthorizedMain = createContext(false);
// interface AuthContextValue {
//     isAuthorized: boolean;
//     setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
//   }
  
//   export const isAuthorizedMain = createContext<AuthContextValue>({
//     isAuthorized: false,
//     setAuthorized: () => {},
//   });
