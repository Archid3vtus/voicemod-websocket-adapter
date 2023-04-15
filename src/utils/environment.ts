import { readFileSync } from "fs";

export const readAndSetEnvironmentFile = (stage: string | undefined) => {
  if (stage == null) throw new Error("No STAGE defined");

  stage = stage.trim();

  const envFile = JSON.parse(readFileSync("environment.json").toString());

  process.env = {
    ...process.env,
    ...envFile[stage],
  };
};
