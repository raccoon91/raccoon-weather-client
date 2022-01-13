import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: { [key in TColor]: string };
    textSize: { [key in TTextSize]: string };
    titleSize: { [key in TTitleSize]: string };
    variant: (variant?: TVariant) => string;
    device: { [key in TDevice]: string };
  }
}
