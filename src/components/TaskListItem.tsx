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
import useService,{ Task } from "../hooks/useTaskListService";
import { trashOutline } from "ionicons/icons";

interface ListItem {
  Task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskListItem: React.FC<ListItem> = ({ Task, setTasks }) => {

  const {deleteTasks} = useService();

  const deleteItem = (id:string) => {
    const newTaskList = deleteTasks(id);
    setTasks(newTaskList)
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
        <IonButton color="danger" className="ms-a button-size" onClick={()=>{deleteItem(Task.id)}}>
          <IonIcon icon={trashOutline}></IonIcon>
        </IonButton>
      </IonCard>
  );
};

export default TaskListItem;
