import type { PageProps } from "@/login/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";


export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url } = kcContext;

    const { msgStr } = i18n;


    return (
      <LoginTemplate
        documentTitle={msgStr("loginIdpLinkConfirmTitleHtml")}
        kcContext={kcContext}
        i18n={i18n}
      >
        <section className="login">
          <h2 className="login__title login__title--mb">{ msgStr("loginIdpLinkConfirmTitle") }</h2>
          <form
            action={url.loginAction}
            className="login__form"
            method="post" 
          >
            <TheButton 
              name="submitAction" 
              value="updateProfile"
              tabIndex={1}
            >
              { msgStr("doReviewProfile") }
            </TheButton>
            <TheButton 
              name="submitAction" 
              value="linkAccount"
              isTransparent
              tabIndex={2}
            >
              { msgStr("doAddToTheAccount") }
            </TheButton>
          </form>
        </section>  
      </LoginTemplate>
    );
}
