import { FC } from "react";
import { Box, NavAnchor } from "components/atoms";

export const Navigation: FC = () => {
  return (
    <Box fd="row" h="100%">
      <NavAnchor to="/today" size="xl" weight="bold" m="0 1.6rem 0 0">
        Today
      </NavAnchor>
      <NavAnchor to="/climate" size="xl" weight="bold">
        Climate
      </NavAnchor>
    </Box>
  );
};
