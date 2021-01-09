import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FlexBox, H2, Button } from "src/components/base";

export const NoMatchPage: FC = () => {
  return (
    <FlexBox direction="column" width="100vw" height="100vh">
      <H2 size="30px" weight="bold" margin="0 0 40px" color="navy">
        Page Not Found
      </H2>
      <Link to="/">
        <Button width="100px" height="36px" bgcolor="#73879c" color="white">
          Home
        </Button>
      </Link>
    </FlexBox>
  );
};
