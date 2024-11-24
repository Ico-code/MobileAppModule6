import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from './pages/SignUp';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import TaskList from "./pages/TaskList";
import { logOutOutline, menuOutline } from "ionicons/icons";
import { useEffect } from "react";

setupIonicReact();

const App: React.FC = () => {
  const history = useHistory();

  const logout = () => {
      history.push("/login"); 
  };
  
  return (
    <IonApp>
      <IonReactRouter>
        {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonMenuToggle className="me-a button-size menu-icon">
                <IonIcon icon={menuOutline}></IonIcon>
              </IonMenuToggle>
              <IonButton className="logOut" onClick={logout} routerLink="/login">
                <IonIcon icon={logOutOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/home">
                  <IonLabel>Home</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/tasklist">
                  <IonLabel>Task List</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        </>
      )}
        <IonRouterOutlet id="main">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/tasklist" component={TaskList} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;