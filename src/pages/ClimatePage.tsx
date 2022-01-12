import { FC } from "react";
import { useAppSelector } from "hooks";
import { ClimateDashboard, MobileClimateDashboard } from "components/organisms";
import { DashboardTemplate, MobileDashboardTemplate } from "components/templates";

interface IClimatePageProps {
  device: "desktop" | "mobile";
}

export const ClimatePage: FC<IClimatePageProps> = ({ device }) => {
  const climate = useAppSelector((state) => state.climate);

  if (device === "desktop") {
    return (
      <DashboardTemplate>
        <ClimateDashboard climate={climate} />
      </DashboardTemplate>
    );
  }

  return (
    <MobileDashboardTemplate>
      <MobileClimateDashboard climate={climate} />
    </MobileDashboardTemplate>
  );
};
