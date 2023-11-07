import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonIcon, IonLabel, IonNote, isPlatform } from '@ionic/react';
import './EventCard.scss';
import { Event } from '../context';
import { folderOpenOutline, peopleOutline, pricetagsOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface EventCardProps {
	event: Event;
	isShadow?: true | false | undefined;
}

const EventCard: React.FC<EventCardProps> = ({ event, isShadow }) => {
	const departmentNames: string = (event.departments !== null) ? event.departments.map((department) => department.departmentName).join(' ') : "";
	const history = useHistory();
	const href = `/event/${event.id}`;
	const states = ['未知', '未开始', '报名中', '进行中', '已取消', '已结束'];
	const stateColor = ['#92949c', '#3dc2ff', '#2dd36f', '#ffc409', '#eb445a', '#92949c'];
	const titleWidth = isPlatform('ios') ? "100%" : "calc(100% - 60px)";
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
		<IonCard className='eventCard' onClick={toEvent} style={{ boxShadow: isShadow ? "none" : "rgba(0, 0, 0, 0.12) 0px 4px 16px" }}>
			<IonCardHeader>
				<IonCardTitle>
					<div className='oneLineTextOverflow' style={{'width': titleWidth}}>{event.title}</div>
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
					<div className='timeWarpper'>
						<IonIcon icon={timeOutline}></IonIcon>
						<p>{event.gmtEventStart.slice(5, 10)}</p>
					</div>
				</div>
			</IonCardContent>
			<div className='stateWarpper'>
				{states[stateInfo()]}
				<div className='stateCircle' style={{ '--circle-color': stateColor[stateInfo()] }}></div>
			</div>
		</IonCard>
	);
};

export default EventCard;