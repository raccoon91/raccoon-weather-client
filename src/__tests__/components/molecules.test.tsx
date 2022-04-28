import { ThemeProvider } from "styled-components";
import { theme } from "configs";
import { render } from "@testing-library/react";
import { UnitText } from "components/molecules";
import type { ReactNode } from "react";

const renderComponent = (components: ReactNode) => render(<ThemeProvider theme={theme}>{components}</ThemeProvider>);

describe("molecules", () => {
  describe("<UnitText />", () => {
    test("matches snapshot", () => {
      const screen = renderComponent(<UnitText value="100" unit="%" />);

      expect(screen.container).toMatchSnapshot();
    });

    test("shows the props correctly", () => {
      const screen = renderComponent(<UnitText value="100" unit="%" />);
      const text = screen.getByText("100");
      const unit = screen.getByText("%");

      expect(text).toBeInTheDocument();
      expect(unit).toBeInTheDocument();
      expect(text).toHaveStyle("color: #000000");
      expect(unit).toHaveStyle("color: #000000");
    });
  });
});
