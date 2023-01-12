const isRequired = (value: string) => (value === '' ? false : true);

function isValid(value: string) {
	const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

	return !format.test(value);
}

const isBetween = (length: number, min: number, max: number) =>
	length < min || length > max ? false : true;

const isEmailValid = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const checkUsername = (
	username: string,
	setUsernameErrorMessage: (message: string | null) => void,
	setError: (errorState: boolean) => void
) => {
	let valid = false;
	const min = 3,
		max = 25;
	const trimmedUsername = username.trim();

	if (!isRequired(trimmedUsername)) {
		setUsernameErrorMessage('Username cannot be blank.');
		setError(true);
	} else if (!isBetween(trimmedUsername.length, min, max)) {
		setUsernameErrorMessage(`Username must be between ${min} and ${max} characters.`);
		setError(true);
	} else if (!isValid(trimmedUsername)) {
		setUsernameErrorMessage(
			`Username should not consist of this special characters in (!@#$%^&*)`
		);
		setError(true);
	} else {
		setUsernameErrorMessage('');
		setError(false);
		valid = true;
	}

	return valid;
};

export const checkEmail = (
	email: string,
	setEmailErrorMessage: (message: string | null) => void,
	setError: (errorState: boolean) => void
) => {
	let valid = false;
	const trimmedEmailValue = email.trim();

	if (!isRequired(trimmedEmailValue)) {
		setEmailErrorMessage('Email cannot be blank.');
		setError(true);
	} else if (!isEmailValid(trimmedEmailValue)) {
		setEmailErrorMessage('Email is not valid.');
		setError(true);
	} else {
		setEmailErrorMessage('');
		setError(false);
		valid = true;
	}

	return valid;
};

export const checkPhoneNumber = (
	phoneNumber: string,
	setPhoneNumberErrorMessage: (message: string | null) => void,
	setError: (errorState: boolean) => void
) => {
	let valid = false;

	const trimmedPhoneNumber = normalizePhoneNumber(phoneNumber).slice(2);

	if (!isRequired(trimmedPhoneNumber)) {
		setPhoneNumberErrorMessage('Phone number cannot be blank.');
		setError(true);
	} else if (trimmedPhoneNumber.length < 10) {
		setPhoneNumberErrorMessage('Phone number not filled yet.');
		setError(true);
	} else {
		setPhoneNumberErrorMessage('');
		setError(false);
		valid = true;
	}

	return valid;
};

export const checkMessage = (
	message: string,
	setMessageError: (message: string | null) => void,
	setError: (errorState: boolean) => void
) => {
	let valid = false;

	const trimmedMessage = message.trim();

	if (!isRequired(trimmedMessage)) {
		setMessageError('Message cannot be blank.');
		setError(true);
	} else if (!isValid(trimmedMessage)) {
		setMessageError(
			`Message should not consist of this special characters in (!@#$%^&*)`
		);
		setError(true);
	} else {
		setMessageError('');
		setError(false);
		valid = true;
	}

	return valid;
};

export const normalizePhoneNumber = (value: string) => {
	return value
		.replace('(', '')
		.replace(')', '')
		.replaceAll('_', '')
		.replaceAll('-', ' ')
		.replaceAll(' ', '')
		.trim();
};
