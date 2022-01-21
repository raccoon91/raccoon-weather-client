interface IOptionsChart {
  paddingX: number;
  paddingY: number;
  yAxisWidth: number;
  xAxisHeight: number;
  displayYAxis: boolean;
  displayXAxis: boolean;
}

interface IOptinosTick {
  yTickMax?: number;
  yTickMin?: number;
  xTickMax?: number;
  xTickMin?: number;
  yTickIncrement?: number;
  yTickFormatter?: (value: number) => string;
  xTickFormatter?: (label: string) => string;
}

interface IOptionsDraw {
  paddingX: number;
  paddingY: number;
  dot?: boolean;
  dotColor?: string;
  lineColor?: string;
  barColor?: string;
}

interface IOptionsData {
  min?: number;
  max?: number;
}

interface IOptionsAnimation {
  on: boolean;
  duration: number;
}

interface IOptionsTooltip {
  on: boolean;
  yLabel: string;
  xLabel: string;
  yFormatter: (value: number) => string;
  xFormatter: (label: string) => string;
}

interface ICanvasOptions {
  chart: IOptionsChart;
  tick: IOptinosTick;
  draw: IOptionsDraw;
  data: IOptionsData;
  animation: IOptionsAnimation;
  tooltip: IOptionsTooltip;
}

interface ICanvasOptionsPrpos {
  chart?: Partial<IOptionsChart>;
  tick?: Partial<IOptinosTick>;
  draw?: Partial<IOptionsDraw>;
  data?: Partial<IOptionsData>;
  animation?: Partial<IOptionsAnimation>;
  tooltip?: Partial<IOptionsTooltip>;
}

interface IChartOptinos {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  chartWidth: number;
  chartHeight: number;
  drawStartX: number;
  drawStartY: number;
  drawEndX: number;
  drawEndY: number;
  drawWidth: number;
  drawHeight: number;
  nodeWidth: number;
}

interface IDataRange {
  min: number;
  max: number;
  range: number;
  dataCount?: number;
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
