
import { IAppContext } from '@/types/context';
import { createContext, } from 'react';

export const AppContext = createContext<IAppContext>({
    socket: { on: false },
    theme: "light",
});

