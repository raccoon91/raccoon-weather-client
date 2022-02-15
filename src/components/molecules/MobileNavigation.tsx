import { FC } from "react";
import styled from "styled-components";
import { Flex, NavAnchor, Text } from "components/atoms";
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
  z-index: 5;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 3.5rem;
    height: 3.5rem;
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
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        background-color: ${({ theme }) => theme.color.blue};
        transform: translate(-3rem, -3rem);
        z-index: 2;
      }

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8rem;
        height: 8rem;
        border-radius: 4rem;
        border-top: ${({ theme }) => `1rem solid ${theme.color.skyBlue}`};
        border-right: ${({ theme }) => `1rem solid ${theme.color.skyBlue}`};
        border-bottom: 1rem solid transparent;
        border-left: 1rem solid transparent;
        transform: translate(-4rem, -4rem) rotate(135deg);
        z-index: 1;
      }
    }

    ${Text} {
      margin: 3rem 0 0;
    }
  }
`;

export const MobileNavigation: FC = () => {
  return (
    <Flex po="relative" a="center" j="space-around" h="100%" bgc="white">
      <MobileNavAnchor to="/" end size="xl" weight="bold">
        <ImageWrapper>
          <SunIcon />
        </ImageWrapper>
        <Text size="lg">Today</Text>
      </MobileNavAnchor>

      <MobileNavAnchor to="/climate" end size="xl" weight="bold">
        <ImageWrapper>
          <CloudIcon />
        </ImageWrapper>
        <Text size="lg">Climate</Text>
      </MobileNavAnchor>

      <MobileNavAnchor to="/map" end size="xl" weight="bold">
        <ImageWrapper>
          <MapIcon />
        </ImageWrapper>
        <Text size="lg">Region</Text>
      </MobileNavAnchor>
    </Flex>
  );
};
