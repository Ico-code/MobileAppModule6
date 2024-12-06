import React, { useState } from "react";
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
import useToDoService, { Todolist } from "../../hooks/useToDoListService";

const EditTodolistModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (Todolist: Todolist) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const TodoService = useToDoService();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState(""); // Error message for title

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
      return; // Stop execution if validation fails
    }

    const newTask: Todolist = {
      id: uuidv4(), // Generate a unique ID
      title,
      description,
    };

    TodoService.addToDoLists([newTask]);

    onSave(newTask);

    // Reset the form
    setTitle("");
    setDescription("");

    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Todolist</IonTitle>
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
          <IonText color="danger" className="ion-margin-top">
            <p>{titleError}</p>
          </IonText>
        )}
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

export default EditTodolistModal;
