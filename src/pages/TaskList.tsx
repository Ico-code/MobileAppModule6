import TaskListItem from "../components/TaskListItem/TaskListItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useService, {
  Task,
  TaskProvider,
  useTaskListContext,
} from "../hooks/useTaskListService";
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
import EditTaskModal from "../components/EditTask/EditTask";

interface RouteParams {
  listId: string;
}

const TaskList: React.FC = () => {
  const { listId } = useParams<RouteParams>();
  const parentId = listId;
  const history = useHistory();

  const TaskListService = useService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { activeTaskList } = useTaskListContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [parentName, setParentName] = useState<string>("");
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");


  const handleSaveTask = (task: Task) => {
    TaskListService.editTaskList(task);
  };

  useIonViewWillEnter(() => {
    TaskListService.getTasks(listId);
    fetchParentName(parentId);
  });

  const handleGoBack = () => {
    history.push(`/Todolists`);
  };

  const fetchParentName = (parentId: string) => {
    setParentName("UnderProgress");
  };

  const openEditor = (taskId:string) => {
    setIsEditModalOpen(true)
    setSelectedTaskId(taskId);
  }

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
            <IonTitle>Tasks for: {parentName}</IonTitle>
          </div>
        </IonHeader>
        <IonContent>
          <IonList>
            {activeTaskList.length > 0 ? (
              activeTaskList.map((Task: Task) => (
                <TaskListItem
                  key={Task.id}
                  Task={Task}
                  openEditTask={() => {
                    openEditor(Task.id);
                  }}
                ></TaskListItem>
              ))
            ) : (
              <IonItem>
                <IonLabel>No tasks found</IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
        <IonFab
          slot="fixed"
          horizontal="end"
          vertical="bottom"
          className="me-3"
        >
          <IonFabButton
            onClick={() => setIsAddModalOpen(true)}
            color="success"
            id="addButton"
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <AddTaskModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveTask}
            parentId={parentId}
          />
          <EditTaskModal
            isOpen={isEditModalOpen}
            taskId={selectedTaskId}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveTask}
            parentId={parentId}
          />
        </IonFab>
      </IonPage>
  );
};

export default TaskList;
