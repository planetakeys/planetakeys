/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare module "@remix-run/server-runtime" {
  interface AppLoadContext {
    isStudioRoute: boolean;
    env: Partial<Env>;
    sanity: import("@sanity/client").SanityClient;
  }
}
