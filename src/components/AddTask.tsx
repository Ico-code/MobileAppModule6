import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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
} from "@ionic/react";
import { Task, TaskState, useService } from "../hooks/useTaskListService";

const AddTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}> = ({ isOpen, onClose, onSave }) => {

  const TaskService = useService();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const newTask: Task = {
      id: uuidv4(), // Generate a unique ID
      title,
      subtitle,
      description,
      state: TaskState.incomplete,
    };

    TaskService.addTasks(newTask);

    // Call the onSave prop function to pass the new task to the parent component
    onSave(newTask);

    // Reset the form fields
    setTitle("");
    setSubtitle("");
    setDescription("");

    // Close the modal
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Task</IonTitle>
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
        <IonButton expand="full" onClick={handleSave}>
          Save
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddTaskModal;
