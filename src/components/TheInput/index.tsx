import type { BaseInputProps } from "./types";

import "./styles.scss";


export default function TheInput(props: BaseInputProps) {
	const {
		autoFocus,
		autocomplete,
		children,
		defaultValue,
		error,
		name,
		isReadonly,
		isDisabled,
		label,
		tabIndex,
		type,
	} = props;


	return (
		<div className="field">
			<input
				autoFocus={autoFocus}
				autoComplete={autocomplete}
				className={ `field__input ${type === "password" ? "password" : ""}` }
				defaultValue={defaultValue}
				disabled={isDisabled}
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