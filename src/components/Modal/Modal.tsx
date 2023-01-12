import {
	ChangeEvent,
	Dispatch,
	FC,
	FormEvent,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import InputMask from 'react-input-mask';
import { MessagesContext } from '../../contexts/messages.context';

import {
	checkEmail,
	checkMessage,
	checkPhoneNumber,
	checkUsername,
	normalizePhoneNumber,
} from '../../utils';
import InfoTable from '../InfoTable/InfoTable';

import styles from './Modal.module.css';

interface IModalProps {
	modalIsOpen: boolean;
	setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}
export interface IFormFields {
	username: string;
	email: string;
	phoneNumber: string;
	message: string;
}

const defaultFormFields: IFormFields = {
	username: '',
	email: '',
	phoneNumber: '',
	message: '',
};

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

const Modal: FC<IModalProps> = ({ modalIsOpen, setModalIsOpen }) => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState<boolean>(false);
	const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
	const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<string | null>(
		null
	);
	const [messageError, setMessageError] = useState<string | null>(null);
	const { currentMessages, setCurrentMessages } = useContext(MessagesContext);

	const { username, email, phoneNumber, message } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const resetErrorMessages = () => {
		setUsernameErrorMessage(null);
		setEmailErrorMessage(null);
		setPhoneNumberErrorMessage(null);
		setMessageError(null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const dataToSend = JSON.stringify(formFields);
			setCurrentMessages((prevState) => [...prevState, formFields]);

			const data = await fetch('https://google.com', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: dataToSend,
			});

			if (data.ok) {
				alert('Form is submitted');
			} else {
				throw new Error('Server Error');
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			alert(error.message);
		}

		resetFormFields();
		resetErrorMessages();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;

		if (name === 'phoneNumber') {
			const rawValue = normalizePhoneNumber(value);

			checkPhoneNumber(value, setPhoneNumberErrorMessage, setError);
			return setFormFields({ ...formFields, [name]: rawValue });
		}

		setFormFields({ ...formFields, [name]: value });

		switch (name) {
			case 'username':
				checkUsername(value, setUsernameErrorMessage, setError);
				break;
			case 'email':
				checkEmail(value, setEmailErrorMessage, setError);
				break;
			case 'message':
				checkMessage(value, setMessageError, setError);
				break;
		}
	};

	const handleEscKey = useCallback((event: KeyboardEvent) => {
		if (event.key === KEY_NAME_ESC) {
			setModalIsOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

		return () => {
			document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
		};
	}, [handleEscKey]);

	return (
		<div className={`${styles.modal} ${modalIsOpen ? '' : 'hidden'}`}>
			<button
				className={`${styles['close-modal']}`}
				onClick={() => setModalIsOpen((prevState) => !prevState)}>
				&times;
			</button>

			<form
				onSubmit={handleSubmit}
				className={`${styles.form} ${error ? 'error' : 'success'}`}>
				<div className={`${styles['input-box']}`}>
					<label htmlFor='username'>Full Name</label>
					<input
						id='username'
						className={`${
							usernameErrorMessage && usernameErrorMessage.length > 0
								? `${styles.error}`
								: ''
						} ${usernameErrorMessage === '' ? `${styles.success}` : ''}`}
						onChange={handleChange}
						type='text'
						placeholder='Enter full name'
						required
						name='username'
						value={username}
					/>
					<small>
						{usernameErrorMessage === '' ? (
							<span>Username is valid.</span>
						) : (
							usernameErrorMessage
						)}
					</small>
				</div>

				<div className={`${styles['input-box']}`}>
					<label htmlFor='email'>Email Address</label>
					<input
						id='email'
						className={`${
							emailErrorMessage && emailErrorMessage.length > 0
								? `${styles.error}`
								: ''
						} ${emailErrorMessage === '' ? `${styles.success}` : ''}`}
						onChange={handleChange}
						type='text'
						placeholder='Enter email address'
						required
						name='email'
						value={email}
					/>
					<small>
						{emailErrorMessage === '' ? (
							<span>Email is valid.</span>
						) : (
							emailErrorMessage
						)}
					</small>
				</div>

				<div className={`${styles['input-box']}`}>
					<label htmlFor='phoneNumber'>Phone Number</label>
					<InputMask
						mask='+7 (999) 999-99-99'
						className={`${
							phoneNumberErrorMessage && phoneNumberErrorMessage.length > 0
								? `${styles.error}`
								: ''
						} ${phoneNumberErrorMessage === '' ? `${styles.success}` : ''}`}
						id='phoneNumber'
						onChange={handleChange}
						type='text'
						placeholder='Enter phone number'
						required
						name='phoneNumber'
						value={phoneNumber}
						autoComplete='off'
					/>
					<small>
						{phoneNumberErrorMessage === '' ? (
							<span>Phone Number is valid.</span>
						) : (
							phoneNumberErrorMessage
						)}
					</small>
				</div>

				<div className={`${styles['input-box']}`}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						className={`${
							messageError && messageError.length > 0 ? `${styles.error}` : ''
						} ${messageError === '' ? `${styles.success}` : ''}`}
						id='message'
						onChange={handleChange}
						placeholder='Your message'
						required
						name='message'
						value={message}
					/>
					<small>
						{messageError === '' ? <span>Message is valid.</span> : messageError}
					</small>
				</div>

				<button disabled={error} type='submit'>
					Submit
				</button>
			</form>

			<h1>Users Messages</h1>
			{currentMessages.length === 0 ? (
				<InfoTable content={[]} />
			) : (
				<InfoTable content={currentMessages} />
			)}
		</div>
	);
};

export default Modal;
