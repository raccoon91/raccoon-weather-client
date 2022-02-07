import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import { MyDashboard } from "components/organisms";
import { DashboardTemplate } from "components/templates";

export const MyPage: FC = () => {
  const navigate = useNavigate();
  const { weather, forecasts } = useAppSelector((state) => state.today);

  useEffect(() => {
    const myDashboard = localStorage.getItem("myDashboard");

    if (!myDashboard) {
      navigate("/today");
    }
  }, [navigate]);

  return (
    <DashboardTemplate>
      <MyDashboard weather={weather} forecasts={forecasts} />
    </DashboardTemplate>
  );
};
