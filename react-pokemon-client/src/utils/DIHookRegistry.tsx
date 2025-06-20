import { createContext, useContext, memo } from 'react';
import type { Context, ReactNode } from 'react';

type ServiceType = { [key: string]: any };
type TypeKey<T> = symbol | (new (...args: any[]) => T);

export class HookDIRegistry {
  private static serviceMap = new Map<TypeKey<any>, ServiceType>();
  private static contextMap = new Map<TypeKey<any>, Context<ServiceType>>();

  static add<T extends ServiceType>(service: T): void {
    const key: TypeKey<T> = Symbol.for((service as any).__typeName || typeof service);
    const context = createContext<ServiceType>(service);
    this.serviceMap.set(key, service);
    this.contextMap.set(key, context);
  }

  static use<T extends ServiceType>(): T {
    const key: TypeKey<T> = Symbol.for(({} as T).__typeName || typeof ({} as T));
    const context = this.contextMap.get(key);
    if (!context) {
      throw new Error('No hook service registered for this type');
    }
    const service = useContext(context);
    if (!service) {
      throw new Error('Service is not provided in the context');
    }
    return service as T;
  }

  static Providers = memo(({ children }: { children: ReactNode }) => {
    let element = children;
    for (const [key, context] of this.contextMap) {
      const service = this.serviceMap.get(key);
      if (service) {
        element = (
          <context.Provider value={service}>
            {element}
          </context.Provider>
        );
      }
    }
    return element;
  });
}

HookDIRegistry.Providers.displayName = 'HookDIRegistry.Providers';