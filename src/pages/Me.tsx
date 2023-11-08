import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonToggle, IonToolbar, ToggleCustomEvent, useIonRouter } from '@ionic/react';
import { albumsOutline, logOutOutline, moon, pencilOutline, scanOutline, settingsOutline, sunnyOutline } from 'ionicons/icons';
import { ThemeContext } from '../components/ThemeChange';
import React, { useState } from 'react';

import './Me.scss';
import OnDevAlert from '../components/OnDevAlert';

const Me: React.FC = () => {
	const { themeToggle, toggleChange } = React.useContext(ThemeContext);
	const [userInfo, setUserInfo] = useState<any | null>(JSON.parse(String(localStorage.getItem('userInfo'))));
	const router = useIonRouter();
	const isLoggedIn = (() => {
		const token = localStorage.getItem('token');
		return token !== null;
	});

	const themeIcon = themeToggle ? moon : sunnyOutline;

	const logOut = () => {
		localStorage.clear();
		setUserInfo(null)
	}

	const toHistoryEvents = () => {
		router.push("/history", 'forward');
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton id='scaning' fill="clear" slot="end" size='small'>
						<IonIcon icon={scanOutline} color="primary"></IonIcon>
					</IonButton>
					<OnDevAlert trigger='scaning'></OnDevAlert>
					<IonButton fill='clear' slot='end' size='small' onClick={toggleChange}>
						<IonIcon icon={themeIcon} color="primary"></IonIcon>
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className='meWarpper'>
					<IonCard className='userProfileWarpper'>
						{isLoggedIn() ? (
							<IonItem lines="none">
								<IonThumbnail slot="start">
									<IonImg src={userInfo.avatar !== null ? userInfo.avatar : "/link.ico"} alt="avatar" />
								</IonThumbnail>
								<h2 slot="start" className='userProfile__name'>{String(userInfo.studentId).toUpperCase()}</h2>
							</IonItem>
						) : (
							<IonItem href="/login" lines="none">
								<IonThumbnail slot="start">
									<IonImg src="/link.ico" alt="avatar" />
								</IonThumbnail>
								<h2 slot="start" className='userProfile__name'>请登录/注册</h2>
							</IonItem>
						)}
					</IonCard>
					<IonCard className='functionsWarpper'>
						<IonList>
							<IonItem button={true} onClick={toHistoryEvents} lines='full'>
								<IonIcon icon={albumsOutline} className='functionIcon'></IonIcon>
								<IonLabel>历史活动</IonLabel>
							</IonItem>
							<IonItem id='suggestion' button={true} lines='full'>
								<IonIcon icon={pencilOutline} className='functionIcon'></IonIcon>
								<IonLabel>意见反馈</IonLabel>
							</IonItem>
							<OnDevAlert trigger='suggestion'></OnDevAlert>
							<IonItem id='setting' button={true} lines='none'>
								<IonIcon icon={settingsOutline} className='functionIcon'></IonIcon>
								<IonLabel>设置</IonLabel>
							</IonItem>
							<OnDevAlert trigger='setting'></OnDevAlert>
						</IonList>
					</IonCard>
					<IonCard className='logoutWarpper'>
						<IonList>
							<IonItem button={true} onClick={logOut} lines='none'>
								<IonIcon icon={logOutOutline} color='danger' className='functionIcon'></IonIcon>
								<IonLabel color="danger">退出登录</IonLabel>
							</IonItem>
						</IonList>
					</IonCard>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Me;