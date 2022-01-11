import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapModal } from "components/organisms";
import { MobileModalTemplate } from "components/templates";

interface IMobileMapPageProps {
  device: "desktop" | "mobile";
}

export const MobileMapPage: FC<IMobileMapPageProps> = ({ device }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (device === "desktop") {
      navigate("/today");
    }
  }, [device]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <MobileModalTemplate close={handleCloseModal}>
      <MapModal />
    </MobileModalTemplate>
  );
};
