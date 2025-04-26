

/**
 * This file simplifies module registration by enabling the registration of router and store modules for specific modules,
 * using functions like registerStoreModule and registerRouterModule.
 * It streamlines the process of registering  multiple modules with the registerModules function.
 */

import type { Router } from "vue-router";
import router from "./router";

//TODO: Add store module registration

interface Module {
  router?: (route: Router) => void;
}

type ModuleEntry = [string, Module];

// To Register the router module if it exists in the module
const registerRouterModule = (module: Module) => {
  if (module.router) {
    module.router(router);
  }
};

// To Register both store and router modules for a specific module
const registerModule = ( module: Module) => {
  registerRouterModule(module);
};

// Register all modules
export const registerModules = (modules: Record<string, Module>) => {
  // Iterate over each module
  Object.entries(modules).forEach(([_moduleName, module]: ModuleEntry) => {
    // Register the module
    registerModule(module);
  });
};
