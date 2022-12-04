import { PageConfig } from "next";
import NextMailingPage from "next-mailing/page";
import { getServerSideProps } from "next-mailing/page/server";

export default NextMailingPage;

export { getServerSideProps };

export const config: PageConfig = {
  unstable_includeFiles: ["emails/**/*.{js,ts,jsx,tsx}", "mailing.config.json"],
};
