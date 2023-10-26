import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonToggle, IonToolbar, ToggleCustomEvent } from '@ionic/react';
import { moon, scanOutline, sunnyOutline } from 'ionicons/icons';
import { ThemeContext } from '../components/ThemeChange';
import React, { useState } from 'react';

const Me: React.FC = () => {
	const { themeToggle, toggleChange } = React.useContext(ThemeContext);
	const [userInfo, setUserInfo] = useState<any | null>(JSON.parse(String(localStorage.getItem('userInfo'))));
	const isLoggedIn = (() => {
		const token = localStorage.getItem('token');
		// console.log(userInfo);
		return token !== null;
	});

	const themeIcon = themeToggle ? moon : sunnyOutline;
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton fill="clear" slot="end" size='small'>
						<IonIcon icon={scanOutline} color="primary"></IonIcon>
					</IonButton>
					<IonButton fill='clear' slot='end' size='small' onClick={toggleChange}>
						<IonIcon icon={themeIcon} color="primary"></IonIcon>
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className='userProfile'>
					{isLoggedIn() ? (
						<IonItem>
							<h2 className='userProfile__name'>{String(userInfo.studentId).toUpperCase()}</h2>
						</IonItem>
					) : (
						<IonItem href="/login">
							<h2 className='userProfile__name'>请登录/注册</h2>
						</IonItem>
					)}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Me;