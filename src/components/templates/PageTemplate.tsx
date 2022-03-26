import { FC } from "react";
import { Flex } from "components/atoms";

interface IPageTemplateProps {
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PageTemplate: FC<IPageTemplateProps> = ({ header, main, footer }) => {
  return (
    <Flex d="column" w="100%" h="100%" bgc="skyBlue">
      {header ? header : null}

      {main ? (
        <Flex f="1" w="100%" a="center" j="center" p="0 1rem">
          {main}
        </Flex>
      ) : null}

      {footer ? footer : null}
    </Flex>
  );
};
