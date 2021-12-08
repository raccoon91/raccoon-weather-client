import { FC } from "react";
import { Box, Card, Title2, Title3 } from "components/atoms";
import { WindCard, TempCard, PercentCard, AirCard } from "components/molecules";

interface ITodayDashboardProps {
  feel: string;
  humid: string;
  rain: string;
  air1: string;
  air2: string;
  wind: string;
}

export const TodayDashboard: FC<ITodayDashboardProps> = ({ feel, humid, rain, air1, air2, wind }) => {
  return (
    <Box o="hidden auto" f="1" h="100%" p="40px 60px" bgc="skyBlue" btlr="30px">
      <Title2 size="lg">Today</Title2>

      <Box fd="row" j="space-between" m="30px 0 0">
        <TempCard title="체감온도" value={feel} />
        <PercentCard title="강수확률" value={humid} />
        <PercentCard title="습도" value={rain} />
      </Box>

      <Box fd="row" j="space-between" m="20px 0 0">
        <AirCard type="pm10" title="미세먼지(PM10)" value={air1} />
        <AirCard type="pm25" title="미세먼지(PM25)" value={air2} />
        <WindCard title="바람" value={wind} />
      </Box>

      <Box m="30px 0 0">
        <Card w="100%" h="320px" p="30px">
          <Title3 size="sm">오늘의 날씨</Title3>
        </Card>
      </Box>
    </Box>
  );
};
