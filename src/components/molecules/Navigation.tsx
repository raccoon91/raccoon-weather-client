import { FC } from "react";
import { Flex, NavAnchor } from "components/atoms";

export const Navigation: FC = () => {
  return (
    <Flex>
      <NavAnchor to="/today" size="xl" weight="bold" m="0 2rem 0 0">
        Today
      </NavAnchor>
      <NavAnchor to="/climate" size="xl" weight="bold">
        Climate
      </NavAnchor>
    </Flex>
  );
};
