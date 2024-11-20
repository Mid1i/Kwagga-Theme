import type { PageProps } from "@/login/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput"


export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msgStr } = i18n;

    return (
      <LoginTemplate
        documentTitle={msgStr("logoutConfirmTitleHtml")}
        kcContext={kcContext}
        i18n={i18n}
      >
        <section className="login">
          <h2 className="login__title">{ msgStr("logoutConfirmTitle") }</h2>
          <p className="login__text">{ msgStr("logoutConfirmInstruction") }</p>
		  <form 
            action={url.loginAction} 
            method="post" 
            className="login__form"
          >
            <TheInput
              defaultValue={logoutConfirm.code}
              name="session_code"
              type="hidden"
            />
            <TheButton 
              name="confirmLogout" 
              isLogout
            >
              { msgStr("doLogout") }
            </TheButton>
            
            {!logoutConfirm.skipLink && client.baseUrl && (
              <TheButton isTransparent>
                <a 
                    className="login__link" 
                    href={client.baseUrl}
                >
                    { msgStr("doBackToApplication") }
                </a>    
              </TheButton>
            )}
          </form>
        </section>  
      </LoginTemplate>
    );
}
