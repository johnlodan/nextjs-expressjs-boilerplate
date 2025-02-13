import StoreProvider from "../lib/storeProvider";
import { AppContext } from '../lib/context';

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <AppContext.Provider value={{ socket: {}, theme: "light" }}>
            <StoreProvider>
                {children}
            </StoreProvider>
        </AppContext.Provider>
    );
}
