import { z } from "zod";

const environmentSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z.enum(["local", "prod", "beta"]),
});

if (process.env.NEXT_PUBLIC_APP_ENV === "local") {
  try {
    environmentSchema.parse(process.env);
  } catch (error) {
    console.error("Environment is faulty", error);
  }
}

type EnvVarSchemaType = z.infer<typeof environmentSchema>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
