import z from "zod";

const citySchema = z.object({
  name: z.string({
    required_error: "City name is required",
    invalid_type_error: "City name must be an string",
  }),
});

export function validateCity(input) {
  return citySchema.safeParse(input);
}
