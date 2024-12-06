import useToDoService, {
  Todolist,
  useTodolistContext,
} from "../hooks/useToDoListService";
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
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import AddTodolistModal from "../components/AddToDoList/AddToDoList";
import { create, trash } from "ionicons/icons";
import EditTodolistModal from "../components/EditToDoList/EditToDoList";

const ToDoList: React.FC = () => {
  const ToDoListService = useToDoService();
  const { activeTodolist } = useTodolistContext();
  const [selectedId, setselectedId ] = useState<string>("");

  const history = useHistory();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    ToDoListService.getToDoLists();
  }, []);

  const handleSaveTodolists = (todolist: Todolist) => {
      ToDoListService.editToDoList(todolist);
  };

  const handleOpenToDoList = (listId: string) => {
    history.push(`/tasks/${listId}`);
  };

  const testing = () => {
    ToDoListService.addToDoLists(ToDoListService.defaultToDolists());
  };

  const openEditor = (id:string) => {
    setIsEditModalOpen(true); 
    setselectedId(id)
  }

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
          {activeTodolist.length > 0 ? (
            activeTodolist.map((TodoList: Todolist) => (
              <IonItem key={TodoList.id}>
                <IonLabel onClick={() => handleOpenToDoList(TodoList.id)}>
                  <h2>{TodoList.title}</h2> <p>{TodoList.description}</p>
                </IonLabel>
                <IonButtons slot="end">
                  <IonButton
                    color="primary"
                    onClick={() => {openEditor(TodoList.id)}}
                  >
                    <IonIcon slot="icon-only" icon={create} />
                  </IonButton>
                  <IonButton
                    color="danger"
                    onClick={() => ToDoListService.deleteToDoList(TodoList.id)}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonButton>
                </IonButtons>
              </IonItem>
            ))
          ) : (
            <IonText className="ion-padding">No Todolists</IonText>
          )}
        </IonList>
        <button onClick={testing}>Add</button>
      </IonContent>
      <AddTodolistModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTodolists}
      />
      <EditTodolistModal
        isOpen={isEditModalOpen}
        todoId={selectedId}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTodolists}
      />
    </IonPage>
  );
};

export default ToDoList;
