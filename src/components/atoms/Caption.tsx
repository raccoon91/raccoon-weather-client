import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { Box } from "./Box";
import { Text } from "./Text";
import { ReactComponent as Info } from "images/info.svg";

const CaptionContainer = styled(Box)`
  svg {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
  }

  ${Text} {
    word-break: keep-all;
    white-space: nowrap;
  }
`;

const MessageBox = styled(Box)`
  display: none;
  border: 1px solid darkgray;
  outline: none;
`;

interface ICaptionProps {
  message: string;
}

export const Caption: FC<ICaptionProps> = ({ message }) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [isOpenMessage, setIsOpenMessage] = useState(false);

  const handleToggleMessage = () => {
    if (!messageRef.current) return;

    if (!isOpenMessage) {
      messageRef.current.style.display = "block";
      messageRef.current.focus();
      setIsOpenMessage(true);
    } else {
      messageRef.current.style.display = "none";
      setIsOpenMessage(false);
    }
  };

  const handleBlurMessage = () => {
    if (!messageRef.current) return;

    messageRef.current.style.display = "none";
    setIsOpenMessage(false);
  };

  return (
    <CaptionContainer po="relative">
      <Info onClick={handleToggleMessage} />

      {isOpenMessage ? <Box po="fixed" t="0" l="0" w="100vw" h="100vh" z="1" /> : null}

      <MessageBox
        ref={messageRef}
        tabIndex={-1}
        po="absolute"
        r="0"
        b="2rem"
        p="1rem 1.6rem"
        br="0.5rem"
        bgc="white"
        onBlur={handleBlurMessage}
        z="2"
      >
        {message.split("\n").map((text, index) => (
          <Text key={`c-${index}`} size="sm" color="darkGray">
            {text}
          </Text>
        ))}
      </MessageBox>
    </CaptionContainer>
  );
};
