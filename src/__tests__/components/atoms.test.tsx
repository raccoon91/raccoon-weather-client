import { ThemeProvider } from "styled-components";
import { theme } from "configs";
import { render } from "@testing-library/react";
import { Box } from "components/atoms";
import type { ReactNode } from "react";

const renderComponent = (components: ReactNode) => render(<ThemeProvider theme={theme}>{components}</ThemeProvider>);

describe("atoms", () => {
  describe("<Box />", () => {
    test("matches snapshot", () => {
      const screen = renderComponent(<Box w="100px" h="50px" bgc="white" />);

      expect(screen.container).toMatchSnapshot();
    });

    test("shows the props correctly", () => {
      const screen = renderComponent(<Box data-testid="box" w="100px" h="50px" bgc="white" />);
      const box = screen.getByTestId("box");

      expect(box).toHaveStyle(`
        width: 100px;
        height: 50px;
        background-color: ${theme.color.white};
      `);
    });
  });
});
