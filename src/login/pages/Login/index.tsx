import { useState, useReducer } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

import TheSocialLink from "@/components/TheSocialLink";
import LoginTemplate from "@/layouts/LoginTemplate";
import TheLineText from "@/components/TheLineText";
import TheCheckbox from "@/components/TheCheckbox";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import passwordIcons from "@/assets/icons/input.svg";
import "./styles.scss";


export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const { kcContext, i18n } = props;


  const {
    social,
    realm,
    url,
    login,
    auth,
    messagesPerField
  } = kcContext;


  const { msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useReducer(prev => !prev, false);


  return (
    <LoginTemplate
      kcContext={kcContext}
      i18n={i18n}
    >
      <section className="login">
        <h2 className="login__title">{ msgStr("loginTitle") }</h2>
        <p className="login__text">
          { msgStr("noAccount") }
          <a 
            className="login__text--accent" 
            href={url.registrationUrl}
          >
            { msgStr("doRegister") }
          </a>
        </p>
        <form 
          onSubmit={() => {
            setIsLoginButtonDisabled(true);
            return true;
          }}
          action={url.loginAction}
          className="login__form"
          method="post" 
        >
          {messagesPerField.existsError("username", "password") && (
            <span
              className="login__error"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(
                  messagesPerField.getFirstError("username", "password")
                ),
              }}
            />
          )}
          <TheInput
            autoFocus
            autocomplete="email"
            defaultValue={login.username ?? ""}
            label={msgStr("emailLabel")}
            name="username"
            tabIndex={1}
            type="email"
          />
          <TheInput
            autocomplete="current-password"
            label={msgStr("passwordLabel")}
            name="password"
            tabIndex={2}
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

          <div className="login__row">
            {realm.rememberMe && (
              <TheCheckbox
                checked={!!login.rememberMe}
                label={msgStr("rememberMe")}
                tabIndex={3}
                name="rememberMe"
              />
            )}
            {realm.resetPasswordAllowed && (
              <a 
                href={url.loginResetCredentialsUrl} 
                tabIndex={4} 
                className="login__text login__text--accent login__text--self"
              >
                { msgStr("doForgotPassword") }
              </a>
            )}
          </div>

          <TheInput
            defaultValue={auth.selectedCredential}
            name="credentialId"
            type="hidden"
          />

          <TheButton 
            isDisabled={isLoginButtonDisabled}
            tabIndex={5}
          >
            { msgStr("doLogin") }
          </TheButton>
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
