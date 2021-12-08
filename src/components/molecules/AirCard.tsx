import { FC } from "react";
import { Card, Box, Title3, Text, PercentChart } from "components/atoms";
import { pm10Range, pm25Range, airChartColor } from "configs";

interface IAirCardProps {
  type: "pm10" | "pm25";
  title: string;
  value: string;
}

export const AirCard: FC<IAirCardProps> = ({ type, title, value }) => {
  return (
    <Card w="32%" h="170px" p="30px 40px">
      <Title3 size="sm">{title}</Title3>

      <Box f="1" a="center" m="16px 0 0">
        <Text size="4xl" weight="bold">
          {value}㎍/㎥
        </Text>

        <Box w="100%" m="auto 0 0">
          <PercentChart
            chartData={Number(value)}
            chartRange={type === "pm10" ? pm10Range : pm25Range}
            chartColor={airChartColor}
          />
        </Box>
      </Box>
    </Card>
  );
};
