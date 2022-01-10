import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppSelector } from "hooks";
import { ClimateDashboard, MobileClimateDashboard } from "components/organisms";

export const ClimatePage: FC = () => {
  const device = useOutletContext<"desktop" | "mobile">();
  const climate = useAppSelector((state) => state.climate);

  return device === "desktop" ? <ClimateDashboard climate={climate} /> : <MobileClimateDashboard climate={climate} />;
};
