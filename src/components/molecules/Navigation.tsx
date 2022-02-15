import { FC } from "react";
import { Flex, NavAnchor } from "components/atoms";

export const Navigation: FC = () => {
  return (
    <Flex>
      <NavAnchor to="/" size="xl" weight="bold" m="0 2rem 0 0">
        Today
      </NavAnchor>
      <NavAnchor to="/climate" size="xl" weight="bold">
        Climate
      </NavAnchor>

      {/* <NavAnchor to="/sign-in" size="xl" weight="bold" m="0 2rem 0 auto">
        Sign In
      </NavAnchor>
      <NavAnchor to="/sign-up" size="xl" weight="bold">
        Sign Up
      </NavAnchor> */}
    </Flex>
  );
};
