import type { TheButtonProps } from "./types";

import "./styles.scss";


export default function TheButton(props: TheButtonProps) {
	const {
		onClick,
		isDisabled,
		isTransparent,
		isLogout,
		isMargin,
		tabIndex,
		children,
		value,
		type,
		name
	} = props;


	return (
		<button 
			onClick={() => onClick && onClick()}
			disabled={isDisabled} 
			tabIndex={tabIndex}
			className={`
				button 
				${isTransparent ? "button--transparent" : ""} 
			  ${isLogout ? "button--logout" : ""}
				${isMargin ? "button--mb" : ""}
			`}
			defaultValue={value}
			type={type ?? "submit"}
			name={name}
		>
			{children}
		</button>
	);
}