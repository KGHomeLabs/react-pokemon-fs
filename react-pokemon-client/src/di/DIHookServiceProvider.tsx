import HookDIRegistry from '../di/DIHookRegistry';
import type { ReactNode } from 'react';

export const DIHookServiceProvider = ({ children }: { children: ReactNode }) => {
    return (
        <HookDIRegistry.Providers>{children}</HookDIRegistry.Providers>
    )
};