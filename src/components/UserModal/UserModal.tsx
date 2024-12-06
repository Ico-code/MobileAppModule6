import "./UserModal.css";
import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import { closeOutline, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: (state:boolean) => void;
  email:string
}
const UserModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onLogout, email }) => {
  const history = useHistory();

  const logout = () => {
    onLogout(false);
    onClose();
    history.replace("/home");
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="modal">
      <IonHeader>
        <IonToolbar>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IonTitle>User</IonTitle>
            <IonButton
              className="ion-float-right ion-padding-end"
              color="primary"
              onClick={onClose}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <p>Email: {email}</p>
          </IonCardHeader>
          <IonCardContent>
            <IonButton
              onClick={logout}
              className="logOut width-100"
              color="danger"
            >
              <span>Log Out</span>
              <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};
export default UserModal;
