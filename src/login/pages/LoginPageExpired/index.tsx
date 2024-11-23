import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";


export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url } = kcContext;

    const { msgStr } = i18n;


    return (
      <LoginTemplate
        documentTitle={msgStr("loginPageExpiredTitleHtml")}
        kcContext={kcContext}
        i18n={i18n}
      >
        <section className="login">
          <h2 className="login__title login__title--mb">{ msgStr("loginPageExpiredTitle") }</h2>
          <TheButton isMargin>
            <a 
              className="login__link" 
              href={url.loginRestartFlowUrl}
              tabIndex={1} 
            >
              { msgStr("pageExpiredInstruction1") }
            </a>
          </TheButton>
          <TheButton isTransparent>
            <a 
              className="login__link" 
              href={url.loginAction}
              tabIndex={2} 
            >
              { msgStr("pageExpiredInstruction2") }
            </a>
          </TheButton>
		</section>
      </LoginTemplate>
    );
}
