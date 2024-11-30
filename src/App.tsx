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
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

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
import {
  home,
  list,
  logOutOutline,
  menuOutline,
  personCircleOutline,
  settings,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import ToDoLists from "./pages/ToDoLists";
import UserModal from "./components/UserModal/UserModal";

setupIonicReact();

const App: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchLoggedInState = (): boolean => {
    const state: boolean = JSON.parse(
      localStorage.getItem("loggedin") || "false"
    );
    return state;
  };

  const setLoggedInState = (newState: boolean) => {
    localStorage.setItem("loggedin", JSON.stringify(newState));
    setIsLoggedIn(newState);
  };

  useEffect(() => {
    const currentState: boolean = fetchLoggedInState();
    setIsLoggedIn(currentState);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet id="main" className="router-outlet">
            <Switch>
              <Route
                exact
                path="/login"
                render={() => <Login setIsLoggedIn={setLoggedInState} />}
              />
              <Route
                exact
                path="/signup"
                render={() => <SignUp setIsLoggedIn={setLoggedInState} />}
              />
              {loggedIn ? (
                <>
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/todolists" component={ToDoLists} />
                  <Route exact path="/tasks/:listId" component={TaskList} />
                </>
              ) : (
                <Redirect to="/login" />
              )}
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </IonRouterOutlet>
          {loggedIn && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} /> <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tasks" href="/Todolists">
                <IonIcon icon={list} /> <IonLabel>Lists</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="settings"
                onClick={() => setIsUserMenuOpen(true)}
              >
                <IonIcon icon={personCircleOutline} /> <IonLabel>User</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
        <UserModal
          isOpen={isUserMenuOpen}
          onClose={() => setIsUserMenuOpen(false)}
          onLogout={() => setLoggedInState(false)}
        />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
