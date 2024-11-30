import useToDoService, { Todolist } from "../hooks/useToDoListService";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const ToDoList: React.FC = () => {
  const ToDoListService = useToDoService();
  const [toDoLists, setToDoLists] = useState<Todolist[]>([]);
  const history = useHistory();

  useEffect(() => {
    const lists = ToDoListService.getToDoLists();
    if (lists.length <= 0) {
      ToDoListService.addToDoLists(ToDoListService.defaultToDolists());
      setToDoLists(ToDoListService.defaultToDolists);
      return;
    }
    setToDoLists(ToDoListService.getToDoLists());
  }, []);

  const handleOpenToDoList = (listId: string) => {
    history.push(`/tasks/${listId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To-Do Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonButton expand="full" routerLink="/add-todolist" color="success" className="ion-padding-horizontal" mode="md">
        Add New To-Do List
      </IonButton>
      <IonContent className="ion-padding-horizontal">
        <IonList>
          {toDoLists.map((toDoList) => (
            <IonItem
            key={toDoList.id}
            button
            onClick={() => handleOpenToDoList(toDoList.id)}
          >
            <IonLabel>
              <h2>{toDoList.title}</h2>
              <p>{toDoList.description}</p>
            </IonLabel>
          </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ToDoList;
