import { createRoot } from "react-dom/client";
import { StrictMode } from "react";


import { getKcContextMock } from "./account/KcPageStory";
import { KcPage } from "./kc.gen";

import "@/assets/styles/default.scss";


if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({
    pageId: "account.ftl",
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
