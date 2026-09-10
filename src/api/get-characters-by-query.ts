import { DbzApi } from "@api/base.axios";
import type { DbzCharacter, DbzProps, DbzResponse } from "./type.api";

export async function GetCharactersByQuery(query: string): Promise<DbzProps[]> {
  try {
    const response = await DbzApi<DbzResponse | DbzCharacter[]>("characters", {
      params: {
        name: query.trim(),
        limit: 10,
      },
    });

    const rawData = response.data;
    // console.log(
    //   response.data,
    //   typeof response.data,
    //   Array.isArray(response.data),
    // );

    /* 
    Array.isArray()
    - false
      Cuando no se coloca nada en el input (es decir, se buscan todos los elementos)
      Salida: {items: Array(10), meta: {…}, links: {…}}

    - true: Cuando se busca un determinado elemento
      Salida: [{…}]
  */
    const characters = Array.isArray(rawData) ? rawData : rawData.items;

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
