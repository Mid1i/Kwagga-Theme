import { ReactNode } from "react";


export type TheButtonProps = {
	onClick?: () => void;

	isDisabled?: boolean;
	tabIndex?: number;
	value?: string;
	name?: string;
	type?: "submit" | "reset";
	
	isTransparent?: boolean;
	isMargin?: boolean;
	isLogout?: boolean;

	children?: ReactNode;
}