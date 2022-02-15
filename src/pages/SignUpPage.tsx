import { FC } from "react";
import { useAppDispatch } from "hooks";
import { postSignUp } from "stores/slices/authSlice";
import { Header, SignUp } from "components/organisms";
import { PageTemplate } from "components/templates";

export const SignUpPage: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitSignUp = (userId: string, password: string) => {
    dispatch(postSignUp({ userId, password }));
  };

  return <PageTemplate header={<Header />} main={<SignUp onSubmitSignUp={handleSubmitSignUp} />} />;
};
