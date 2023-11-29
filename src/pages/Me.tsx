import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonThumbnail, IonToggle, IonToolbar, ToggleCustomEvent, getPlatforms, isPlatform, useIonRouter } from '@ionic/react';
import { albumsOutline, logOutOutline, moon, pencilOutline, scanOutline, settingsOutline, sunnyOutline } from 'ionicons/icons';
import { ThemeContext } from '../components/ThemeChange';
import React, { useEffect, useState } from 'react';

import './Me.scss';
import OnDevAlert from '../components/OnDevAlert';
import { eventCheckIn, getUserInfo } from '../apis/user';
import Profile from '../components/Profile';
import { useUserInfoStore } from '../util/store';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Toast } from '@capacitor/toast';
import { logout } from '../apis/login';

const Me: React.FC = () => {
	const { themeToggle, toggleChange } = React.useContext(ThemeContext);
	const userInfoStore = useUserInfoStore((state) => state);
	const userInfo = userInfoStore.userInfo;
	const router = useIonRouter();
	const isLoggedIn = localStorage.getItem('token') !== null;

	const themeIcon = themeToggle ? moon : sunnyOutline;

	useEffect(() => {
		if (isLoggedIn && userInfo === undefined) {
			getUserInfo().then((res) => {
				userInfoStore.updateUserInfo(res);
			});
		}
	}, [userInfo])
	
	const logOut = () => {
		logout();
		localStorage.clear();
		userInfoStore.rmUserInfo();
	}

	const toHistoryEvents = () => {
		router.push("/history", 'forward');
	}

	const toGitHub = () => {
		const url = "https://github.com/NJUPT-SAST/sast-evento-mobile/issues";
		window.open(url, '_blank')?.focus();
	}

	const toScanner = () => {
		router.push("/scanner", 'forward');
	}

	const toSetting = () => {
		router.push("/setting", 'forward');
	}

	const handleRefresh = () => {
		window.location.reload();
	}

	return (
		<IonPage>
			<IonHeader translucent={false}>
				<IonToolbar>
					<IonButton id='scaning' fill="clear" slot="end" size='small' onClick={toScanner}>
						<IonIcon icon={scanOutline} color="primary"></IonIcon>
					</IonButton>
					{/* <OnDevAlert trigger='scaning'></OnDevAlert> */}
					<IonButton fill='clear' slot='end' size='small' onClick={toggleChange}>
						<IonIcon icon={themeIcon} color="primary"></IonIcon>
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>
				<div className='meWarpper'>
					<IonCard className='userProfileWarpper'>
						{isLoggedIn ? (
							<>
								<IonItem lines="none" id='userBasicInfo' detail={true}>
									<IonThumbnail slot="start">
										<IonImg src={userInfo?.avatar !== null ? userInfo?.avatar : "/app.ico"} alt="avatar" className='userProfileAvatar' />
									</IonThumbnail>
									<h2 slot="start" className='userProfile__name'>{String(userInfo?.nickname)}</h2>
								</IonItem>
								<Profile trigger='userBasicInfo' ></Profile>
							</>
						) : (
							<IonItem onClick={() => { router.push("/login", "forward") }} lines="none" detail={true}>
								<IonThumbnail slot="start">
									<IonImg src="/app.ico" alt="avatar" className='userProfileAvatar' />
								</IonThumbnail>
								<h2 slot="start" className='userProfile__name'>请登录/注册</h2>
							</IonItem>
						)}
					</IonCard>
					<IonCard className='functionsWarpper'>
						<IonList>
							<IonItem button={true} onClick={toHistoryEvents}>
								<IonIcon aria-hidden="true" icon={albumsOutline} slot='start'></IonIcon>
								<IonLabel>历史活动</IonLabel>
							</IonItem>
							<IonItem button={true} id='suggestion' onClick={toGitHub}>
								<IonIcon aria-hidden="true" icon={pencilOutline} slot='start'></IonIcon>
								<IonLabel>意见反馈</IonLabel>
							</IonItem>
							<IonItem button={true} id='setting' onClick={toSetting}>
								<IonIcon aria-hidden="true" icon={settingsOutline} slot='start'></IonIcon>
								<IonLabel>设置</IonLabel>
							</IonItem>
						</IonList>
					</IonCard>
					<IonCard className='logoutWarpper'>
						<IonList>
							<IonItem button={true} onClick={logOut} lines='none' disabled={!isLoggedIn}>
								<IonIcon icon={logOutOutline} color='danger' className='functionIcon' slot='start'></IonIcon>
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