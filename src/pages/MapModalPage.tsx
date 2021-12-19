import { FC } from "react";
import { useHistory } from "react-router-dom";
import { ModalLayout } from "components/templates";
import { MapModal } from "components/organisms";

export const MapModalPage: FC = () => {
  const history = useHistory();

  const onCloseModal = () => {
    history.goBack();
  };

  return (
    <ModalLayout close={onCloseModal}>
      <MapModal close={onCloseModal} />
    </ModalLayout>
  );
};
