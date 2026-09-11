import { DbzApi } from "@api/base.axios";
import type { DbzCharacter, DbzProps } from "./type.api";

export async function GetCharactersByQuery(query: string): Promise<DbzProps[]> {
  try {
    const response = await DbzApi<DbzCharacter[]>("characters", {
      params: {
        // Búsqueda por raza (para que la variedad de búsqueda aumente)
        race: query.trim(),
        limit: 40,
      },
    });

    const characters = response.data;

    return characters.length != 0
      ? characters.map((character) => ({
          id: character.id,
          name: character.name,
          ki: character.ki,
          race: character.race,
          image: character.image,
          description: character.description,
        }))
      : [];
  } catch {
    throw new Error("Error al consultar la API.");
  }
}
