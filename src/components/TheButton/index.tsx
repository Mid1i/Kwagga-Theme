import type { TheButtonProps } from "./types";

import "./styles.scss";


export default function TheButton(props: TheButtonProps) {
	const {
		isDisabled,
		isTransparent,
		isLogout,
		isMargin,
		tabIndex,
		children,
		value,
		name
	} = props;


	return (
		<button 
			disabled={isDisabled} 
			tabIndex={tabIndex}
			className={`
				button 
				${isTransparent ? "button--transparent" : ""} 
			  ${isLogout ? "button--logout" : ""}
				${isMargin ? "button--mb" : ""}
			`}
			defaultValue={value}
			name={name}
		>
			{children}
		</button>
	);
}