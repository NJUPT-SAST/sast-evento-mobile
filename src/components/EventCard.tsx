// a component of event including an image, its title, its group and its discription
// using ionic
import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonContent, IonLabel, IonBadge, IonHeader, IonCardSubtitle } from '@ionic/react';
import './EventCard.scss';
import { Event } from '../context';

interface EventCardProps {
	event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const departmentNames: string = event.departments.map((department) => department.departmentName).join(' ');
	return (
		<IonCard className='eventCard'>
			<IonImg src="https://ionicframework.com/docs/demos/api/card/madison.jpg" class='img' />
			<IonContent>
				<IonCardHeader>
					<IonCardTitle>{event.title}</IonCardTitle>
					<IonCardSubtitle>{departmentNames}</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent className='eventDetail'>
					<IonContent>活动时间: </IonContent>
					<IonContent>{event.gmtEventStart} - {event.gmtEventEnd}</IonContent>
				</IonCardContent>
				<IonCardContent>
					<IonContent>报名时间:</IonContent>
					<IonContent>{event.gmtRegistrationStart} - {event.gmtRegistrationEnd}</IonContent>
				</IonCardContent>
			</IonContent>
			<IonButton color="primary" size="small" expand="block">报名</IonButton>
		</IonCard>
	);
};

export default EventCard;