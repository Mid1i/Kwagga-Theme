import { useState, useReducer, useEffect, Fragment } from "react";

import type { PageProps } from "@/types/PageProps";
import type { KcContext } from "@/account/KcContext";
import type { Sessions } from "@/types/Sessions";
import type { I18n } from "@/account/i18n";

import { useSessions, removeSessionById } from "@/account/api/sessions";
import { formatDate } from "@/helpers/formatters";

import AccountTemplate from "@/layouts/AccountTemplate";
import TheButton from "@/components/TheButton";
import TheInput from "@/components/TheInput";

import menuIcons from "@/assets/icons/aside-menu.svg";
import deviceIcons from "@/assets/icons/devices.svg";


export default function Sessions(props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>) {
	const { kcContext, i18n } = props;

	const { url, stateChecker } = kcContext;
	
	const { msgStr } = i18n;

	const { sessions } = useSessions();

	const [isPopupShown, setIsPopupShown] = useReducer(prev => !prev, false);

	const [currentSession, setCurrentSession] = useState({
		current: true,
		os: "",
		ip: "",
		browser: "",
		time: "",
		id: ""
	});

	const [detailedSession, setDetailedSession] = useState({
		current: false,
		os: "",
		ip: "",
		browser: "",
		time: "",
		id: ""
	});

	const updateSession = (os: string, session: Sessions) => {
		setDetailedSession({
			...detailedSession,
			os: os,
			ip: session.ipAddress,
			browser: session.browser,
			time: formatDate(session.started),
			id: session.id
		});
	}

	const endSession = () => {
		removeSessionById(detailedSession.id);
		closePopup();
	}

	const closePopup = () => {
		setIsPopupShown();
		window.setTimeout(() => setDetailedSession({
			current: false,
			os: "",
			ip: "",
			browser: "",
			time: "",
			id: ""
		}), 200);
	}

	useEffect(() => {
		if (sessions) {
			const currentDevice = sessions.filter(device => device.current)[0];
			const currentInformation = currentDevice.sessions.filter(session => session.current)[0];

			setCurrentSession({
				...currentSession,
				os: currentDevice.os,
				ip: currentInformation.ipAddress,
				time: formatDate(currentInformation.started),
				browser: currentInformation.browser,
				id: currentInformation.id
			});
		}
	}, [sessions]);

	useEffect(() => {
		if (detailedSession.id) setIsPopupShown();
	}, [detailedSession]);


	return (
		<AccountTemplate
			documentTitle={msgStr("sessionsTitleHtml")}
			activePage="sessions"
			kcContext={kcContext}
			i18n={i18n}
		>
			<section className="account">
				<h2 className="account__title">{ msgStr("sessionsTitle") }</h2>
				<p className="account__text account__text--mb">{ msgStr("sessionsInstruction") }</p>
				<form action={url.sessionsUrl} method="post" className="account__form account__form--mb">
					<TheInput
						defaultValue={stateChecker}
						name="stateChecker"
						type="hidden"
						isHidden
					/>

					<TheButton
						type="submit"
						tabIndex={1}
						isLogout
					>
						{ msgStr("doLogoutAllSessions") }
					</TheButton>
				</form>
				{(sessions && sessions.length > 0) && (
					<ul className="account__list">
						<li onClick={() => setDetailedSession(currentSession)} className="account__list-el">
							<svg className="account__list-icon" height="24" width="24">
								<use xlinkHref={`${deviceIcons}#${(currentSession.os.toLowerCase() === "windows" || currentSession.os.toLowerCase() === "mac os x" || currentSession.os.toLowerCase() === "linux") ? "desktop" : "mobile"}`}/>
							</svg>
							<span className="account__list-data">
								{ currentSession.os }
								<span className="account__list-started">
									{ currentSession.time }
									<span className="account__list-current">Текущая сессия</span>
								</span>
							</span>
						</li>

						{sessions.map(device => device.sessions.map(session => (
							<Fragment key={session.id}>
								{(!session.current && !device.current) && (
									<li onClick={() => updateSession(device.os, session)} className="account__list-el">
										<svg className="account__list-icon" height="24" width="24">
											<use xlinkHref={`${deviceIcons}#${(device.os.toLowerCase() === "windows" || device.os.toLowerCase() === "mac os x" || device.os.toLowerCase() === "linux") ? "desktop" : "mobile"}`}/>
										</svg>
										<span className="account__list-data">
											{ device.os }
											<span className="account__list-started">{ formatDate(session.started) }</span>
										</span>
									</li>
								)}
							</Fragment>
						)))}
					</ul>
				)}

				<div className={`blackout ${isPopupShown ? "blackout--visible" : ""}`}>
					<div className={`account__session ${isPopupShown ? "account__session--visible" : ""}`}>
						<svg onClick={closePopup} className="account__session-cross" height="24" width="24">
							<use xlinkHref={`${menuIcons}#cross`}/>
						</svg>
						<svg className="account__session-icon" height="24" width="24">
							<use xlinkHref={`${deviceIcons}#${(detailedSession.os.toLowerCase() === "windows" || detailedSession.os.toLowerCase() === "mac os x" || detailedSession.os.toLowerCase() === "linux") ? "desktop" : "mobile"}`}/>
						</svg>
						<span className="account__session-os">{ detailedSession.os }</span>
						<span className={`account__session-time ${detailedSession.current ? "account__session-time--current" : ""}`}>{ detailedSession.time }</span>
						<ul className="account__session-list">
							<li className="account__session-property">
								<span className="account__session-title">{ msgStr("ipLabel") }</span>
								{ detailedSession.ip }
							</li>
							<li className="account__session-property">
								<span className="account__session-title">{ msgStr("timeLabel") }</span>
								{ detailedSession.time }
							</li>
							<li className="account__session-property">
								<span className="account__session-title">{ msgStr("browserLabel") }</span>
								{ detailedSession.browser }
							</li>
						</ul>

						<TheButton onClick={endSession} isLogout type="submit">{ msgStr("doEndTheSession") }</TheButton>
					</div>
				</div>
			</section>
		</AccountTemplate>
	);
}