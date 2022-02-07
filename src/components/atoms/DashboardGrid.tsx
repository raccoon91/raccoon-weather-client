import styled, { css } from "styled-components";
import { Grid } from "components/atoms";

interface IGridITemValue {
  column: string;
  row: string;
}

interface IDashboardGridProps {
  desktopGridItems: IGridITemValue[];
  mobileGridItems: IGridITemValue[];
}

const createGridItem = (items: IGridITemValue[]) => {
  if (!items) return "";

  const styles = items
    .map(
      (item, index) => `
        & .card:nth-child(${index + 1}) {
          grid-column: ${item.column};
          grid-row: ${item.row};
        }
      `
    )
    .join("");

  return css`
    ${styles}
  `;
};

export const DashboardGrid = styled(Grid)<IDashboardGridProps>`
  gap: 2rem;
  grid-auto-columns: 1fr;
  grid-auto-rows: 4rem;

  @media ${({ theme }) => theme.device.desktop} {
    padding: 2rem 10rem 4rem;

    ${({ desktopGridItems }) => createGridItem(desktopGridItems)}
  }

  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem 3rem 3rem;

    ${({ mobileGridItems }) => createGridItem(mobileGridItems)}
  }
`;
