import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";


export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url, auth, messagesPerField } = kcContext;

    const { msgStr } = i18n;

    return (
      <LoginTemplate
        documentTitle={msgStr("resetPasswordTitleHtml")}
        kcContext={kcContext}
        i18n={i18n}
      >
        <section className="login">
          <h2 className="login__title">{ msgStr("resetPasswordTitle") }</h2>
          <p className="login__text">{ msgStr("resetPasswordInstruction") }</p>
          <form action={url.loginAction} method="post" className="login__form">
            {messagesPerField.existsError("username", "email") && (
              <span
                className="login__error"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(
                    messagesPerField.getFirstError("username", "email")
                  ),
                }}
              />
            )}
            <TheInput
              autoFocus
              autocomplete="email"
              defaultValue={auth.attemptedUsername ?? ""}
              label={msgStr("emailLabel")}
              name="username"
              tabIndex={1}
              type="email"
            />

            <TheButton>{ msgStr("doSubmit") }</TheButton>
            <TheButton isTransparent>
              <a className="login__link" href={url.loginUrl}>{ msgStr("doBackToLogin") }</a>
            </TheButton>
          </form>
		</section>
      </LoginTemplate>
    );
}
