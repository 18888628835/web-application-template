import { z } from "zod";

const environmentSchema = z.object({
  PUBLIC_APP_ENV: z.enum(["local", "prod", "beta"]),
});

try {
  environmentSchema.parse(process.env);
} catch (error) {
  console.error("Environment is faulty", error);
}

type EnvVarSchemaType = z.infer<typeof environmentSchema>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
