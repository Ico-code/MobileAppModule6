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

interface ListItem {
  Task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskListItem: React.FC<ListItem> = ({ Task, setTasks }) => {
  const { deleteTasks, editTaskList, fetchSpecificTask } = useService();

  const deleteItem = (id: string) => {
    const newTaskList = deleteTasks(id);
    setTasks(newTaskList);
  };

  const editItem = (id:string) => {
    const editableTask = fetchSpecificTask(id);

  };

  const saveChanges = (newTaskList:any) => {
    setTasks(newTaskList);
  }

  return (
    <IonCard id={Task.id} className="flexContainer">
      <div>
        <IonCardHeader>
          <IonCardTitle>{Task.title}</IonCardTitle>
          <IonCardSubtitle>{Task.subtitle}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>{Task.description}</IonCardContent>
      </div>
      <div id="taskControls" className="ms-a">
      <IonButton
        color="primary"
        className="button-size"
        onClick={() => editItem(Task.id)}
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
