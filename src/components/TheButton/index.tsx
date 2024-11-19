import type { TheButtonProps } from "./types";

import "./styles.scss";


export default function TheButton(props: TheButtonProps) {
	const {
		isDisabled,
		isTransparent,
		tabIndex,
		children
	} = props;


	return (
		<button 
			disabled={isDisabled} 
			tabIndex={tabIndex}
			className={ `button ${isTransparent ? "transparent" : ""}` }
		>
			{children}
		</button>
	);
}