interface ICanvasOptions {
  canvasPadding: number;
  yAxisWidth: number;
  xAxisHeight: number;
  chartPadding: number;
}

interface IDataRange {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  rangeX: number;
  rangeY: number;
}

interface IRangeOptions {
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
}

interface ICanvasPostion {
  originX: number;
  originY: number;
  endX: number;
  endY: number;
  chartWidth: number;
  chartHeight: numbe;
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

interface IChartOptions {
  color?: string;
  alpha?: number;
  size?: number;
}

interface IStrokeOptions {
  strokeColor?: string;
  strokeAlpha?: number;
  strokeWidth?: number;
}

type IDotOptions = IChartOptions;

interface IBarOptions extends IChartOptions, IStrokeOptions {}

type ILineOptions = IChartOptions;
