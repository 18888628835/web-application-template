/** @type {import('next').NextConfig} */

const path = require("node:path");
const dotenv = require("dotenv");

const envFile = process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : ".env";

module.exports = {
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  env: {
    ...dotenv.config({ path: envFile }).parsed,
  },
};
