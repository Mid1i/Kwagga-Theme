import type { TheCheckboxProps } from "./types";

import checkIcon from "@/assets/icons/check.svg";
import "./styles.scss";


export default function TheCheckbox(props: TheCheckboxProps) {
	const {
		name,
		label,
		tabIndex,
		checked
	} = props;


	return (
		<label htmlFor={name} className="checkbox">
			<input
				defaultChecked={checked}
				name={name}
				id={name}
				type="checkbox"
				tabIndex={tabIndex}
				className="checkbox__input"
			/>
			<span className="checkbox__icon">
				<img 
					src={checkIcon}
					className="checkbox__icon-image" 
					alt="Галочка" 
				/>
			</span>
			{label}
		</label>
	);
}