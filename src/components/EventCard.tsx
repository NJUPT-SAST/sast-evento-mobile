import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonIcon } from '@ionic/react';
import './EventCard.scss';
import { Event } from '../context';
import { folderOpenOutline, peopleOutline, pricetagsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface EventCardProps {
	event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const departmentNames: string = (event.departments !== null) ? event.departments.map((department) => department.departmentName).join(' ') : "";
	const history = useHistory();
	const href = `/event/${event.id}`;
	const toEvent = () => {
		history.push(href, { direction: 'forward' });
	}
	
	return (
		<IonCard className='eventCard' onClick={toEvent}>
			<IonCardHeader>
				<IonCardTitle>{event.title}</IonCardTitle>
				<IonCardSubtitle><IonIcon icon={peopleOutline}></IonIcon> {departmentNames}</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				<p>{event.description}</p>
				<div className='categryWarpper'>
          <div className='typeWarpper'>
            <IonIcon icon={folderOpenOutline}></IonIcon>
            <p>{event.eventType.typeName}</p>
          </div>
          <div className='tagWarpper'>
            <IonIcon icon={pricetagsOutline}></IonIcon>
            <p>{event.tag}</p>
          </div>
        </div>
			</IonCardContent>
			{/* <IonButton color="light" size="small" expand="block" disabled={event.state !== "CHECKING_IN"}>报名</IonButton> */}
		</IonCard>
	);
};

export default EventCard;