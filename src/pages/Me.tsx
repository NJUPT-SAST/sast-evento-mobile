import { IonContent, IonItem, IonPage } from '@ionic/react';

import React, { useState } from 'react';

const Me: React.FC = () => {
	const [userInfo, setUserInfo] = useState<any | null>(JSON.parse(String(localStorage.getItem('userInfo'))));
	const isLoggedIn = (() => {
		const token = localStorage.getItem('token');
		console.log(userInfo);
		return token !== null;
	});

	return (
		<IonPage>
			<IonContent fullscreen>
				<div className='userProfile'>
					{isLoggedIn() ? (
						<IonItem>
							<h1 className='userProfile__name'>{String(userInfo.studentId).toUpperCase()}</h1>
						</IonItem>
					) : (
						<IonItem href="/login">
							<h1 className='userProfile__name'>请登录/注册</h1>
						</IonItem>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Me;