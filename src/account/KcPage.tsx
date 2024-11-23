import { Suspense } from "react";

import type { KcContext } from "./KcContext";

import { useI18n } from "./i18n";

import FederatedIdentityPage from "./pages/FederatedIdentity";
import PasswordPage from "./pages/Password";
import SessionsPage from "./pages/Sessions";
import AccountPage from "./pages/Account";


export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "account.ftl":
            return (
              <AccountPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "password.ftl":
            return (
              <PasswordPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "sessions.ftl":
            return (
              <SessionsPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "federatedIdentity.ftl":
            return (
              <FederatedIdentityPage
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

