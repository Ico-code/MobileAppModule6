import {
  IonCard,
  IonItem,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonButton,
} from "@ionic/react";
import useService, { Task } from "../../hooks/useTaskListService";
import { create, trashOutline } from "ionicons/icons";
import "./TaskListItem.css";

interface ListItem {
  Task: Task;
  setTasks: (TaskList:Task[]) => void;
  openEditTask: () => void;
}

const TaskListItem: React.FC<ListItem> = ({ Task, setTasks, openEditTask }) => {
  const { deleteTasks, editTaskList, fetchSpecificTask } = useService();

  const deleteItem = (id: string) => {
    const newTaskList = deleteTasks(id);
    setTasks(newTaskList);
  };

  const editItem = (id: string) => {
    const editableTask = fetchSpecificTask(id);
  };

  const saveChanges = (newTaskList: any) => {
    setTasks(newTaskList);
  };

  return (
    <IonCard id={Task.id} className="flexContainer">
      <div>
        <IonCardHeader>
          <IonCardTitle>
            {Task.title || "Couldn't fetch Title"}
          </IonCardTitle>
          <IonCardSubtitle>
            {Task.subtitle || "Subtitle not provided"}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {Task.description || "Description not provided"}
        </IonCardContent>
      </div>
      <div id="taskControls" className="ms-a buttonContainer">
        <IonButton
          color="primary"
          className="button-size"
          onClick={openEditTask}
        >
          <IonIcon slot="icon-only" icon={create} />
        </IonButton>
        <IonButton
          color="danger"
          className="button-size"
          onClick={() => {
            deleteItem(Task.id);
          }}
        >
          <IonIcon icon={trashOutline}></IonIcon>
        </IonButton>
      </div>
    </IonCard>
  );
};

export default TaskListItem;
