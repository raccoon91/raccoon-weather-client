import { FC } from "react";
import { Title1, Anchor } from "components/atoms";
import { PageTemplate } from "components/templates";

export const NotFoundPage: FC = () => {
  return (
    <PageTemplate>
      <Title1 color="blue" size="2xl">
        Page Not Found
      </Title1>
      <Anchor to="/" variant="primary-outline" m="6rem 0 0">
        Go To Main
      </Anchor>
    </PageTemplate>
  );
};
