import { AuthClient } from "@dfinity/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "../index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Patch AuthClient.prototype.login to strip invalid derivationOrigin values.
// This fixes a blank Internet Identity page caused by derivationOrigin="undefined" string
// being set when the app config has no valid derivation origin configured.
(function patchAuthClientLogin() {
  const originalLogin = AuthClient.prototype.login;
  AuthClient.prototype.login = function (
    options: Parameters<typeof originalLogin>[0],
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const self = this as any;
    // Fix invalid derivationOrigin stored in _createOptions.loginOptions
    const storedOrigin = self._createOptions?.loginOptions?.derivationOrigin;
    if (
      storedOrigin === "undefined" ||
      storedOrigin === "" ||
      storedOrigin === null
    ) {
      if (self._createOptions?.loginOptions) {
        self._createOptions.loginOptions.derivationOrigin = undefined;
      }
    }
    return originalLogin.call(this, options);
  };
})();

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
