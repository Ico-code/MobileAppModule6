import TaskListItem from "../components/TaskListItem/TaskListItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useService, { Task } from "../hooks/useTaskListService";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { add, list } from "ionicons/icons";
import AddTaskModal from "../components/AddTask/AddTask";

interface RouteParams {
  listId: string;
}

const TaskList: React.FC = () => {
  const { listId } = useParams<RouteParams>();

  const TaskListService = useService();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  useIonViewWillEnter(() => {
    const lists = TaskListService.getTasks(listId);
    console.log(lists, lists.length);
    if (lists.length <= 0) {
      TaskListService.addTasks(TaskListService.defaultTasks());
      setTasks(TaskListService.defaultTasks);
      return;
    }
    setTasks(lists);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.map((Task) => (
            <TaskListItem
              key={Task.id}
              Task={Task}
              setTasks={setTasks}
            ></TaskListItem>
          ))}
        </IonList>
      </IonContent>
      <IonFab slot="fixed" horizontal="end" vertical="bottom" className="me-3">
        <IonFabButton
          onClick={() => setTasks(TaskListService.defaultTasks)}
          color="success"
          id="resetButton"
        >
          <span>Default Tasks</span>
        </IonFabButton>
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
        />
      </IonFab>
    </IonPage>
  );
};

export default TaskList;
