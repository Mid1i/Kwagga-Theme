import { ReactNode } from "react";


export type TheButtonProps = {
	isDisabled?: boolean;
	tabIndex?: number;
	value?: string;
	name?: string;
	
	isTransparent?: boolean;
	isMargin?: boolean;
	isLogout?: boolean;

	children?: ReactNode;
}