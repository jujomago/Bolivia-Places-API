import z from "zod";

const TagSchema = z.object({
  name: z.string({
    required_error: "Tag name is required",
    invalid_type_error: "Tag name must be an string",
  }),
});

export function validateTag(input) {
  return TagSchema.safeParse(input);
}
