import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import { getTodayWeather } from "stores/slices/todaySlice";
import { CurrentWeather, TodayDashboard } from "components/organisms";
import { WeatherLayout } from "components/templates";

export const TodayPage: FC = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.current);
  const today = useAppSelector((state) => state.today);

  useEffect(() => {
    dispatch(getTodayWeather());
  }, []);

  return <WeatherLayout current={<CurrentWeather {...current} />} dashboard={<TodayDashboard {...today} />} />;
};
