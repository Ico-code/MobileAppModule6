import TaskListItem from "../components/TaskListItem";
import React, { useEffect, useState } from "react";
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
import { add } from "ionicons/icons";
import AddTaskModal from "../components/AddTask";

const TaskList: React.FC = () => {
  const TaskListService = useService();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  useIonViewWillEnter(() => {
    setTasks(TaskListService.getTasks());
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
            <TaskListItem key={Task.id} Task={Task} setTasks={setTasks}></TaskListItem>
          ))}
        </IonList>
      </IonContent>
      <IonFab slot="fixed" horizontal="end" vertical="bottom" className="me-3">
        <IonFabButton onClick={() => setIsModalOpen(true)} color="success" id="addButton">
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
