import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { ConfigType } from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const formatDate = (date?: ConfigType, formatType = "MM-DD HH:mm") => {
  return dayjs(date).format(formatType);
};

export const getHour = (date?: ConfigType) => {
  return dayjs(date).hour();
};
