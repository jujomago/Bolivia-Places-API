import z from "zod";

const categorySchema = z.object({
  name: z.string({
    required_error: "Category name is required",
    invalid_type_error: "Category name debe ser un string",
  }),
});

export const idCategorySchema = z.number().int().positive();

export function validateCategory(input) {
  const resultValidation = categorySchema.safeParse(input);  
  console.log(JSON.stringify(resultValidation, null, 3));
  return resultValidation;
}
