import { FC } from "react";
import { Box, Text } from "components/atoms";
import { Navigation } from "components/molecules";

export const ClimateDashboard: FC = () => {
  return (
    <Box o="hidden auto" f="1" h="100%" p="4rem 6rem" bgc="skyBlue" btlr="3rem">
      <Navigation />

      <Box fd="row" j="space-between" m="3rem 0 0">
        <Text>Climate Dashboard</Text>
      </Box>
    </Box>
  );
};
