import { FormEvent } from "react";

import type { BaseInputProps } from "./types";

import "./styles.scss";


export default function TheInput(props: BaseInputProps) {
	const {
		autoFocus,
		autocomplete,
		children,
		defaultValue,
		isHidden,
		error,
		name,
		onInput,
		isReadonly,
		label,
		tabIndex,
		type,
	} = props;


	return (
		<div className={`field ${isHidden ? "field--hidden" : ""}`}>
			<input
				onInput={(event: FormEvent<HTMLInputElement>) => onInput && onInput(event)}
				autoFocus={autoFocus}
				autoComplete={autocomplete}
				className={ `field__input ${type === "password" ? "password" : ""}` }
				defaultValue={defaultValue}
				readOnly={isReadonly}
				tabIndex={tabIndex}
				placeholder=""
				name={name}
				type={type}
				id={name}
			/>
			<label 
				className={ `field__label ${error ? "error" : ""}` }
				htmlFor={name}
			>
				{ error || label }
			</label>
			<div className="field__icon">
				{children}
			</div>
		</div>
	);
}