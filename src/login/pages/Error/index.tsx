import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";


export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { message, client } = kcContext;

    const { msgStr } = i18n;


    return (
      <LoginTemplate
        documentTitle={msgStr("errorTitleHtml")}
        kcContext={kcContext}
        i18n={i18n}
      >
        <section className="login">
          <h2 className="login__title">{ msgStr("errorTitle") }</h2>
          <p className="login__text">{ kcSanitize(message.summary) }</p>
          {(client && client.baseUrl) && (
            <TheButton>
              <a className="login__link" href={client.baseUrl}>{ msgStr("doBackToLogin") }</a>
            </TheButton>
          )}
		</section>
      </LoginTemplate>
    );
}
