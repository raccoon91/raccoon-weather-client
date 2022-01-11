import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import {
  CurrentWeather,
  MobileCurrentWeather,
  TodayDashboard,
  MobileTodayDashboard,
  MapModal,
} from "components/organisms";
import { WeatherTemplate, MobileWeatherTemplate, ModalTemplate } from "components/templates";

interface ITodayPageProps {
  device: "desktop" | "mobile";
}

export const TodayPage: FC<ITodayPageProps> = ({ device }) => {
  const navigate = useNavigate();
  const [isOpenMapModal, setIsOpenMapModal] = useState(false);
  const { weather, forecasts } = useAppSelector((state) => state.today);

  useEffect(() => {
    if (device === "mobile" && isOpenMapModal) {
      navigate("/map");
    }
  }, [device, isOpenMapModal]);

  const handleOpenMapModal = () => {
    setIsOpenMapModal(true);
  };

  const handleCloseMapModal = () => {
    setIsOpenMapModal(false);
  };

  if (device === "desktop") {
    return (
      <>
        <ModalTemplate isOpen={isOpenMapModal} close={handleCloseMapModal}>
          <MapModal />
        </ModalTemplate>

        <WeatherTemplate
          current={<CurrentWeather weather={weather} showMapModalButton openMapModal={handleOpenMapModal} />}
          dashboard={<TodayDashboard weather={weather} forecasts={forecasts} />}
        />
      </>
    );
  }

  return (
    <MobileWeatherTemplate
      current={<MobileCurrentWeather weather={weather} />}
      dashboard={<MobileTodayDashboard weather={weather} forecasts={forecasts} />}
    />
  );
};
