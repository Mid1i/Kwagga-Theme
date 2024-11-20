import { createRoot } from "react-dom/client";
import { StrictMode } from "react";


import { getKcContextMock } from "./login/KcPageStory";
import { KcPage } from "./kc.gen";

import "@/assets/styles/default.scss";

// TODO: Сделать страницы login-idp-link-confirm, login-page-expired, logout-confirm
if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({
    pageId: "error.ftl",
    overrides: {
      locale: {
        currentLanguageTag: "ru"
      }
    }
  });
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {!window.kcContext ? (
      <h1>No Keycloak Context</h1>
    ) : (
      <KcPage kcContext={window.kcContext}/>
    )}
  </StrictMode>
);
