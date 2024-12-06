import { Redirect, Route, Switch } from "react-router-dom";
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
  IonLoading,
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
import { Task } from "./hooks/useTaskListService";
import { Todolist } from "./hooks/useToDoListService";

setupIonicReact();

const App: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Used for storing Tasks for the open/selected todolist
  const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);

  // Used for storing all todolists that the user has access to
  const [activeTodoLists, setActiveTodoLists] = useState<Todolist[]>([]);

  const fetchLoggedInState = (): boolean => {
    const state: boolean = JSON.parse(
      localStorage.getItem("loggedin") || "false"
    );
    return state;
  };

  const setLoggedInState = (newState: boolean, email: string = "") => {
    setLoading(true);
    if (email !== "") {
      localStorage.setItem("user", email);
    }
    localStorage.setItem("loggedin", JSON.stringify(newState));
    setIsLoggedIn(newState);
    setLoading(false);
  };

  const fetchEmail = () => {
    const email = localStorage.getItem("user");
    if (email == null) {
      return "";
    }
    return email;
  };

  const updateCurrentTaskList = (list:Task[]) => {
    setActiveTaskList(list);
  }

  const updateLoading = () => {
    try {
      console.log("Fetching logged-in state...");
      const currentState = fetchLoggedInState();
      console.log("Logged-in state fetched:", currentState);

      setIsLoggedIn(currentState);
    } catch (error) {
      console.error("Error fetching logged-in state:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
      console.log("Loading set to false");
    }
  };

  useEffect(() => {
    updateLoading();
  }, []);

  useEffect(()=>{
    console.log("Updated activeTaskList:", activeTaskList);
  },[activeTaskList])

  if (!loading) {
    return (
      <>
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

              {isLoggedIn ? (
                <>
                  <Route exact path="/home" component={Home} />
                  <Route
                    exact
                    path="/todolists"
                    render={() => (
                      <ToDoLists
                        currentTodoList={activeTodoLists}
                        setCurrentTodoList={setActiveTodoLists}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/tasks/:listId"
                    render={() => (
                      <TaskList
                        currentTaskList={activeTaskList}
                        updateCurrentTaskList={updateCurrentTaskList}
                      />
                    )}
                  />
                </>
              ) : (
                <Redirect to="/login" />
              )}
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </IonRouterOutlet>
          {isLoggedIn && (
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
        <IonLoading isOpen={loading} message="Loading..." />
        <UserModal
          isOpen={isUserMenuOpen}
          onClose={() => setIsUserMenuOpen(false)}
          onLogout={() => setLoggedInState(false)}
          email={fetchEmail()}
        />
      </>
    );
  }
};

export default App;
