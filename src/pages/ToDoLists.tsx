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
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import AddTodolistModal from "../components/AddToDoList/AddToDoList";
import { create, trash } from "ionicons/icons";
import EditTodolistModal from "../components/EditToDoList/EditToDoList";

const ToDoList: React.FC<{
  currentTodoList: Todolist[];
  setCurrentTodoList: (todolist:Todolist[]) => void;
}> = ({currentTodoList, setCurrentTodoList}) => {
  const ToDoListService = useToDoService();
  const [toDoLists, setToDoLists] = useState<Todolist[]>([]);

  const history = useHistory();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const lists = ToDoListService.getToDoLists();
    if (lists.length <= 0) {
      ToDoListService.addToDoLists(ToDoListService.defaultToDolists());
      setToDoLists(ToDoListService.defaultToDolists);
      return;
    }
    setToDoLists(ToDoListService.getToDoLists());
  }, []);

  const handleSaveTodolists = (todolist: Todolist) => {
    setToDoLists([...toDoLists, todolist]);
  };

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
      <IonButton
        expand="full"
        onClick={() => setIsAddModalOpen(true)}
        color="success"
        className="ion-padding-horizontal ion-margin-vertical"
        mode="ios"
      >
        Add New To-Do List
      </IonButton>
      <IonContent className="ion-padding-horizontal ion-margin-vertical">
        <IonList>
          {toDoLists.map((toDoList) => (
            <IonItem key={toDoList.id}>
              <IonLabel onClick={() => handleOpenToDoList(toDoList.id)}>
                <h2>{toDoList.title}</h2> <p>{toDoList.description}</p>
              </IonLabel>
              <IonButtons slot="end">
                <IonButton
                  color="primary"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <IonIcon slot="icon-only" icon={create} />
                </IonButton>
                <IonButton
                  color="danger"
                  onClick={() => ToDoListService.deleteToDoList(toDoList.id)}
                >
                  <IonIcon slot="icon-only" icon={trash} />
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <AddTodolistModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTodolists}
      />
      <EditTodolistModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTodolists}
      />
    </IonPage>
  );
};

export default ToDoList;
