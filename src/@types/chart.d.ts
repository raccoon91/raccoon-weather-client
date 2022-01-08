interface ICanvasOptions {
  chart: {
    paddingX: number;
    paddingY: number;
    yAxisWidth: number;
    xAxisHeight: number;
  };
  draw: {
    paddingX: number;
    paddingY: number;
  };
  data: {
    min?: number;
    max?: number;
  };
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
