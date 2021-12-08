import { FC } from "react";
import { Card, Box, Title3, Text } from "components/atoms";

interface IWindCardProps {
  title: string;
  value: string;
}

export const WindCard: FC<IWindCardProps> = ({ title, value }) => {
  return (
    <Card w="32%" h="160px" p="30px">
      <Title3 size="sm">{title}</Title3>

      <Box a="center" m="8px 0 0">
        <Text size="5xl" weight="bold">
          {value}m/s
        </Text>
      </Box>
    </Card>
  );
};
