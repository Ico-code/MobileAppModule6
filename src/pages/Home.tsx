import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const history = useHistory();

  const goToTasks = () => {
    history.push("/tasklist");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-justify-content-center ion-text-center ion-align-items-center center-content">
        <p>Welcome to the main page!</p>
        <IonButton onClick={goToTasks}>Go to Task List!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
