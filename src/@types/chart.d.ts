interface IChartOptions {
  paddingX: number;
  paddingY: number;
  yAxisWidth: number;
  xAxisHeight: number;
}

interface IDrawOptions {
  paddingX: number;
  paddingY: number;
}

interface IDataRange {
  min?: number;
  max?: number;
}

interface ICanvasOptions {
  chart: IChartOptions;
  draw: IDrawOptions;
  dataRange: IDataRange;
}

interface IAxisOptions {
  alpha?: number;
  style?: string;
}

interface ITickOptions {
  textAlpha?: number;
  textStyle?: string;
  strokeAlpha?: number;
  strokeStyle?: string;
}

interface IChartNodeOptions {
  color?: string;
  alpha?: number;
  size?: number;
}

interface IStrokeOptions {
  strokeColor?: string;
  strokeAlpha?: number;
  strokeWidth?: number;
}

type IDotOptions = IChartNodeOptions;

interface IBarOptions extends IChartNodeOptions, IStrokeOptions {}

type ILineOptions = IChartNodeOptions;
