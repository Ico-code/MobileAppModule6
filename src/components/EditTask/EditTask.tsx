import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { Task, TaskState, useService } from "../../hooks/useTaskListService";

const EditTaskModal: React.FC<{
  isOpen: boolean;
  taskId: string;
  onClose: () => void;
  onSave: (task: Task) => void;
  parentId: string;

}> = ({ isOpen, taskId, onClose, onSave, parentId }) => {
  const TaskService = useService();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required.");
      isValid = false;
    } else {
      setTitleError("");
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newTask: Task = {
      id: taskId,
      parentListId: parentId,
      title,
      subtitle,
      description,
      state: TaskState.incomplete,
    };

    onSave(newTask);

    // Reset the form
    setTitle("");
    setSubtitle("");
    setDescription("");

    onClose();
  };

  useEffect(()=> {
    const Task = TaskService.fetchSpecificTask(taskId);
    if(Task === undefined) {
      return;
    }
    setTitle(Task.title);
    setSubtitle(Task.subtitle);
    setDescription(Task.description);
  },[isOpen])

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Task</IonTitle>
          <IonButton slot="end" onClick={onClose} className="pe-3">
            Close
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>
        {titleError && (
          <IonText color="danger">
            <p className="ion-padding-start">{titleError}</p>
          </IonText>
        )}
        <IonItem>
          <IonLabel position="floating">Subtitle</IonLabel>
          <IonInput
            value={subtitle}
            onIonChange={(e) => setSubtitle(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>
        <IonButton
          className="ion-margin-vertical"
          expand="full"
          onClick={handleSave}
        >
          Save
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default EditTaskModal;
