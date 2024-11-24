import { useReducer } from "react";

import type { KcContext } from "@/account/KcContext";
import type { PageProps } from "@/types/PageProps";
import type { I18n } from "@/account/i18n";

import AccountTemplate from "@/layouts/AccountTemplate";
import TheButton from "@/components/TheButton"
import TheInput from "@/components/TheInput";

import disconnectIcon from "@/assets/icons/disconnect.svg";
import google from "@/assets/icons/social/google.svg";
import yandex from "@/assets/icons/social/yandex.svg";


export default function FederatedIdentity(props: PageProps<Extract<KcContext, { pageId: "federatedIdentity.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url, federatedIdentity, stateChecker } = kcContext;

    const { msgStr } = i18n;

		const [removedIdentity, setRemovedIdentity] = useReducer(prev => !prev, false);


    return (
			<AccountTemplate
				activePage="identity"
			  documentTitle={msgStr("identityTitleHtml")}
				kcContext={kcContext}
				i18n={i18n}
			>
				<section className="account">
					<svg className="account__social-icon" height="24" width="24">
						<use xlinkHref={google}/>
					</svg>
					<h2 className="account__title">{ msgStr("identityTitle") }</h2>
					<p className="account__text account__text--mb">{ msgStr("identityInstruction") }</p>
					{federatedIdentity.identities.filter(identity => identity.connected).map(identity => (
						<div className="account__connected" key={identity.providerId}>
							<img
								className="account__connected-icon"
								alt={identity.displayName}
								src={identity.displayName.toLowerCase() === "google" ? google : yandex}
							/>
							<h6 className="account__connected-title">
								{ identity.displayName.toLowerCase() === "yandex" ? "Яндекс" : identity.displayName }
								<span>{ identity.userName }</span>
							</h6>
							<form action={url.socialUrl} method="post">
								<TheInput
									defaultValue={stateChecker}
									name="stateChecker"
									type="hidden"
									isHidden
								/>
								<TheInput
									defaultValue="remove"
									name="action"
									type="hidden"
									isHidden
								/>
								<TheInput
									defaultValue={identity.providerId}
									name="providerId"
									type="hidden"
									isHidden
								/>

								{federatedIdentity.removeLinkPossible && (
									<>
										<div onClick={setRemovedIdentity} className="account__connected-button">
											<img
												className="account__connected-disconnect"
												alt=""
												src={disconnectIcon}
											/>
										</div>

										<section className={`account__disconnect ${removedIdentity ? "account__disconnect--visible" : ""}`}>
											<h3 className="account__disconnect-title">{ msgStr("identityDisconnectInstruction") }</h3>
											<TheButton type="submit">{ msgStr("doRemove") }</TheButton>
											<TheButton 
											 	onClick={setRemovedIdentity}
												type="button" 
												isTransparent
											>
												{ msgStr("doCancel") }
											</TheButton>
										</section>
									</>
								)}
							</form>
						</div>
					))}
					{federatedIdentity.identities.filter(identity => !identity.connected).length > 0 && (
						<section className="account__social">
							<h2 className="account__social-title">{ msgStr("identityConnectTitle") }</h2>
							<div className="account__social-items">
								{federatedIdentity.identities.filter(identity => !identity.connected).map(identity => (
									<form action={url.socialUrl} method="post" className="account__social-form">
										<TheInput
											defaultValue={stateChecker}
											name="stateChecker"
											type="hidden"
											isHidden
										/>
										<TheInput
											defaultValue="add"
											name="action"
											type="hidden"
											isHidden
										/>
										<TheInput
											defaultValue={identity.providerId}
											name="providerId"
											type="hidden"
											isHidden
										/>
										<button className="account__social-button">
											<img
												className="account__social-icon"
												alt={identity.displayName}
												src={identity.displayName.toLowerCase() === "google" ? google : yandex}
											/>
										</button>
										<span className="account__social-name">{ identity.displayName.toLowerCase() === "yandex" ? "Яндекс" : identity.displayName }</span>
									</form>
								))}
							</div>
						</section>
					)}

					<div className={`blackout ${removedIdentity ? "blackout--visible" : ""}`}></div>
				</section>
			</AccountTemplate>
    );
}