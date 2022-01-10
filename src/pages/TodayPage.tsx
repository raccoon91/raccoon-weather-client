import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppSelector } from "hooks";
import { TodayDashboard, MobileTodayDashboard } from "components/organisms";

export const TodayPage: FC = () => {
  const device = useOutletContext<"desktop" | "mobile">();
  const { weather, forecasts } = useAppSelector((state) => state.today);

  return device === "desktop" ? (
    <TodayDashboard weather={weather} forecasts={forecasts} />
  ) : (
    <MobileTodayDashboard weather={weather} forecasts={forecasts} />
  );
};
