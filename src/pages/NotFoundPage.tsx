import { FC } from "react";
import { ErrorPage } from "components/organisms";
import { PageTemplate } from "components/templates";

export const NotFoundPage: FC = () => {
  return <PageTemplate main={<ErrorPage />} />;
};
