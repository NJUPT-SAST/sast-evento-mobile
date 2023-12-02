import { GestureDetail, IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTab, IonToolbar, createGesture } from '@ionic/react';
import './Schedule.scss'
import { useState } from 'react';
import RegisteredEvents from '../components/RegisteredEvents';
import Subscribe from '../components/Subscribe';
import { useRefreshStore } from '../util/refresh';

const SubscriptionsPage: React.FC = () => {
	const [selectedSegment, setSelectedSegment] = useState<string>('subscriptions');
	const refreshStore = useRefreshStore();
	// const content = document.querySelector('ion-content') as HTMLElement;
	// let contentMove = 0;
	const handleRefresh = () => {
		switch (selectedSegment) {
			case 'subscriptions': 
				refreshStore.setIsSubscribedEventsRefresh(true);
				refreshStore.setIsSubscribedDepartmentRefresh(true);
				break;
			case 'participate':
				refreshStore.setIsRegisteredEventsRefresh(true);
				break;
			default:
				break;
		}
		window.location.reload();
	}
	const handleSegmentChange = (e: any) => {
		setSelectedSegment(e.detail.value);
	}

	return (
		<IonPage>
			<IonHeader translucent={false}>
				<IonToolbar>
					<IonSegment onIonChange={handleSegmentChange} value={selectedSegment}>
						<IonSegmentButton value="subscriptions">
							订阅
						</IonSegmentButton>
						<IonSegmentButton value="participate">
							参与
						</IonSegmentButton>
					</IonSegment>
				</IonToolbar>
			</IonHeader>
			<IonContent className='subscriptionsPageWarpper'>
				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>
				{selectedSegment === 'subscriptions' &&
					<div>
						<Subscribe></Subscribe>
					</div>
				}
				{
					selectedSegment === 'participate' &&
					<div>
						<RegisteredEvents></RegisteredEvents>
					</div>
				}
			</IonContent>
		</IonPage>
	);
}

export default SubscriptionsPage;