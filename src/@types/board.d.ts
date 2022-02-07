interface IItemGrid {
  column: string;
  row: string;
}

interface IBoardItem {
  id: number;
  category: string;
  name: string;
  title: string;
  unit?: string;
  desktop: string;
  mobile: string;
}
