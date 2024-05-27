import { z } from "zod";

export const loginSchema = z.object({
  accountType: z.string(),
  username: z.string().email(),
  password: z.string().min(6),
  serverAddress: z.string().regex(/^[^\s*]+$/),
  serverPath: z.string().startsWith("/").default("/"),
  port: z.number().min(1).max(65535).default(80),
  useSSL: z.boolean().default(false),
});

// I'm not sure if I should default the values
// or make them required if the account type
// is advanced so I'll do the second variant below
const baseSchema = z.object({
  accountType: z.string(),
  username: z.string().email(),
  password: z.string().min(6),
  serverAddress: z.string().regex(/^[^\s*]+$/),
  useSSL: z.boolean().default(false),
});

const advancedSchema = baseSchema.extend({
  serverPath: z.string().startsWith("/"),
  port: z.number().min(1).max(65535),
});

const loginSchema2 = z.union([
  baseSchema,
  baseSchema
    .extend({
      accountType: z.literal("advanced"),
    })
    .merge(advancedSchema),
]);
