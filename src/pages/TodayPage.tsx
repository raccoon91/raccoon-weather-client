import { FC } from "react";
import { useAppSelector } from "hooks";
import { TodayDashboard } from "components/organisms";
import { DashboardTemplate } from "components/templates";

export const TodayPage: FC = () => {
  const { weather, forecasts } = useAppSelector((state) => state.today);

  return (
    <DashboardTemplate>
      <TodayDashboard weather={weather} forecasts={forecasts} />
    </DashboardTemplate>
  );
};
