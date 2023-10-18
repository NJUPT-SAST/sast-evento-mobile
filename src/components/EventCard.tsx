// a component of event including an image, its title, its group and its discription
// using ionic
import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonContent, IonLabel, IonBadge, IonHeader, IonCardSubtitle } from '@ionic/react';
import './Event.scss';

const EventCard: React.FC = () => {
	return (
		<IonCard className='eventCard'>
			<IonImg src="https://ionicframework.com/docs/demos/api/card/madison.jpg" class='img' />
			<IonContent>
				<IonCardHeader>
					<IonCardTitle>前后端数据交互</IonCardTitle>
					<IonCardSubtitle>前端组 后端组</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent className='eventDetail'>
					<IonContent>活动时间: </IonContent>
					<IonContent>2021-05-01 12:00 - 2021-05-01 14:00</IonContent>
				</IonCardContent>
				<IonCardContent>
					<IonContent>报名时间:</IonContent>
					<IonContent>2021-04-01 12:00 - 2021-04-30 12:00</IonContent>
				</IonCardContent>
			</IonContent>
			<IonButton color="primary" size="small" expand="block">报名</IonButton>
		</IonCard>
	);
};

export default EventCard;