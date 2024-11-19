import type { TheSocialLinkProps } from "./types";

import googleLogo from "@/assets/icons/social/google.svg";
import yandexLogo from "@/assets/icons/social/yandex.svg";
import "./styles.scss";


export default function TheSocialLink(props: TheSocialLinkProps) {
	const {
		alias,
		displayName,
		loginUrl,
		i18n
	} = props;

	const { msgStr } = i18n;


	return (
		<>
			<a 
				className="social-link" 
				href={loginUrl}
			>
				<img 
					alt={displayName} 
					src={alias === "google" ? googleLogo : yandexLogo}
					className="social-link__image"
				/>
				{ `${msgStr("doContinueWith")} ${displayName}` }
			</a>
			</>
	);
}