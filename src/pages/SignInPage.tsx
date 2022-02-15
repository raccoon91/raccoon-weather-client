import { FC } from "react";
import { useAppDispatch } from "hooks";
import { postSignIn } from "stores/slices/authSlice";
import { Header, SignIn } from "components/organisms";
import { PageTemplate } from "components/templates";

export const SignInPage: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitSignUp = (userId: string, password: string) => {
    dispatch(postSignIn({ userId, password }));
  };

  return <PageTemplate header={<Header />} main={<SignIn onSubmitSignIn={handleSubmitSignUp} />} />;
};
