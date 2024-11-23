import { useState, useReducer, FormEvent } from "react";

import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/account/KcContext";
import type { I18n } from "@/account/i18n";

import AccountTemplate from "@/layouts/AccountTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import passwordIcons from "@/assets/icons/input.svg";


export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
	const { kcContext, i18n } = props;

	const { url, password, account, stateChecker, message } = kcContext;

	const { msgStr } = i18n;

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

	const [isPasswordShown, setIsPasswordShown] = useReducer(prev => !prev, false); 
	const [isNewPasswordShown, setIsNewPasswordShown] = useReducer(prev => !prev, false); 
	const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useReducer(prev => !prev, false); 

	const [newPasswordError, setNewPasswordError] = useState("");
	const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");

	
	const checkNewPassword = (newPassword: string) => {
		if (!password.passwordSet) return;
		setNewPasswordError(newPassword === currentPassword ? msgStr("newPasswordSameAsOld") : "");
	};

	const checkNewPasswordConfirm = (newPasswordConfirm: string) => {
		if (newPasswordConfirm === "") return;
		setNewPasswordConfirmError(newPassword !== newPasswordConfirm ? msgStr("passwordConfirmNotMatch") : "");
	};

	const onChangeNewPassword = (event: FormEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		setNewPassword(value);
		checkNewPassword(value);
		checkNewPasswordConfirm(value);
	}

	const onChangeNewPasswordConfirm = (event: FormEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		setNewPasswordConfirm(value);
		checkNewPasswordConfirm(value);
	}


	return (
		<AccountTemplate
			activePage="password"
			documentTitle={msgStr("passwordTitleHtml")}
			kcContext={kcContext}
			i18n={i18n}
		>
			<section className="account">
				<h2 className="account__title">{ msgStr("passwordTitle") }</h2>
				<p className="account__text">{ msgStr("passwordInstruction") }</p>
				<form action={url.passwordUrl} method="post" className="account__form">

					{(message && (message.type === "error" || message.type === "success")) && (
						<span className={`account__message ${message.type === "error" ? "account__message--error" : ""}`}>{ message.summary }</span>
					)}

					<TheInput
						autocomplete="email"
						defaultValue={account.username ?? ""}
						name="username"
						type="hidden"
						isHidden
					/>

					{password.passwordSet && (
						<TheInput
							autoFocus
							onInput={event => setCurrentPassword((event.target as HTMLInputElement).value)}
							autocomplete="current-password"
							label={msgStr("passwordLabel")}
							defaultValue={currentPassword}
							name="password"
							tabIndex={1}
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
					)}

					<TheInput
					  onInput={onChangeNewPassword}
						autoFocus={!password.passwordSet}
						autocomplete="new-password"
						defaultValue={newPassword}
						error={newPasswordError}
						label={msgStr("newPasswordLabel")}
						name="password-new"
						tabIndex={2}
						type={isNewPasswordShown ? 'text' : 'password'}
					>
						<svg 
							onClick={setIsNewPasswordShown} 
							className="login__icon"
							height="20" 
							width="20"
						>
							<use xlinkHref={`${passwordIcons}#password-${isNewPasswordShown ? 'show' : 'hide'}`}/>
						</svg>
					</TheInput>

					<TheInput
						onInput={onChangeNewPasswordConfirm}
						autocomplete="new-password"
						defaultValue={newPasswordConfirm}
						error={newPasswordConfirmError}
						label={msgStr("passwordConfirmLabel")}
						name="password-confirm"
						tabIndex={3}
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

					<TheInput
						defaultValue={stateChecker}
						name="stateChecker"
						type="hidden"
						isHidden
					/>

					<TheButton isDisabled={newPasswordError !== "" || newPasswordConfirmError !== ""}>{ msgStr("doSave") }</TheButton>
				</form>
			</section>
		</AccountTemplate>
	);
}