import { FC } from "react";
import { useAppSelector } from "hooks";
import { ClimateDashboard } from "components/organisms";
import { DashboardTemplate } from "components/templates";

export const ClimatePage: FC = () => {
  const climate = useAppSelector((state) => state.climate);

  return (
    <DashboardTemplate>
      <ClimateDashboard climate={climate} />
    </DashboardTemplate>
  );
};
