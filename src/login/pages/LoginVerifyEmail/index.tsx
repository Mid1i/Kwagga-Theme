import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { PageProps } from "@/login/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";


export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;
    
    const { msgStr } = i18n;

    const { url, user, message } = kcContext;


    return (
      <LoginTemplate
        documentTitle={msgStr("emailVerifyTitleHtml")}
        kcContext={kcContext}
        i18n={i18n}
      >
        <section className="login">
          <h2 className="login__title">{ msgStr("emailVerifyTitle") }</h2>
            <p className="login__text">
              { msgStr("emailVerifyInstruction1") }
              <b>{ user?.email ?? "" }</b>
            </p>
          <form action={ url.loginAction } method="post" className="login__form">
            {(message && (message.type === "success" || message.type === "error")) && (
              <p 
                className={ `login__text login__text--self ${message.type === "success"} ? "login__text--success" : "login__text--error"` } 
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(message.summary)
                }}
              ></p>
            )}
            <p className="login__text login__text--self">{ msgStr("emailVerifyInstruction2") }</p>
            <TheButton>{ msgStr("doResend") }</TheButton>
          </form>
        </section>
      </LoginTemplate>
    );
}
