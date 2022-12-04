import { PageConfig } from "next";
import NextMailingAPI from "next-mailing/api";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default NextMailingAPI();

export const config: PageConfig = {
  unstable_includeFiles: ["emails/**/*.{js,ts,jsx,tsx}", "mailing.config.json"],
};
