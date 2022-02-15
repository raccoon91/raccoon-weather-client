import { FC, useState, useEffect } from "react";
import { useInput } from "hooks";
import { Flex, Box, Form, Title3, Text, Label, Input, Button } from "components/atoms";
import type { FormEventHandler } from "react";

interface ISignUpProps {
  onSubmitSignUp: (userId: string, password: string) => void;
}

export const SignUp: FC<ISignUpProps> = ({ onSubmitSignUp }) => {
  const [isSignUpSubmitted, setIsSignUpSubmitted] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [userId, handleChangeUserId, userIdIsValid, userIdMessage] = useInput("", { type: "userId" });
  const [password, handleChangePassword, passwordIsValid, passwordMessage] = useInput("", { type: "password" });
  const [passwordConfirm, handleChangePasswordConfirm, passwordConfirmIsValid, passwordConfirmMessage] = useInput("", {
    type: "password",
  });

  useEffect(() => {
    if (password === passwordConfirm) {
      setIsPasswordConfirmed(true);
    } else {
      setIsPasswordConfirmed(false);
    }
  }, [password, passwordConfirm]);

  const handleSubmitSignUp: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!userId && !password && !passwordConfirm) return;

    setIsSignUpSubmitted(true);

    if (!userIdIsValid || !passwordIsValid || !passwordConfirmIsValid) return;

    onSubmitSignUp(userId, password);
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
      onSubmit={handleSubmitSignUp}
    >
      <Title3>회원가입</Title3>

      <Flex po="relative" j="space-between" m="4rem 0 0">
        <Label htmlFor="user-id">아이디</Label>
        <Input id="user-id" w="calc(100% - 12rem)" value={userId} onChange={handleChangeUserId} autoFocus />

        {isSignUpSubmitted && userIdMessage ? (
          <Box po="absolute" r="0.5rem" b="-1.5rem">
            <Text size="xs" color="red">
              {userIdMessage}
            </Text>
          </Box>
        ) : null}
      </Flex>

      <Flex po="relative" j="space-between" m="3rem 0 0">
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" w="calc(100% - 12rem)" value={password} onChange={handleChangePassword} />

        {isSignUpSubmitted && passwordMessage ? (
          <Box po="absolute" r="0.5rem" b="-1.5rem">
            <Text size="xs" color="red">
              {passwordMessage}
            </Text>
          </Box>
        ) : null}
      </Flex>

      <Flex po="relative" j="space-between" m="3rem 0 0">
        <Label htmlFor="password-confirm">비밀번호 확인</Label>
        <Input
          type="password"
          id="password-confirm"
          w="calc(100% - 12rem)"
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
        />

        {isSignUpSubmitted ? (
          passwordConfirmMessage ? (
            <Box po="absolute" r="0.5rem" b="-1.5rem">
              <Text size="xs" color="red">
                {passwordConfirmMessage}
              </Text>
            </Box>
          ) : !isPasswordConfirmed ? (
            <Box po="absolute" r="0.5rem" b="-1.5rem">
              <Text size="xs" color="red">
                비밀번호가 일치하지 않습니다.
              </Text>
            </Box>
          ) : null
        ) : null}
      </Flex>

      <Flex j="flex-end" m="4rem 0 0">
        <Button type="submit">가입</Button>
      </Flex>
    </Form>
  );
};
