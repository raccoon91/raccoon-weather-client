import { FC, useState } from "react";
import { useInput } from "hooks";
import { Flex, Box, Form, Title3, Text, Label, Input, Button } from "components/atoms";
import type { FormEventHandler } from "react";

interface ISignInProps {
  onSubmitSignIn: (userId: string, password: string) => void;
}

export const SignIn: FC<ISignInProps> = ({ onSubmitSignIn }) => {
  const [isSignInSubmitted, setIsSignInSubmitted] = useState(false);
  const [userId, handleChangeUserId] = useInput("");
  const [password, handleChangePassword] = useInput("");

  const handleSubmitSignIn: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!userId && !password) return;

    setIsSignInSubmitted(true);

    onSubmitSignIn(userId, password);
  };

  return (
    <Form
      w="100%"
      maxw="50rem"
      minw="30rem"
      m="0 0 10rem"
      p="4rem 5rem"
      br="1rem"
      bgc="white"
      onSubmit={handleSubmitSignIn}
    >
      <Title3>로그인</Title3>

      <Flex po="relative" j="space-between" m="4rem 0 0">
        <Label htmlFor="user-id">아이디</Label>
        <Input id="user-id" w="calc(100% - 12rem)" value={userId} onChange={handleChangeUserId} autoFocus />

        {isSignInSubmitted && !userId ? (
          <Box po="absolute" r="0.5rem" b="-1.5rem">
            <Text size="xs" color="red">
              아이디를 입력해주세요.
            </Text>
          </Box>
        ) : null}
      </Flex>

      <Flex po="relative" j="space-between" m="3rem 0 0">
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" w="calc(100% - 12rem)" value={password} onChange={handleChangePassword} />

        {isSignInSubmitted && !password ? (
          <Box po="absolute" r="0.5rem" b="-1.5rem">
            <Text size="xs" color="red">
              비밀번호를 입력해주세요.
            </Text>
          </Box>
        ) : null}
      </Flex>

      <Flex j="flex-end" m="4rem 0 0">
        <Button type="submit">로그인</Button>
      </Flex>
    </Form>
  );
};
