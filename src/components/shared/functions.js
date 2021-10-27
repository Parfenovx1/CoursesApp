export function getTimeFromMins(mins) {
	let hours = Math.trunc(mins / 60);
	let minutes = mins % 60;
	return (
		(hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes
	);
}

export function handleOnChange(event, setter, obj) {
	setter({ ...obj, [event.target.name]: event.target.value });
}
