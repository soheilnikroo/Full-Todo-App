import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './style/Home.css';

const Home: React.FC = () => {
  return (
    <IonPage className="test">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p style={{ color: '#000' }}>skjskksjk</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
