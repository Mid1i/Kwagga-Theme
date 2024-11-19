import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { FormEvent, useReducer } from "react";

import type { PageProps } from "@/login/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import LoginTemplate from "@/layouts/LoginTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import { getCookie, setCookie } from "@/helpers/cookie";

import passwordIcons from "@/assets/icons/input.svg";


export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { msgStr } = i18n;

    const { url, messagesPerField } = kcContext;

    const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useReducer(prev => !prev, false);
    const [isPasswordShown, setIsPasswordShown] = useReducer(prev => !prev, false);


    const saveFormData = (event: FormEvent<HTMLFormElement>): boolean => {
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
    
      setCookie("password", data.password.toString(), 5000);
            
      return true;
    }


    return (
      <LoginTemplate
        kcContext={kcContext}
        i18n={i18n}
        documentTitle={msgStr("updatePasswordTitleHtml")}
      >
        <section className="login">
          <h2 className="login__title">{ msgStr("updatePasswordTitle") }</h2>
          <p className="login__text">{ msgStr("updatePasswordInstruction") }</p>
			<form 
              onSubmit={saveFormData} 
              action={url.loginAction} 
              method="post" 
              className="login__form"
            >
              {messagesPerField.existsError("username") && (
                <span
                  className="login__error"
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(
                    messagesPerField.get("username")
                  ),
                }}
              />
            )}
            <TheInput
              autocomplete="current-password"
              label={msgStr("passwordLabel")}
              defaultValue={getCookie("password") ?? ""}
              error={messagesPerField.existsError("password") ? kcSanitize(messagesPerField.get("password")) : ""}
              name="password"
              tabIndex={4}
              type={isPasswordShown ? 'text' : 'password'}
            >
              <svg 
                onClick={setIsPasswordShown} 
                className="login__icon"
                height="20" 
                width="20"
              >
                <use xlinkHref={`${passwordIcons}#password-${isPasswordShown ? 'show' : 'hide'}`}/>
              </svg>
            </TheInput>
            <TheInput
              autocomplete="new-password"
              label={msgStr("passwordConfirmLabel")}
              error={messagesPerField.existsError("password-confirm") ? kcSanitize(messagesPerField.get("password-confirm")) : ""}
              name="password-confirm"
              tabIndex={5}
              type={isPasswordConfirmShown ? 'text' : 'password'}
            >
              <svg 
                onClick={setIsPasswordConfirmShown} 
                className="login__icon"
                height="20" 
                width="20"
              >
                <use xlinkHref={`${passwordIcons}#password-${isPasswordConfirmShown ? 'show' : 'hide'}`}/>
              </svg>
            </TheInput>

            <TheButton>{ msgStr("doSubmit") }</TheButton>
          </form>
		</section>
      </LoginTemplate>
    );
}
