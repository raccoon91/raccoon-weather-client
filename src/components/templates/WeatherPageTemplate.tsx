import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks";
import { Grid, Box } from "components/atoms";
import { Navigation, MobileNavigation } from "components/molecules";
import { CurrentWeather, MapModal } from "components/organisms";
import { ModalTemplate } from "components/templates";

const DashboardWrapper = styled(Box)`
  border-top-left-radius: 3rem;
`;

const WeatherPageTemplateContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    grid-template-columns: 26rem calc(100vw - 26rem);
    grid-template-rows: 100vh;
    grid-template-areas: "current dashboard";
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 100vw;
    grid-template-rows: 16rem calc(100vh - 16rem);
    grid-template-areas: "current" "dashboard";
  }
`;

interface IWeatherPageTemplateProps {
  device: "desktop" | "mobile";
}

export const WeatherPageTemplate: FC<IWeatherPageTemplateProps> = ({ device }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenMapModal, setIsOpenMapModal] = useState(false);
  const { weather } = useAppSelector((state) => state.today);

  useEffect(() => {
    if (device === "mobile" && location.pathname === "/today" && isOpenMapModal) {
      navigate("/map");
      setIsOpenMapModal(false);
    }
  }, [device, location, isOpenMapModal]);

  const handleOpenMapModal = () => {
    if (location.pathname === "/today") {
      setIsOpenMapModal(true);
    }
  };

  const handleCloseMapModal = () => {
    if (location.pathname === "/today") {
      setIsOpenMapModal(false);
    }
  };

  return (
    <>
      {device === "desktop" ? (
        <ModalTemplate isOpen={isOpenMapModal} close={handleCloseMapModal}>
          <MapModal />
        </ModalTemplate>
      ) : null}

      <WeatherPageTemplateContainer o="hidden" maxw="1920px" m="0 auto" bgc="blue">
        <Box ga="current">
          <CurrentWeather
            weather={weather}
            showMapModalButton={device === "desktop" && location.pathname === "/today"}
            openMapModal={handleOpenMapModal}
          />
        </Box>

        <DashboardWrapper ga="dashboard" p="4rem 0 0" bgc="skyBlue">
          {device === "desktop" ? (
            <Box h="2rem" m="0 10rem 2rem">
              <Navigation />
            </Box>
          ) : null}

          <Outlet />

          {device === "mobile" ? (
            <Box h="7rem">
              <MobileNavigation />
            </Box>
          ) : null}
        </DashboardWrapper>
      </WeatherPageTemplateContainer>
    </>
  );
};
