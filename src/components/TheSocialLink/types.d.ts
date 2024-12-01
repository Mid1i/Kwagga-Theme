import type { I18n } from "@/login/i18n";


export type TheSocialLinkProps = {
	alias: string;
	displayName: string;
	loginUrl: string;

	tabIndex: number;

	i18n: I18n;
}