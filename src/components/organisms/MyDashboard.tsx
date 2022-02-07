import { FC, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Text, Span, DashboardGrid, ProgressChart, WindIndicator } from "components/atoms";
import { DraggableCard, ForecastChart } from "components/molecules";
import { dashboardItems, tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";
import type { DragEventHandler } from "react";

interface IMyDashboardProps {
  weather: IWeather | null;
  forecasts: IForecast[] | null;
}

export const MyDashboard: FC<IMyDashboardProps> = ({ weather, forecasts }) => {
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [dragEnterIndex, setDragEnterIndex] = useState<number | null>(null);
  const [myDashboardItems, setMyDashboardItems] = useState<IBoardItem[]>([]);
  const [desktopItemGrid, setDesktopItemGrid] = useState<IItemGrid[]>([]);
  const [mobileItemGrid, setMobileItemGrid] = useState<IItemGrid[]>([]);

  const getDesktopItemGrid = (boardItems: IBoardItem[]) => {
    const desktopItemGrid: IItemGrid[] = [];
    let columnStart = 1;
    let rowStart = 1;

    for (const item of boardItems) {
      const [column, row] = item.desktop.split("x");

      const position = {
        column: `${columnStart}/${(columnStart += Number(column))}`,
        row: `${rowStart}/${rowStart + Number(row)}`,
      };

      if (columnStart === 19) {
        columnStart = 1;
        rowStart += Number(row);
      }

      desktopItemGrid.push(position);
    }

    return desktopItemGrid;
  };

  useEffect(() => {
    // const myDashboard = localStorage.getItem("myDashboard");
    // const parsedMyDashboardItems: IBoardItem[] = myDashboard ? JSON.parse(myDashboard) : [];
    const parsedMyDashboardItems: IBoardItem[] = [
      dashboardItems.feel,
      dashboardItems.rainProb,
      dashboardItems.covid,
      dashboardItems.forecast,
      dashboardItems.pm10,
      dashboardItems.pm25,
      dashboardItems.wind,
    ];

    const newDesktopItemGrid = getDesktopItemGrid(parsedMyDashboardItems);

    setMyDashboardItems(parsedMyDashboardItems);
    setDesktopItemGrid(newDesktopItemGrid);
  }, []);

  const replaceMyDashboard = (startIndex: number | null, enterIndex: number | null) => {
    if (startIndex === null || enterIndex === null) return;

    const start = startIndex;
    let enter = enterIndex;

    const copiedMyDashboardItems = myDashboardItems.slice();
    const startItem = copiedMyDashboardItems?.splice(start, 1)?.[0];

    if (!startItem) return;

    const [column] = startItem.desktop.split("x");

    if (column === "18") {
      console.log(desktopItemGrid[enterIndex]);

      enter = Math.floor(enterIndex / 3) * 3;

      console.log(enter);
    }

    // copiedMyDashboardItems.splice(enter, 0, startItem);
    // const newDesktopItemGrid = getDesktopItemGrid(copiedMyDashboardItems);

    // setMyDashboardItems(copiedMyDashboardItems);
    // setDesktopItemGrid(newDesktopItemGrid);
  };

  const handleDragStart = (startIndex: number) => {
    setDragStartIndex(startIndex);
  };

  const handleDragEnter = (enterIndex: number) => {
    setDragEnterIndex(enterIndex);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = () => {
    replaceMyDashboard(dragStartIndex, dragEnterIndex);
  };

  const handleDragEnd = () => {
    setDragStartIndex(null);
    setDragEnterIndex(null);
  };

  return (
    <DashboardGrid
      o="hidden auto"
      w="100%"
      h="100%"
      desktopGridItems={desktopItemGrid}
      mobileGridItems={mobileItemGrid}
      onDrop={handleDrop}
    >
      {myDashboardItems.map((boardItem, index) =>
        boardItem.name === "feel" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!weather}
            title={boardItem.title}
            unit={boardItem.unit}
            value={weather?.feel}
            chart={<ProgressChart chartData={weather?.feel} chartOptions={tempChartOptions} />}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : boardItem.name === "rainProb" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!weather}
            title={boardItem.title}
            unit={boardItem.unit}
            value={weather?.rainProb}
            chart={<ProgressChart chartData={weather?.rainProb} chartOptions={percentChartOptions} />}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : boardItem.name === "covid" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!weather}
            title={`${weather?.city?.korName} ${boardItem.title}`}
            caption={weather?.caseDate ? `${dayjs(weather.caseDate).format("MM월 DD일")} 기준 정보` : null}
            unit={boardItem.unit}
            value={weather?.caseIncrement?.toLocaleString()}
            chart={
              <Text size="xs" align="right">
                누적 확진자 <Span weight="bold">{weather?.case?.toLocaleString()}</Span>명
              </Text>
            }
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : boardItem.name === "pm10" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!weather}
            title={boardItem.title}
            unit={boardItem.unit}
            value={weather?.pm10}
            chart={<ProgressChart chartData={weather?.pm10} chartOptions={pm10ChartOptions} />}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : boardItem.name === "pm25" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!weather}
            title={boardItem.title}
            unit={boardItem.unit}
            value={weather?.pm25}
            chart={<ProgressChart chartData={weather?.pm25} chartOptions={pm25ChartOptions} />}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : boardItem.name === "wind" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!weather}
            title={boardItem.title}
            unit={boardItem.unit}
            value={weather?.wind}
            chart={<WindIndicator windDirection={weather?.windDirection} />}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : boardItem.name === "forecast" ? (
          <DraggableCard
            key={boardItem.id}
            index={index}
            enterIndex={dragEnterIndex}
            isLoad={!!forecasts}
            title={boardItem.title}
            chart={<ForecastChart datasets={forecasts} />}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ) : null
      )}
    </DashboardGrid>
  );
};
