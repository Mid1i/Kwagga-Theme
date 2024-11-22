import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { PageProps } from "@/account/PageProps";
import type { KcContext } from "@/account/KcContext";
import type { I18n } from "@/account/i18n";

import AccountTemplate from "@/layouts/AccountTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import "./styles.scss";


export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url, realm, messagesPerField, account, stateChecker } = kcContext;

    const { msgStr } = i18n;


    return (
      <AccountTemplate
				activePage="account"
			  documentTitle={msgStr("accountTitleHtml")}
				kcContext={kcContext}
				i18n={i18n}
			>
				<div className="account">
					<h1 className="account__title">{ msgStr("accountTitle") }</h1>
					<p className="account__text">{ msgStr("accountInstruction") }</p>
					<form action={url.accountUrl} method="post" className="account__form">
						<TheInput
							autoFocus
							autocomplete="email"
							isReadonly={realm.editUsernameAllowed}
							error={messagesPerField.existsError("email") ? kcSanitize(messagesPerField.get("email")) : ""}
							defaultValue={account.username ?? ""}
							label={msgStr("emailLabel")}
							name="username"
							tabIndex={1}
							type="email"
						/>
						<TheInput
							autocomplete="fistName"
							defaultValue={account.firstName ?? ""}
							error={messagesPerField.existsError("firstName") ? kcSanitize(messagesPerField.get("firstName")) : ""}
							label={msgStr("firstNameLabel")}
							name="firstName"
							tabIndex={2}
							type="text"
						/>
						<TheInput
							autocomplete="lastName"
							defaultValue={account.lastName ?? ""}
							error={messagesPerField.existsError("lastName") ? kcSanitize(messagesPerField.get("lastName")) : ""}
							label={msgStr("lastNameLabel")}
							name="lastName"
							tabIndex={3}
							type="text"
						/>

						<TheInput
							defaultValue={stateChecker}
							name="stateChecker"
							type="hidden"
						/>

						<div className="account__row">
							<TheButton value="Save">{ msgStr("doSave") }</TheButton>
							<TheButton isTransparent value="Cancel">{ msgStr("doCancel") }</TheButton>
						</div>
					</form>
				</div>
			</AccountTemplate>
    );
}