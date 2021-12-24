import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useLayout } from "hooks";
import { ModalLayout, MobileModalLayout } from "components/templates";
import { MapModal } from "components/organisms";

export const MapModalPage: FC = () => {
  const history = useHistory();
  const device = useLayout();

  const onCloseModal = () => {
    history.goBack();
  };

  return device === "desktop" ? (
    <ModalLayout close={onCloseModal}>
      <MapModal />
    </ModalLayout>
  ) : (
    <MobileModalLayout close={onCloseModal}>
      <MapModal />
    </MobileModalLayout>
  );
};
