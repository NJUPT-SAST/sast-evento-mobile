import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonIcon, IonLabel, IonNote } from '@ionic/react';
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
	const states = ['未知', '未开始', '报名中', '进行中', '已取消', '已结束'];
	const stateColor = ['#92949c', '#3dc2ff', '#2dd36f', '#ffc409', '#eb445a', '#92949c'];

	const toEvent = () => {
		history.push(href, { direction: 'forward' });
	}

	const stateInfo = () => {
		/*    
		EventState: 
		NOT_STARTED(1, "未开始"),
		CHECKING_IN(2, "报名中"),
		IN_PROGRESS(3, "进行中"),
		CANCELED(4, "已取消"),
		ENDED(5, "已结束");
		 */
		switch (event.state) {
			case 'NOT_STARTED':
				return '1';
			case 'CHECKING_IN':
				return '2';
			case 'IN_PROGRESS':
				return '3';
			case 'CANCELED':
				return '4';
			case 'ENDED':
				return '5';
			default:
				return '0';
		}
	}

	return (
		<IonCard className='eventCard' onClick={toEvent}>
			<IonCardHeader>
				<IonCardTitle>
					<div className='oneLineTextOverflow'>{event.title}</div>
					<div className='stateWarpper'>
						{states[stateInfo()]}
						<div className='stateCircle' style={{ '--circle-color': stateColor[stateInfo()] }}></div>
					</div>
				</IonCardTitle>
				<IonCardSubtitle>
					<div className='oneLineTextOverflow'>
						<IonIcon icon={peopleOutline}></IonIcon> {departmentNames}
					</div>
				</IonCardSubtitle>
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