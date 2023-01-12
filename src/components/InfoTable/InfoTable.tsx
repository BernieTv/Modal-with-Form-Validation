import { FC } from 'react';
import { IFormFields } from '../Modal/Modal';

import './InfoTable.css';

interface InfoTablePropsI {
	content: IFormFields[];
}

const InfoTable: FC<InfoTablePropsI> = ({ content }) => {
	return (
		<table className='customTable'>
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Phone Number</th>
					<th>Message</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Bekzod Tukhtasinov</td>
					<td>bektuxtasinov@gmail.com</td>
					<td>+998 (99) 688-14-20</td>
					<td>Task is finished.</td>
				</tr>

				{content.map(({ email, message, phoneNumber, username }, idx) => {
					return (
						<tr key={idx}>
							<td>{username}</td>
							<td>{email}</td>
							<td>{phoneNumber}</td>
							<td>{message}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default InfoTable;
