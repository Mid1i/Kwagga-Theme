import { useEffect, useReducer } from "react";

import type { KcContext } from "@/account/KcContext";
import type { TemplateProps } from "./types";
import type { I18n } from "@/account/i18n";

import { useI18n } from "@/account/i18n";

import menuIcons from "@/assets/icons/aside-menu.svg";
import headerIcons from "@/assets/icons/header.svg";
import logo from "@/assets/icons/logo--dark.svg";
import "./styles.scss";


export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { 
    kcContext, 
    documentTitle,
    activePage,
    children 
  } = props;

  const [isAccountVisible, setIsAccountVisible] = useReducer(prev => !prev, false);
  const [isMenuVisible, setIsMenuVisible] = useReducer(prev => !prev, false);

  const { url, account } = kcContext;
  
  const { i18n } = useI18n({ kcContext });

  const { msgStr } = i18n;

  useEffect(() => {
    document.title = documentTitle ?? msgStr("accountTitleHtml");
  }, []);

  
  const renderMenuEl = (text: string, iconName: string, id: string, link: string) => {
    return (
      <li className="aside-menu__list-el">
        <a href={link} className={`aside-menu__list-link ${activePage === id ? "aside-menu__list-link--current" : ""}`}>
          <svg className="aside-menu__list-icon" height="24" width="24">
            <use xlinkHref={`${menuIcons}#${iconName}`}/>
          </svg>
          { text }
        </a>
      </li>
    );
  }
  

  return (
    <div className="wrapper">
      <header className="header">
        <a href={url.accountUrl} className="header__logo">
          <img
            alt="Логотип KWAGGA"
            src={logo}
          />
        </a>

        <svg onClick={setIsMenuVisible} className="header__burger" height="20" width="20">
          <use xlinkHref={`${headerIcons}#burger-menu`}/>
        </svg>

        <button onClick={setIsAccountVisible} className="header__account">
          Добро пожаловать,
          <b className="header__account-name">{ account.firstName }</b>
          <svg className="header__account-icon" height="6" width="11">
            <use xlinkHref={`${headerIcons}#arrow-down`}/>
          </svg>
        </button>

        <div className={`header__popup ${isAccountVisible ? "header__popup--visible" : ""}`}>
          <h6 className="header__fullname">{ `${account.firstName} ${account.lastName}` }</h6>
          <span className="header__email">{ account.email }</span>
          <a 
            className="header__logout"
            href={url.getLogoutUrl()}
          >
            <svg className="header__logout-icon" height="24" width="24">
              <use xlinkHref={`${headerIcons}#sign-out`}/>
            </svg>
            { msgStr("doLogout") }
          </a>
        </div>
      </header>

      <aside className={`aside-menu ${isMenuVisible ? "aside-menu--visible" : ""}`}>
        <svg onClick={setIsMenuVisible} className="aside-menu__icon" height="24" width="24">
          <use xlinkHref={`${menuIcons}#cross`}/>
        </svg>

        <a href={url.accountUrl} className="aside-menu__logo header__logo">
          <img
            alt="Логотип KWAGGA"
            src={logo}
          />
        </a>
        <h6 className="aside-menu__fullname header__fullname">{ `${account.firstName} ${account.lastName}` }</h6>
        <span className="aside-menu__email header__email">{ account.email }</span>

        <ul className="aside-menu__list">
          {renderMenuEl("Личные данные", "credentials", "account", url.accountUrl)}
          {renderMenuEl("Вход в аккаунт", "login", "password", url.passwordUrl)}
          {renderMenuEl("Активность", "activity", "sessions", url.sessionsUrl)}
          {renderMenuEl("Привязанные аккаунты", "social", "identity", url.socialUrl)}
        </ul>

        <a 
          className="aside-menu__logout header__logout"
          href={url.getLogoutUrl()}
        >
          <svg className="aside-menu__logout-icon header__logout-icon" height="24" width="24">
            <use xlinkHref={`${headerIcons}#sign-out`}/>
          </svg>
          { msgStr("doLogout") }
        </a>
      </aside>

      {children}
    </div>
  );
}
