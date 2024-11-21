import type { PageProps } from "@/account/PageProps";
import type { KcContext } from "@/account/KcContext";
import type { I18n } from "@/account/i18n";

import AccountTemplate from "@/layouts/AccountTemplate";


export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    // const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;

    const { msgStr } = i18n;


    return (
      <AccountTemplate
				activePage="account"
			  documentTitle={msgStr("accountTitleHtml")}
				kcContext={kcContext}
				i18n={i18n}
			>
				<>
				</>
			</AccountTemplate>
    );
}