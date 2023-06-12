import { z } from "zod";

const title = z
  .string()
  .min(4, {
    message: "O título precisa ter no mínimo 4 caracteres.",
  })
  .max(16, {
    message: "o título precisa ter no máximo 16 caracteres.",
  });

const subtitle = z
  .string()
  .min(8, {
    message: "O subtítulo precisa ter no mínimo 8 caracteres.",
  })
  .max(24, {
    message: "o subtítulo precisa ter no máximo 24 caracteres.",
  });

const content = z
  .string()
  .min(16, {
    message: "O conteúdo precisa ter no mínimo 16 caracteres.",
  })
  .max(140, {
    message: "o conteúdo precisa ter no máximo 140 caracteres.",
  });

export const NotepadSchema = z.object({
  title,
  subtitle,
  content,
});
