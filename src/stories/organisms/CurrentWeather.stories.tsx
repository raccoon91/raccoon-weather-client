import styled from "styled-components";
import { Box, Grid } from "components/atoms";
import { CurrentWeather } from "components/organisms";
import type { Story } from "stories/storybook";

const Wrapper = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    width: 26rem;
    height: 80rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 16rem;
  }
`;

export default {
  title: "Organisms/Current Weather",
  component: CurrentWeather,
  argTypes: {
    showMapModalButton: { table: { disable: true } },
    openMapModal: { table: { disable: true } },
  },
};

interface TemplateProps {
  weather: IWeather | null;
}

const Template: Story<TemplateProps> = (args) => (
  <Box o="auto" w="100%" h="100%">
    <Wrapper bgc="blue">
      <CurrentWeather {...args} />
    </Wrapper>
  </Box>
);

export const Weather = Template.bind({});
Weather.args = {
  weather: {
    city: { korName: "서울" },
    today: "2022-01-01 12:00",
    sky: 1,
    temp: 10,
    feel: 9,
    humid: 10,
    rain: 0,
    rainType: 0,
    rainProb: 0,
    pm10: 10,
    pm25: 16,
    wind: 10,
    windDirection: 170,
    case: 100,
    caseIncrement: 10,
  },
};

export const Skeleton = Template.bind({});
Skeleton.args = {
  weather: null,
};
