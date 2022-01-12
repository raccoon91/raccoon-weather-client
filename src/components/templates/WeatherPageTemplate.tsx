import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks";
import { Box, Flex } from "components/atoms";
import { Navigation, MobileNavigation } from "components/molecules";
import { CurrentWeather, MobileCurrentWeather, MapModal } from "components/organisms";
import { ModalTemplate } from "components/templates";

const DashboardWrapper = styled(Box)`
  border-top-left-radius: 3rem;
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

  if (device === "desktop") {
    return (
      <>
        <ModalTemplate isOpen={isOpenMapModal} close={handleCloseMapModal}>
          <MapModal />
        </ModalTemplate>

        <Box w="100vw" h="100vh" bgc="background">
          <Flex o="hidden" w="100%" maxw="1920px" h="100%" m="0 auto" bgc="blue">
            <Box w="26rem" p="9rem 3rem 3rem">
              <CurrentWeather
                weather={weather}
                showMapModalButton={location.pathname === "/today"}
                openMapModal={handleOpenMapModal}
              />
            </Box>

            <DashboardWrapper w="calc(100% - 26rem)" p="4rem 0 0" bgc="skyBlue">
              <Box h="2rem" m="0 10rem 2rem">
                <Navigation />
              </Box>

              <Outlet />
            </DashboardWrapper>
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <Box o="hidden" w="100vw" h="100vh" bgc="blue">
      <Box h="16rem" p="3rem 1rem 3rem 4rem">
        <MobileCurrentWeather weather={weather} />
      </Box>

      <DashboardWrapper h="calc(100% - 16rem)" p="4rem 0 0" bgc="skyBlue">
        <Outlet />

        <Box h="7rem">
          <MobileNavigation />
        </Box>
      </DashboardWrapper>
    </Box>
  );
};
