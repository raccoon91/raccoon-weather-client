import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "components/atoms";
import { MapModal } from "components/organisms";
import { DashboardTemplate } from "components/templates";

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

  return (
    <DashboardTemplate>
      <Box w="100%" h="100%" p="3rem 4rem" bgc="skyBlue">
        <MapModal />
      </Box>
    </DashboardTemplate>
  );
};
