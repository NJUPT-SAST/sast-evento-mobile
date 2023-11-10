import { IonItem, IonLabel, IonIcon, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonToast, IonNote } from "@ionic/react";
import { archiveOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import { Event } from "../context";
import { getEventList } from "../apis/user";

import './AllEvents.scss'
import EventCardList from "./EventCardList";
import EventCard from "./EventCard";

const AllEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(10);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    const size = 10;

    if (total / size < page) {
      setIsEnded(true);
      return;
    }

    getEventList(page, size).then((response) => {
      const newEvents: Event[] = response.result;
      if (events === null) {
        setEvents(newEvents);
      } else {
        setEvents([...events, ...newEvents])
      }
      setTotal(response.total);
      setPage(page + 1);
    })
  };

  if (events?.length === 0) {
    const date = new Date();
    console.log(date.getMonth);

    const timeFormat = (num: number) => {
      return (num < 8) ? "0" + (num + 1) : num + 1
    }

    const gmtEventStart = String('xxxx' + "-" + timeFormat(date.getMonth()) + "-" + timeFormat(date.getDay()));
    const hiddenEvent: Event = {
      'id': 0,
      'title': '隐藏任务',
      'description': '这是一个隐藏活动，凭截图催懒惰的管理员添加新的活动！',
      'gmtEventStart': gmtEventStart,
      'gmtEventEnd': '',
      'location': 'QQ群',
      'departments': [{
        'id': 1,
        'departmentName': 'SAST',
      }],
      'gmtRegistrationEnd': 'UNLIMITED',
      'gmtRegistrationStart': 'UNLIMITED',
      'tag': 'HIDDEN',
      'state': 'IN_PROGRESS',
      'eventType': {
        'id': 0,
        'typeName': 'HIDDEN',
        'allowConflict': true
      }
    }
    return (
      <div>
        <IonItem lines="full">
          <IonLabel className='eventsTitleWarpper'>
            <IonIcon icon={archiveOutline}></IonIcon>
            所有活动
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <EventCard event={hiddenEvent} />
        </IonItem>
      </div>
    )
  }

  const fakeInfiniteScroll = () => {
    if (!isEnded) {
      return (
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            if (!isEnded) {
              getItems();
              setTimeout(() => ev.target.complete(), 2000);
            } else {
              ev.target.complete();
            }
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      )
    } else {
      return (
        <div style={{ textAlign: "center", margin: "15px" }}>
          <IonNote>没有更多的活动了</IonNote>
        </div>
      )
    }
  }

  return (
    <div>
      <IonItem lines="full">
        <IonLabel className='eventsTitleWarpper'>
          <IonIcon icon={archiveOutline}></IonIcon>
          所有活动
        </IonLabel>
      </IonItem>
      <EventCardList events={events} lines="none"></EventCardList>
      {fakeInfiniteScroll()}
    </div>
  )
}

export default AllEvent;