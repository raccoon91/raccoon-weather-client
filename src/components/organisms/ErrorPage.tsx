import { FC } from "react";
import { Flex, Title1, Anchor } from "components/atoms";

interface IErrorPageProps {
  error?: string;
  redirectUrl?: string;
  redirectMessage?: string;
}

export const ErrorPage: FC<IErrorPageProps> = ({ error, redirectUrl, redirectMessage }) => {
  return (
    <Flex d="column" a="center" bgc="skyBlue" m="0 0 10rem">
      <Title1 color="blue" size="2xl">
        {error || "Page Not Found"}
      </Title1>
      <Anchor to={redirectUrl || "/"} variant="primary-outline" m="6rem 0 0">
        {redirectMessage || "Go To Main"}
      </Anchor>
    </Flex>
  );
};
