import { createContext, useContext, memo } from 'react';
import type { Context, ReactNode } from 'react';

// Utility type to enforce interface type
type ServiceType = { [key: string]: any };

// Unique key for type-based registry
type TypeKey<T> = symbol;

export class HookDIRegistry {
  private static serviceMap = new Map<TypeKey<any>, ServiceType>();
  private static contextMap = new Map<TypeKey<any>, Context<ServiceType>>();
  private static typeKeyMap = new WeakMap<object, TypeKey<any>>();

  // Register a service by its interface type
  static add<T extends ServiceType>(service: T): void {
    const key = this.getTypeKey<T>();
    const context = createContext<ServiceType>(service);
    this.serviceMap.set(key, service);
    this.contextMap.set(key, context);
  }

  // Hook to consume a service by its interface type
  static use<T extends ServiceType>(): T {
    const key = this.getTypeKey<T>();
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

  // Component to provide all registered contexts
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

  // Helper to get or create a unique symbol for the type
  private static getTypeKey<T>(): TypeKey<T> {
    // Use a stable object as a key for the type
    const typeRef = HookDIRegistry as object; // Use class itself as stable reference
    if (this.typeKeyMap.has(typeRef)) {
      return this.typeKeyMap.get(typeRef)!;
    }
    const key: TypeKey<T> = Symbol();
    this.typeKeyMap.set(typeRef, key);
    return key;
  }
}