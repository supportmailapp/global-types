import { z } from "zod/mini";
import { AllowedMentionsTypes } from "discord-api-types/v10";
import { SMAllowedMentions } from "../database/panel";

export const SnowflakeSchema = z.string().check(z.regex(/^\d{17,23}$/, "Invalid Snowflake"));

/* This accepts the api schema and parses it to the DB schema */
export const APIAllowedMentionsSchema = z.object({
  everyone: z._default(z.boolean(), false),
  userMode: z._default(z.enum(["all", "none", "specific"]), "none"),
  roleMode: z._default(z.enum(["all", "none", "specific"]), "none"),
  users: z.optional(z.array(SnowflakeSchema).check(z.maxLength(100, "Maximum of 100 user mentions"))),
  roles: z.optional(z.array(SnowflakeSchema).check(z.maxLength(100, "Maximum of 100 role mentions"))),
});
export const AllowedMentionsSchema = z.pipe(
  APIAllowedMentionsSchema,
  z.transform((data) => {
    const final: SMAllowedMentions = {};

    if (data.roleMode === "none" && data.userMode === "none" && !data.everyone) {
      final.parse = [];
      return final;
    }

    // Handle roles
    if (data.roleMode === "all") {
      if (!final.parse) final.parse = [];
      final.parse.push(AllowedMentionsTypes.Role);
    } else if (data.roleMode === "none") {
      // Do nothing, no roles to mention
    } else if (data.roles && data.roles.length > 0) {
      final.roles = data.roles;
    } else if (data.roleMode === "specific" && (!data.roles || data.roles.length === 0)) {
      final.roles = undefined;
    }

    // Handle users
    if (data.userMode === "all") {
      if (!final.parse) final.parse = [];
      final.parse.push(AllowedMentionsTypes.User);
    } else if (data.userMode === "none") {
      // Do nothing, no users to mention
    } else if (data.users && data.users.length > 0) {
      final.users = data.users;
    }
    if (final.roles && final.roles.length === 0) {
      delete final.roles; // if its set, discord will thorw an error
    }
    if (final.users && final.users.length === 0) {
      delete final.users; // if its set, discord will thorw an error
    }

    // Handle everyone
    if (data.everyone) {
      if (!final.parse) final.parse = [];
      final.parse.push(AllowedMentionsTypes.Everyone);
    }

    return final;
  }),
);

export type APIAllowedMentions = z.infer<typeof APIAllowedMentionsSchema>;
