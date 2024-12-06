import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Home: React.FC<{
  loggedIn: boolean;
}> = ({ loggedIn }) => {
  const history = useHistory();

  const GotoTodolists = () => {
    history.push("/todolists");
  };

  const GotoLogin = () => {
    history.push("/login");
  };

  const GotoSignup = () => {
    history.push("/signup");
  };

  useEffect(() => {

  }, [loggedIn]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-justify-content-center ion-text-center ion-align-items-center center-content">
        <p>Welcome to the main page!</p>
        <p>Log in or sign up if you haven't already</p>
        <IonButtons id="homeButtonContainer">
          <div style={{ marginBottom: "20px" }}>
            <IonButton
              color="primary"
              style={{ marginRight: "10px", padding: "10px" }}
              fill="solid"
              onClick={GotoLogin}
            >
              Log in
            </IonButton>
            <IonButton
              color="primary"
              style={{ marginLeft: "10px", padding: "10px" }}
              fill="solid"
              onClick={GotoSignup}
            >
              Sign up
            </IonButton>
          </div>
          {loggedIn && (
            <IonButton color="secondary" fill="solid" onClick={GotoTodolists}>
              Go to Todo-Lists!
            </IonButton>
          )}
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Home;
