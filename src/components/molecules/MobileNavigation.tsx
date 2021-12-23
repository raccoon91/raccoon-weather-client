import { FC } from "react";
import styled from "styled-components";
import { Box, NavAnchor, Text } from "components/atoms";
import { ReactComponent as SunIcon } from "images/sun.svg";
import { ReactComponent as CloudIcon } from "images/cloud.svg";
import { ReactComponent as MapIcon } from "images/map.svg";

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
`;

const MobileNavAnchor = styled(NavAnchor)`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;

  svg {
    width: 3rem;
    height: 3rem;
    stroke: black;
  }

  &.active {
    ${ImageWrapper} {
      position: absolute;
      top: -2rem;

      svg {
        stroke: white;
        z-index: 3;
      }

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5rem;
        height: 5rem;
        border-radius: 2.5rem;
        background-color: ${({ theme }) => theme.color.blue};
        transform: translate(-2.5rem, -2.5rem);
        z-index: 2;
      }

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        border-top: ${({ theme }) => `1rem solid ${theme.color.skyBlue}`};
        border-right: ${({ theme }) => `1rem solid ${theme.color.skyBlue}`};
        border-bottom: 1rem solid transparent;
        border-left: 1rem solid transparent;
        transform: translate(-3rem, -3rem) rotate(135deg);
        z-index: 1;
      }
    }

    ${Text} {
      margin: 1rem 0 0;
    }
  }
`;

export const MobileNavigation: FC = () => {
  return (
    <Box po="relative" fd="row" a="center" j="space-around" h="100%" bgc="white">
      <MobileNavAnchor to="/today" exact size="xl" weight="bold">
        <ImageWrapper>
          <SunIcon />
        </ImageWrapper>
        <Text>Today</Text>
      </MobileNavAnchor>

      <MobileNavAnchor to="/climate" exact size="xl" weight="bold">
        <ImageWrapper>
          <CloudIcon />
        </ImageWrapper>
        <Text>Climate</Text>
      </MobileNavAnchor>

      <MobileNavAnchor to="/today/map" exact size="xl" weight="bold">
        <ImageWrapper>
          <MapIcon />
        </ImageWrapper>
        <Text>Region</Text>
      </MobileNavAnchor>
    </Box>
  );
};
