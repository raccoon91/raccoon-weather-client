import styled from "styled-components";

interface ISkeletonProps {
  w: string;
  h: string;
  m?: string;
}

export const Skeleton = styled.div<ISkeletonProps>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  ${({ m }) => m && `margin: ${m};`}
  border-radius: 0.5rem;
  background: ${({ theme }) =>
    `linear-gradient(-90deg, ${theme.color.gray} 0%, ${theme.color.background} 50%, ${theme.color.gray} 100%)`};
  background-size: 400% 400%;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;
