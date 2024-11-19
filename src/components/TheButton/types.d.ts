import { ReactNode } from "react";


export type TheButtonProps = {
	isDisabled?: boolean;
	isTransparent?: boolean;
	tabIndex?: number;

	children?: ReactNode;
}