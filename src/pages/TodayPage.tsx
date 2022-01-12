import { FC } from "react";
import { useAppSelector } from "hooks";
import { TodayDashboard, MobileTodayDashboard } from "components/organisms";
import { DashboardTemplate, MobileDashboardTemplate } from "components/templates";

interface ITodayPageProps {
  device: "desktop" | "mobile";
}

export const TodayPage: FC<ITodayPageProps> = ({ device }) => {
  const { weather, forecasts } = useAppSelector((state) => state.today);

  if (device === "desktop") {
    return (
      <DashboardTemplate>
        <TodayDashboard weather={weather} forecasts={forecasts} />
      </DashboardTemplate>
    );
  }

  return (
    <MobileDashboardTemplate>
      <MobileTodayDashboard weather={weather} forecasts={forecasts} />
    </MobileDashboardTemplate>
  );
};
