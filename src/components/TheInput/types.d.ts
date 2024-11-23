import { ReactNode, FormEvent } from "react";


export type BaseInputProps = {
	autocomplete?: string;
	autoFocus?: boolean;
	defaultValue?: string;
	isReadonly?: boolean;
	tabIndex?: number;
	type: string;
	name: string;

	onInput?: (event:  FormEvent<HTMLInputElement>) => void;

	isHidden?: boolean;
	
	error?: string;
	label?: string;

	children?: ReactNode
}