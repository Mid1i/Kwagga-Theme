import type { I18n } from "@/login/i18n";

import "./styles.scss";


export default function TheLineText(props: { i18n: I18n }) {
	const { msgStr } = props.i18n;


	return (
		<span className="line">{ msgStr("or") }</span>
	);
}