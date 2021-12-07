import { FC } from "react";
import { Box, Card, Title2, Text } from "components/atoms";

interface IWeatherLayoutProps {
  city: string;
  today?: string;
  temp?: string;
  sky?: string;
  text: string;
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({ city, today, temp, sky, text }) => {
  return (
    <Box o="hidden" fd="row" w="100vw" h="100vh" bgc="blue">
      <Box w="20%" minw="200px" h="100%" p="80px 30px 30px">
        <Text color="white">{city}</Text>
        <Text color="white">{today}</Text>

        <Title2 color="white" size="3xl">
          {temp}
        </Title2>

        <Text color="white">{sky}</Text>
      </Box>

      <Box f="1" h="100%" p="30px 40px" bgc="skyBlue" btlr="30px">
        <Title2 size="lg">{text}</Title2>

        <Box fd="row" j="space-between" m="20px 0 0">
          <Card w="30%" h="100px" p="20px">
            <Text>{text}</Text>
          </Card>

          <Card w="30%" h="100px" p="20px">
            <Text>{text}</Text>
          </Card>

          <Card w="30%" h="100px" p="20px">
            <Text>{text}</Text>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
