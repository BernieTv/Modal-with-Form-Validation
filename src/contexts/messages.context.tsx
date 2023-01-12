import { createContext, FC, useState, Dispatch, SetStateAction } from 'react';
import { IFormFields } from '../components/Modal/Modal';

interface Props {
	children: React.ReactNode;
}

interface IContext {
	currentMessages: IFormFields[];
	setCurrentMessages: Dispatch<SetStateAction<IFormFields[]>>;
}

export const MessagesContext = createContext<IContext>({
	setCurrentMessages: () => null,
	currentMessages: [],
});

export const MessagesProvider: FC<Props> = ({ children }) => {
	const [currentMessages, setCurrentMessages] = useState<IFormFields[]>([]);
	const value = { currentMessages, setCurrentMessages };

	return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};
