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
import EditTaskModal from "../components/EditTask/EditTask";

interface RouteParams {
  listId: string;
}

const TaskList: React.FC<{
  currentTaskList: Task[];
  updateCurrentTaskList: (TaskList:Task[]) => void;
}> = ({currentTaskList, updateCurrentTaskList}) => {
  const { listId } = useParams<RouteParams>(); 
  const parentId = listId;
  const history = useHistory();

  const TaskListService = useService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [parentName, setParentName] = useState<string>("");

  const handleSaveTask = (task: Task) => {
    setTasks([...tasks, task]);
    updateCurrentTaskList([...currentTaskList, task]);
  };

  useIonViewWillEnter(() => {
    const lists = TaskListService.getTasks(listId);
    setTasks(lists);
    const test = TaskListService.getTasks(parentId);
    updateCurrentTaskList(test)
    fetchParentName(parentId);
  });

  const handleGoBack = () => {
    history.push(`/Todolists`);
  };

  const fetchParentName = (parentId:string) => {
    setParentName("UnderProgress");
  }

  // const resetTasksList = () => {
  //   TaskListService.addTasks(TaskListService.defaultTasks());
  //   setTasks(TaskListService.defaultTasks);
  //   return;
  // };

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
            {tasks.length > 0 ? (
              tasks.map((Task) => (
                <TaskListItem
                  key={Task.id}
                  Task={Task}
                  setTasks={updateCurrentTaskList}
                  openEditTask={() => {setIsEditModalOpen(true)}}
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
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveTask}
            parentId={parentId}
          />
        </IonFab>
      </IonPage>
    );
  };
  

export default TaskList;
