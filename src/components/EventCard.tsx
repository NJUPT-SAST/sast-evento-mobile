import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonIcon, IonLabel, IonNote, isPlatform, IonSkeletonText, useIonRouter } from '@ionic/react';
import './EventCard.scss';
import { Event } from '../context';
import { folderOpenOutline, peopleOutline, pricetagsOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Toast } from '@capacitor/toast';

interface EventCardProps {
	event: Event;
	isShadow?: true | false | undefined;
}

const EventCard: React.FC<EventCardProps> = ({ event, isShadow }) => {
	const router = useIonRouter();
	const states = ['未知', '未开始', '报名中', '进行中', '已取消', '已结束'];
	const stateColor = ['#92949c', '#3dc2ff', '#2dd36f', '#ffc409', '#eb445a', '#92949c'];
	const titleWidth = isPlatform('ios') ? "100%" : "calc(100% - 60px)";

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

	if (event.id === null) {
		return (
			<IonCard className='eventCard' style={{ boxShadow: isShadow ? "none" : "rgba(0, 0, 0, 0.12) 0px 4px 16px" }}>
				<IonCardHeader>
					<IonCardTitle>
						<div className='oneLineTextOverflow' style={{ 'width': titleWidth }}>
							<IonSkeletonText animated={true} style={{ width: '80%', "height": "30px" }}></IonSkeletonText>
						</div>
					</IonCardTitle>
					<IonCardSubtitle>
						<div className='oneLineTextOverflow'>
							<IonIcon icon={peopleOutline}></IonIcon> <IonSkeletonText animated={true} style={{ width: '90px' }}></IonSkeletonText>
						</div>
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
					<IonSkeletonText animated={true} style={{ width: '100%', "marginBottom": "15px" }}></IonSkeletonText>
					<div className='categryWarpper'>
						<div className='typeWarpper'>
							<IonIcon icon={folderOpenOutline}></IonIcon>
							<IonSkeletonText animated={true} style={{ width: '30px' }}></IonSkeletonText>
						</div>
						<div className='tagWarpper'>
							<IonIcon icon={pricetagsOutline}></IonIcon> <IonSkeletonText animated={true} style={{ width: '30px' }}></IonSkeletonText>
						</div>
						<div className='timeWarpper'>
							<IonIcon icon={timeOutline}></IonIcon> <IonSkeletonText animated={true} style={{ width: '50px' }}></IonSkeletonText>
						</div>
					</div>
				</IonCardContent>
				<div className='stateWarpper'>
					{states[0]}
					<div className='stateCircle' style={{ '--circle-color': stateColor[0] }}></div>
				</div>
			</IonCard>
		)
	}

	const toEvent = () => {
		if (typeof event.id === 'number' && event.id !== 0) {
			router.push(`/event/${event.id}`, 'forward');
		} else {
			Toast.show({
				text: '这里不可以 (⋟﹏⋞)',
				duration: 'short',
				position: 'center'
			});
		}
	}

	return (
		<IonCard className='eventCard' onClick={toEvent} style={{ boxShadow: isShadow ? "none" : "rgba(0, 0, 0, 0.12) 0px 4px 16px" }}>
			<IonCardHeader>
				<IonCardTitle>
					<div className='oneLineTextOverflow' style={{ 'width': titleWidth }}>{event.title}</div>
				</IonCardTitle>
				<IonCardSubtitle>
					<div className='oneLineTextOverflow'>
						<IonIcon icon={peopleOutline}></IonIcon> {(event.departments !== undefined && event.departments !== null) ? event.departments.map((department) => department.departmentName).join(' ') : ""}
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