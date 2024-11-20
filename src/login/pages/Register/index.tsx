import { FormEvent, useReducer } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { PageProps } from "@/login/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import TheSocialLink from "@/components/TheSocialLink";
import LoginTemplate from "@/layouts/LoginTemplate";
import TheLineText from "@/components/TheLineText";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import { setCookie, getCookie } from "@/helpers/cookie";

import passwordIcons from "@/assets/icons/input.svg";


export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
  const { kcContext, i18n } = props;


  const {
    social,
    url,
    messagesPerField
  } = kcContext;
  

  const { msgStr } = i18n;

  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useReducer(prev => !prev, false);
  const [isPasswordShown, setIsPasswordShown] = useReducer(prev => !prev, false);

  
  const saveFormData = (event: FormEvent<HTMLFormElement>): boolean => {
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

		setCookie("firstName", data.firstName.toString(), 5000);
		setCookie("lastName", data.lastName.toString(), 5000);
		setCookie("email", data.email.toString(), 5000);
		
		return true;
	}


  return (
    <LoginTemplate
      documentTitle={msgStr("registerTitleHtml")}
      kcContext={kcContext}
      i18n={i18n}
    >
      <section className="login">
        <h2 className="login__title">{ msgStr("registerTitle") }</h2>
        <p className="login__text">
          { msgStr("haveAccount") }
          <a 
            className="login__text--accent" 
            href={url.loginUrl}
          >
            { msgStr("doLogin") }
          </a>
        </p>
        <form
          onSubmit={saveFormData}
          action={url.registrationAction}
          className="login__form"
          method="post" 
        >
          <div className="login__row login__row--registration">
            <div className="login__field">
              <TheInput
                autoFocus
                autocomplete="firstName"
                label={msgStr("firstNameLabel")}
                defaultValue={getCookie("firstName") ?? ""}
                error={messagesPerField.existsError("firstName") ? kcSanitize(messagesPerField.get("firstName")) : ""}
                name="firstName"
                tabIndex={1}
                type="text"
              />
            </div>
            <TheInput
              autocomplete="lastName"
              label={msgStr("lastNameLabel")}
              defaultValue={getCookie("lastName") ?? ""}
              error={messagesPerField.existsError("lastName") ? kcSanitize(messagesPerField.get("lastName")) : ""}
              name="lastName"
              tabIndex={2}
              type="text"
            />
          </div>
          <TheInput
            autocomplete="email"
            label={msgStr("emailLabel")}
            defaultValue={getCookie("email") ?? ""}
            error={messagesPerField.existsError("username", "email") ? kcSanitize(messagesPerField.getFirstError("username", "email")) : ""}
            name="email"
            tabIndex={3}
            type="email"
          />
          <TheInput
            autocomplete="current-password"
            label={msgStr("passwordLabel")}
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

          <TheButton tabIndex={5}>{ msgStr("doRegister") }</TheButton>
        </form>

        {social?.providers && (
          <>
            <TheLineText i18n={i18n}/>
            <div className="login__social">
              {social.providers.map((provider, index) => (
                <TheSocialLink 
                  displayName={provider.displayName}
                  loginUrl={provider.loginUrl}
                  alias={provider.alias}
                  key={provider.alias}
                  tabIndex={6 + index}
                  i18n={i18n}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </LoginTemplate>
  );
}

