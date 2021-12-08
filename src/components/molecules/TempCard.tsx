import { FC } from "react";
import { Card, Box, Title3, Text, TempChart } from "components/atoms";

interface ITempCardProps {
  title: string;
  value: string;
}

export const TempCard: FC<ITempCardProps> = ({ title, value }) => {
  return (
    <Card w="32%" h="170px" p="30px 40px">
      <Title3 size="sm">{title}</Title3>

      <Box f="1" a="center" m="8px 0 0">
        <Text size="4xl" weight="bold">
          {value}°C
        </Text>

        <Box w="100%" m="auto 0 0">
          <TempChart temp={Number(value)} />
        </Box>
      </Box>
    </Card>
  );
};
