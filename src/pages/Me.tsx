import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonToolbar } from '@ionic/react';
import type { ToggleCustomEvent } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { moon, sunny } from 'ionicons/icons';

const Me: React.FC = () => {
	const isLoggedIn = false; // You can replace this with your authentication logic

	const [themeToggle, setThemeToggle] = useState(false);
	// Listen for the toggle check/uncheck to toggle the dark theme
	const toggleChange = (ev: ToggleCustomEvent) => {
		toggleDarkTheme(ev.detail.checked);
	};

	// Add or remove the "dark" class on the document body
	const toggleDarkTheme = (shouldAdd: boolean) => {
		document.body.classList.toggle('dark', shouldAdd);
	};

	// Check/uncheck the toggle and update the theme based on isDark
	const initializeDarkTheme = (isDark: boolean) => {
		setThemeToggle(isDark);
		toggleDarkTheme(isDark);
	};

	useEffect(() => {
		// Use matchMedia to check the user preference
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

		// Initialize the dark theme based on the initial
		// value of the prefers-color-scheme media query
		initializeDarkTheme(prefersDark.matches);

		// Listen for changes to the prefers-color-scheme media query
		prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));
	}, []);

	const themeIcon = themeToggle ? moon : sunny;

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						{/* theme switch */}
						<IonButtons slot="start">
							<IonButton >
								{/* <IonButton onClick={toggleChange}> */}
								<IonIcon slot="icon-only" icon={themeIcon} />
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent className='userProfile'>
					{isLoggedIn ? (
						<IonItem>
							<h1 className='userProfile__name'>B22000000</h1>
						</IonItem>
					) : (
						<IonItem routerLink="/login">
							<h1 className='userProfile__name'>请登录/注册</h1>
						</IonItem>
					)}
				</IonContent>
			</IonContent>
		</IonPage>
	);
};

export default Me;