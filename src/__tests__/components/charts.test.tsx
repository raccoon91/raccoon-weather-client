import { ThemeProvider } from "styled-components";
import { theme } from "configs";
import { render } from "@testing-library/react";
import { ProgressChart } from "components/atoms";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";
import type { ReactNode } from "react";

const weather = {
  feel: 27.9,
  rainProb: 20,
  pm10: 10,
  pm25: 20,
};

const renderComponent = (components: ReactNode) => render(<ThemeProvider theme={theme}>{components}</ThemeProvider>);

describe("atoms", () => {
  describe("<ProgressChart chartOptions={tempChartOptions} />", () => {
    test("matches snapshot", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.feel} chartOptions={tempChartOptions} />);

      expect(screen.container).toMatchSnapshot();
    });

    test("shows the temp chart props correctly", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.feel} chartOptions={tempChartOptions} />);
      const firstTick = screen.getByText("-20");
      const secondTick = screen.getByText("0");
      const thirdTick = screen.getByText("35");

      expect(firstTick).toBeInTheDocument();
      expect(secondTick).toBeInTheDocument();
      expect(thirdTick).toBeInTheDocument();
    });
  });

  describe("<ProgressChart chartOptions={percentChartOptions} />", () => {
    test("matches snapshot", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.rainProb} chartOptions={percentChartOptions} />);

      expect(screen.container).toMatchSnapshot();
    });

    test("shows the rain probability chart props correctly", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.rainProb} chartOptions={percentChartOptions} />);
      const firstTick = screen.getByText("0");
      const secondTick = screen.getByText("20");
      const thirdTick = screen.getByText("40");
      const fourthTick = screen.getByText("60");
      const fifthTick = screen.getByText("80");
      const sixthTick = screen.getByText("100");

      expect(firstTick).toBeInTheDocument();
      expect(secondTick).toBeInTheDocument();
      expect(thirdTick).toBeInTheDocument();
      expect(fourthTick).toBeInTheDocument();
      expect(fifthTick).toBeInTheDocument();
      expect(sixthTick).toBeInTheDocument();
    });
  });

  describe("<ProgressChart chartOptions={pm10ChartOptions} />", () => {
    test("matches snapshot", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.pm10} chartOptions={pm10ChartOptions} />);

      expect(screen.container).toMatchSnapshot();
    });

    test("shows the pm10 chart props correctly", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.pm10} chartOptions={pm10ChartOptions} />);
      const firstTick = screen.getByText("0");
      const secondTick = screen.getByText("30");
      const thirdTick = screen.getByText("80");
      const fourthTick = screen.getByText("150");
      const fifthTick = screen.getByText("200");

      expect(firstTick).toBeInTheDocument();
      expect(secondTick).toBeInTheDocument();
      expect(thirdTick).toBeInTheDocument();
      expect(fourthTick).toBeInTheDocument();
      expect(fifthTick).toBeInTheDocument();
    });
  });

  describe("<ProgressChart chartOptions={pm25ChartOptions} />", () => {
    test("matches snapshot", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.pm10} chartOptions={pm25ChartOptions} />);

      expect(screen.container).toMatchSnapshot();
    });

    test("shows the pm10 chart props correctly", () => {
      const screen = renderComponent(<ProgressChart chartData={weather.pm10} chartOptions={pm25ChartOptions} />);
      const firstTick = screen.getByText("0");
      const secondTick = screen.getByText("15");
      const thirdTick = screen.getByText("35");
      const fourthTick = screen.getByText("75");
      const fifthTick = screen.getByText("100");

      expect(firstTick).toBeInTheDocument();
      expect(secondTick).toBeInTheDocument();
      expect(thirdTick).toBeInTheDocument();
      expect(fourthTick).toBeInTheDocument();
      expect(fifthTick).toBeInTheDocument();
    });
  });
});
