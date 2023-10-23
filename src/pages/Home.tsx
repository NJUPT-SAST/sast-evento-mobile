import { IonContent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import EventCard from '../components/EventCard';
import { useEffect, useState } from 'react';
import { getAllConductingEvent, getEventList } from '../apis/user';
import { Event } from '../context';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { paperPlaneOutline, archiveOutline } from 'ionicons/icons';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './Home.scss';

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [conductingEvent, setConductingEvent] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(5);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    getAllConductingEvent().then((res) => {
      console.log(res);
      setConductingEvent(res);
      const event1 = {
        "id": 9,
        "title": "test2",
        "description": "软研联合授课",
        "gmtEventStart": "2023-10-01 14:30:31",
        "gmtEventEnd": "2023-10-03 10:31:31",
        "gmtRegistrationStart": "2023-10-01 10:31:58",
        "gmtRegistrationEnd": "2023-10-01 12:31:58",
        "eventType": {
          "id": 1,
          "typeName": "default",
          "allowConflict": true
        },
        "location": "仙林校区大学生活动中心汇客厅",
        "locationId": 5,
        "tag": "test",
        "state": "NOT_STARTED",
        "departments": [
          {
            "id": 3,
            "departmentName": "C++组"
          },
          {
            "id": 4,
            "departmentName": "前端组"
          },
          {
            "id": 5,
            "departmentName": "后端组"
          }
        ]
      };
      setConductingEvent([event1, ...res]);
    });
    getItems();
  }, []);

  const getItems = () => {
    console.log(total);
    console.log(page);

    if (total / 5 < page) {
      setIsEnded(true);
      return;
    }

    getEventList(page, 10).then((response) => {
      const newEvents: Event[] = response.result;
      console.log(newEvents);
      setEvents([...events, ...newEvents])
      setTotal(response.total);
      setPage(page + 1);
    })
  };
  // TODO: change layout styles to falls
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <IonItem>
            <IonLabel className='eventsTitleWarpper'>
              <IonIcon icon={paperPlaneOutline}></IonIcon>
              进行中的活动
            </IonLabel>
          </IonItem>
          <Swiper modules={[EffectCards]} effect="cards" className='conductingEventCardWarpper'>
            {conductingEvent.map((item, index) => (
              <SwiperSlide key={item.id} className='slideWarpper'>
                <EventCard event={item} ></EventCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <IonItem>
            <IonLabel className='eventsTitleWarpper'>
              <IonIcon icon={archiveOutline}></IonIcon>
              所有活动
            </IonLabel>
          </IonItem>
          <IonList class='eventContainer'>
            {events.map((item, index) => (
              <IonItem key={item.id}>
                <EventCard event={item} ></EventCard>
              </IonItem>
            ))}
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              getItems();
              setTimeout(() => ev.target.complete(), 2000);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
          <IonToast
            isOpen={isEnded}
            onDidDismiss={() => setIsEnded(false)}
            message="到底了  qaq"
            duration={2000}
            color="medium"
          />
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Home;
