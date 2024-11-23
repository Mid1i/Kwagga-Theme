import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/account/KcContext";
import type { I18n } from "@/account/i18n";

import AccountTemplate from "@/layouts/AccountTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import "./styles.scss";


export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url, messagesPerField, account, message, stateChecker } = kcContext;

    const { msgStr } = i18n;


    return (
      <AccountTemplate
				activePage="account"
			  documentTitle={msgStr("accountTitleHtml")}
				kcContext={kcContext}
				i18n={i18n}
			>
				<section className="account">
					<h2 className="account__title">{ msgStr("accountTitle") }</h2>
					<p className="account__text">{ msgStr("accountInstruction") }</p>
					<form action={url.accountUrl} method="post" className="account__form">
						{(message && message.type === "success") && (
							<span className="account__message">{ message.summary }</span>
						)}

						<TheInput
							autocomplete="email"
							error={messagesPerField.printIfExists("username", msgStr("usernameError")) || messagesPerField.printIfExists("email", msgStr("emailError"))}
							defaultValue={account.username ?? ""}
							label={msgStr("emailLabel")}
							name="username"
							type="email"
							isReadonly
						/>
						<TheInput
							autoFocus
							autocomplete="fistName"
							defaultValue={account.firstName ?? ""}
							error={messagesPerField.printIfExists("firstName", msgStr("firstNameError"))}
							label={msgStr("firstNameLabel")}
							name="firstName"
							tabIndex={1}
							type="text"
						/>
						<TheInput
							autocomplete="lastName"
							defaultValue={account.lastName ?? ""}
							error={messagesPerField.printIfExists("lastName", msgStr("lastNameError"))}
							label={msgStr("lastNameLabel")}
							name="lastName"
							tabIndex={2}
							type="text"
						/>

						<TheInput
							defaultValue={stateChecker}
							name="stateChecker"
							type="hidden"
							isHidden
						/>

						<div className="account__row">
							<TheButton 
								type="submit" 
								tabIndex={3}
							>
								{ msgStr("doSave") }
							</TheButton>
							<TheButton 
								type="reset" 
								tabIndex={4}
								isTransparent 
							>
								{ msgStr("doCancel") }
							</TheButton>
						</div>
					</form>
				</section>
			</AccountTemplate>
    );
}