import type { KcContext as KcContext_base } from "keycloakify/login/KcContext";
import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";


export type KcContextExtension = {
  themeName: ThemeName;
  properties: Record<KcEnvName, string> & {};
};

export type KcContextExtensionPerPage = {
  "register.ftl": {
    social: KcContext_base.Login["social"];
  }
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
