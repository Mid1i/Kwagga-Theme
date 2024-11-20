import { Suspense } from "react";

import type { KcContext } from "./KcContext";

import { useI18n } from "./i18n";

import LoginIdpLinkConfirmPage from "./pages/LoginIdpLinkConfirm";
import LoginUpdatePasswordPage from "./pages/LoginUpdatePassword";
import LoginResetPasswordPage from "./pages/LoginResetPassword";
import LoginVerifyEmailPage from "./pages/LoginVerifyEmail";
import LoginPageExpiredPage from "./pages/LoginPageExpired";
import LogoutConfirmPage from "./pages/LogoutConfirm";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";


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
          case "login-verify-email.ftl":
            return (
              <LoginVerifyEmailPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "login-reset-password.ftl":
            return (
              <LoginResetPasswordPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "login-update-password.ftl":
            return (
              <LoginUpdatePasswordPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "error.ftl":
            return (
              <ErrorPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "login-idp-link-confirm.ftl":
            return (
              <LoginIdpLinkConfirmPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "login-page-expired.ftl":
            return (
              <LoginPageExpiredPage
                kcContext={kcContext}
                i18n={i18n}
              />
            )
          case "logout-confirm.ftl":
            return (
              <LogoutConfirmPage
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
