import { i18nBuilder } from "keycloakify/account";
import type { ThemeName } from "../kc.gen";


const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withExtraLanguages({})
  .withCustomTranslations({
    "en": {
      accountTitleHtml: "KWAGGA - credentials",
      accountTitle: "Your credentials",
      accountInstruction: "In ID, your data is always at hand.",
      emailLabel: "E-mail",
      firstNameLabel: "First name",
      lastNameLabel: "Last name",
      doSave: "Save",
      doCancel: "Cancel",
      doLogout: "Sign out"
    },
    "ru": {
      accountTitleHtml: "KWAGGA - персональные данные",
      accountTitle: "Ваши данные",
      accountInstruction: "В ID ваши данные всегда под рукой.",
      emailLabel: "E-mail",
      firstNameLabel: "Ваше имя",
      lastNameLabel: "Ваша фамилия",
      doSave: "Сохранить",
      doCancel: "Отменить",
      doLogout: "Выйти"
    }
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
