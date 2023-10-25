import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonToggle, IonToolbar, ToggleCustomEvent } from '@ionic/react';
import { moon, scanOutline } from 'ionicons/icons';
import { ThemeContext } from '../components/ThemeChange';
import React, { useEffect, useState } from 'react';

const Me: React.FC = () => {
	const { themeToggle, toggleChange } = React.useContext(ThemeContext);
	const [userInfo, setUserInfo] = useState<any | null>(JSON.parse(String(localStorage.getItem('userInfo'))));
	const isLoggedIn = (() => {
		const token = localStorage.getItem('token');
		// console.log(userInfo);
		return token !== null;
	});
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton fill="clear" slot="end" style={{"height": "25px"}}>
						<IonIcon icon={scanOutline} color="medium"></IonIcon>
					</IonButton>
					<IonButton fill='clear' slot='end' style={{"height": "25px"}}>
						<IonIcon icon={moon} color='medium'></IonIcon>
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
					<IonItem>
						<IonToggle checked={themeToggle} onIonChange={toggleChange} justify="space-between">
							Dark Mode
						</IonToggle>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Me;