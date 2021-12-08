import { FC } from "react";
import { Card, Box, Title3, Text, PercentChart } from "components/atoms";
import { percentRange } from "configs";

interface IPercentCardProps {
  title: string;
  value: string;
}

export const PercentCard: FC<IPercentCardProps> = ({ title, value }) => {
  return (
    <Card w="32%" h="170px" p="30px 40px">
      <Title3 size="sm">{title}</Title3>

      <Box f="1" a="center" m="8px 0 0">
        <Text size="4xl" weight="bold">
          {value}%
        </Text>

        <Box w="100%" m="auto 0 0">
          <PercentChart chartData={Number(value)} chartRange={percentRange} />
        </Box>
      </Box>
    </Card>
  );
};
