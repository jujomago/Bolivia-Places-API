import z from "zod";

const mediaSchema = z.object({
  url: z.string().url(), // Valida que sea una URL válida
  type: z.enum(["video", "foto"]), // Solo permite "video" o "image"
});

const placeSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be an string",
  }),
  description: z.string({
    invalid_type_error: "Description must be an string",
  }),
  description_html: z
    .string({
      invalid_type_error: "Description must be an string",
    })
    .optional(),
  location: z.string(),
  default_photo: z
    .string()
    .url({
      message: "Photo must be a valid URL",
    })
    .optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category_id: z.number().int().positive().optional(),
  city_id: z.number().int().positive().optional(),
  media: z.array(mediaSchema).optional(),
  tags: z.array(z.number()).optional(),
});

export function validatePlace(input) {
  return placeSchema.safeParse(input);
}

export function validatePartialPlace(input) {
  return placeSchema.partial().safeParse(input);
}
