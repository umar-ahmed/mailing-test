import { createNextMailing } from "next-mailing/server";

export const { handler, getServerSideProps } = createNextMailing(
  require.context(".", false, /\.[jt]sx$/)
);
