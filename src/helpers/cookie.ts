export const setCookie = (name: string, value: string, expiresIn: number): void => {
	const date = new Date();
	date.setTime(date.getTime() + expiresIn);
	document.cookie = `${name}=${value};expires=${date.toUTCString()};path="/"`;
}


export const getCookie = (name: string): string | null => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	
	if (parts.length === 2) {
		const part = parts.pop();
		if (part) return part.split(";").shift() || null;
	}

	return null;
} 