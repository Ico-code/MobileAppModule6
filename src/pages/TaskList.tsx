import TaskListItem from "../components/TaskListItem/TaskListItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useService, { Task } from "../hooks/useTaskListService";
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { add, arrowBackOutline, list } from "ionicons/icons";
import AddTaskModal from "../components/AddTask/AddTask";
import { useHistory } from "react-router-dom";

interface RouteParams {
  listId: string;
}

const TaskList: React.FC = () => {
  const { listId } = useParams<RouteParams>();
  const history = useHistory();

  const TaskListService = useService();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  useIonViewWillEnter(() => {
    const lists = TaskListService.getTasks(listId);
    setTasks(lists);
  });

  const handleGoBack = () => {
    history.push(`/Todolists`);
  };

  const resetTasksList = () => {
    TaskListService.addTasks(TaskListService.defaultTasks());
    setTasks(TaskListService.defaultTasks);
    return;
  };

  return (
    <IonPage id="main">
      <IonHeader>
        <div
          id="taskHeader"
          className="ion-padding ion-text-center ion-justify-content-center"
        >
          <IonButton onClick={() => handleGoBack()}>
            <IonIcon icon={arrowBackOutline}></IonIcon>
          </IonButton>
          <IonTitle>Tasks</IonTitle>
        </div>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.length > 0 ? (
            tasks.map((Task) => (
              <TaskListItem
                key={Task.id}
                Task={Task}
                setTasks={setTasks}
              ></TaskListItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No tasks found</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
      <IonFab slot="fixed" horizontal="end" vertical="bottom" className="me-3">
        {/* <IonFabButton
          onClick={() => resetTasksList()}
          color="success"
          id="resetButton"
        >
          <span>Reset</span>
        </IonFabButton> */}
        <IonFabButton
          onClick={() => setIsModalOpen(true)}
          color="success"
          id="addButton"
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          parentId={listId}
        />
      </IonFab>
    </IonPage>
  );
};

export default TaskList;
