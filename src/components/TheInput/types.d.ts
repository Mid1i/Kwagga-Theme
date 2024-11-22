import { ReactNode } from "react";


export type BaseInputProps = {
	autocomplete?: string;
	autoFocus?: boolean;
	defaultValue?: string;
	isReadonly?: boolean;
	isDisabled?: boolean;
	tabIndex?: number;
	type: string;
	name: string;
	
	error?: string;
	label?: string;

	children?: ReactNode
}