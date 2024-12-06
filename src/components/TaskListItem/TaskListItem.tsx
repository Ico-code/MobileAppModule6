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
import useService, { Task, TaskState } from "../../hooks/useTaskListService";
import { checkmarkCircleOutline, create, trashOutline } from "ionicons/icons";
import "./TaskListItem.css";
import { useEffect, useState } from "react";

interface ListItem {
  Task: Task;
  openEditTask: () => void;
}

const TaskListItem: React.FC<ListItem> = ({ Task, openEditTask }) => {
  const { deleteTasks } = useService();
  const TaskListService = useService();
  const [isCompleted, setIsCompleted] = useState<TaskState>(Task.state);

  const formNewTask = (newState: TaskState) => {
    return {
      id: Task.id,
      parentListId: Task.parentListId,
      title:Task.title,
      subtitle:Task.subtitle,
      description:Task.description,
      state: newState,
    };
  }

  const handleCompletionToggle = () => {
    if(isCompleted === TaskState.completed){
      setIsCompleted(TaskState.incomplete);
      TaskListService.editTaskList(formNewTask(TaskState.incomplete));
      return;
    }
    setIsCompleted(TaskState.completed);
    TaskListService.editTaskList(formNewTask(TaskState.completed));
  };

  useEffect(()=> {
    if(Task.state === "Completed"){
      setIsCompleted(TaskState.completed);
      return;
    }
    setIsCompleted(TaskState.incomplete);
    
  },[])


  return (
    <IonCard
      id={Task.id}
      className={`flexContainer ${isCompleted === TaskState.completed ? "completed" : ""}`}
    >
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
            deleteTasks(Task.id);
          }}
        >
          <IonIcon icon={trashOutline}></IonIcon>
        </IonButton>
        <IonButton
          color={isCompleted ? "success" : "medium"}
          className="button-size"
          onClick={handleCompletionToggle}
        >
          <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
        </IonButton>
      </div>
    </IonCard>
  );
};

export default TaskListItem;
