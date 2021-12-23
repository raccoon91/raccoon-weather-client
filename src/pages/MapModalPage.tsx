import { FC, useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { ModalLayout, MobileModalLayout } from "components/templates";
import { MapModal } from "components/organisms";

export const MapModalPage: FC = () => {
  const history = useHistory();
  const [device, setDevice] = useState<string | null>("desktop");

  useLayoutEffect(() => {
    const resize = () => {
      if (window.innerWidth > 1024) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

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
