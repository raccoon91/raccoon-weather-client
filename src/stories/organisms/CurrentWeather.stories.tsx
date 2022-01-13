import styled from "styled-components";
import { Grid } from "components/atoms";
import { CurrentWeather } from "components/organisms";
import type { Story } from "stories/storybook";

const CurrentWeatherContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    overflow: hidden auto;
    width: 26rem;
    height: 100vh;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
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
  <CurrentWeatherContainer bgc="blue">
    <CurrentWeather {...args} />
  </CurrentWeatherContainer>
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
    pm10: 10,
    pm25: 16,
    wind: 10,
    windDirection: 170,
  },
};

export const Skeleton = Template.bind({});
Skeleton.args = {
  weather: null,
};
