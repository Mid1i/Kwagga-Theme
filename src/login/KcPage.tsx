import { Suspense } from "react";

import type { KcContext } from "./KcContext";

import { useI18n } from "./i18n";

import LoginPage from "@/login/pages/Login";
import RegisterPage from "@/login/pages/Register";


export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <LoginPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "register.ftl":
            return (
              <RegisterPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          default:
            break;
        }
      })()}
    </Suspense>
  );
}
