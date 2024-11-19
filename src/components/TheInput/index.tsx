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
				id={name}
				name={name}
				readOnly={isReadonly}
				tabIndex={tabIndex}
				type={type}
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