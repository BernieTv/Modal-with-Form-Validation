import { useState } from 'react';

import Modal from './components/Modal/Modal';

import './App.css';

const App = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	return (
		<main className='container flex--center'>
			<button
				className='show-modal'
				onClick={() => setModalIsOpen((prevState) => !prevState)}>
				Show Modal
			</button>
			{modalIsOpen ? (
				<Modal setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
			) : null}
			<div
				className={`overlay ${modalIsOpen ? '' : 'hidden'}`}
				onClick={() => setModalIsOpen((prevState) => !prevState)}></div>
		</main>
	);
};

export default App;
