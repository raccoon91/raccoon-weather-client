import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLayout } from "hooks";
import { ModalLayout, MobileModalLayout } from "components/templates";
import { MapModal } from "components/organisms";

export const MapModalPage: FC = () => {
  const navigate = useNavigate();
  const device = useLayout();

  const onCloseModal = () => {
    navigate(-1);
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
