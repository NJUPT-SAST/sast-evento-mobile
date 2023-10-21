import { IonContent, IonItem, IonPage } from '@ionic/react';
import React from 'react';

const Me: React.FC = () => {
	const isLoggedIn = false; // You can replace this with your authentication logic

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonContent className='userProfile'>
					{isLoggedIn ? (
						<IonItem>
							<h1 className='userProfile__name'>B22000000</h1>
						</IonItem>
					) : (
						<IonItem href="/login">
							<h1 className='userProfile__name'>请登录/注册</h1>
						</IonItem>
					)}
				</IonContent>
			</IonContent>
		</IonPage>
	);
};

export default Me;