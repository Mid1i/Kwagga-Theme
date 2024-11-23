export const formatDate = (date: number) => {
	const formattedDate = new Date(date * 1000);
	
	formattedDate.setMinutes(formattedDate.getMinutes() + formattedDate.getTimezoneOffset() + 180);
	
	const months: Record<number, string> = {
		0: "Января",
		1: "Февраля",
		2: "Марта",
		3: "Апреля",
		4: "Мая",
		5: "Июня",
		6: "Июля",
		7: "Августа",
		8: "Сентября",
		9: "Октября",
		10: "Ноября",
		11: "Декабря"
	};

	const fullDate = formattedDate.getDate().toString().padStart(2, "0");
	const monthName = months[formattedDate.getMonth()];
	const time = formattedDate.toTimeString().slice(0, 5);

	return `${fullDate} ${monthName} в ${time}`; 
}