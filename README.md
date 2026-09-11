# Dragon Ball Z API Practice

Aplicación desarrollada con React, TypeScript, Vite, Axios y Tailwind CSS para practicar consumo de una API REST de Dragon Ball, con búsqueda por raza, historial de búsquedas y estado visual de carga/error.

---

## Descripción general

La aplicación permite buscar personajes de Dragon Ball por raza y mostrar una grilla de tarjetas con la información principal, como:

- nombre
- raza
- descripción
- ki
- imagen

La lógica de acceso a la API está centralizada en un servicio dedicado, mientras que el estado y la interacción de la búsqueda se manejan desde un hook personalizado.

---

## Tecnologías

- React 19
- TypeScript
- Vite 8
- Tailwind CSS
- Axios
- PNPM
- ESLint

---

## Estructura del proyecto

```text
01-practice-api--dbz/
├── caps/
├── public/
├── src/
│   ├── api/
│   │   ├── base.axios.ts
│   │   ├── get-characters-by-query.ts
│   │   └── type.api.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Main.tsx
│   │   └── ui/
│   │       ├── Characters.tsx
│   │       ├── PreviousSearch.tsx
│   │       └── SearchBar.tsx
│   ├── hooks/
│   │   └── useCharacter.tsx
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Modelo de datos

El contrato del modelo del lado del cliente se define en `src/api/type.api.ts` y se usa para adaptar la respuesta de la API a una estructura ligera de renderizado:

```ts
export interface DbzProps {
  id: number;
  name: string;
  ki: string;
  race: string;
  image: string;
  description: string;
}
```

La configuración HTTP se crea en `src/api/base.axios.ts`:

```ts
export const DbzApi = axios.create({
  baseURL: "https://dragonball-api.com/api/",
  params: {
    lang: "es",
  },
});
```

Esto permite que la API responda en español y centralice la base URL del proyecto.

---

## Flujo de búsqueda actual

### Servicio y normalización

En `src/api/get-characters-by-query.ts` la búsqueda se ejecuta consultando el endpoint `characters` con el parámetro `race` y un límite de `40` resultados:

```ts
export async function GetCharactersByQuery(query: string): Promise<DbzProps[]> {
  try {
    const response = await DbzApi<DbzCharacter[]>("characters", {
      params: {
        race: query.trim(),
        limit: 40,
      },
    });

    const characters = response.data;

    return characters.length !== 0
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
```

La lógica destaca estos puntos:

- la consulta se envía con el parámetro `race`
- el texto se normaliza con `trim()` para evitar espacios vacíos
- solo se devuelve el subconjunto de propiedades que la interfaz necesita
- el manejo de error se concentra en una sola capa de servicio

### Hook de estado y UX

La lógica de la búsqueda y la restauración de historial se encuentran en `src/hooks/useCharacter.tsx`.

El hook expone:

- `value`: valor del input
- `terms`: historial persistido en localStorage
- `characters`: lista renderizada
- `loading`: estado de carga
- `error`: mensaje de error
- `hasSearched`: distingue primera pantalla inicial de búsqueda sin resultados

Además implementa:

- `runSearch(query)`: ejecuta la petición y almacena resultados en cache con `useRef`
- `handleTerms(term)`: guarda una lista corta de búsquedas recientes
- `handleSubmit(e)`: maneja el envío del formulario
- `handleTermClicked(term)`: repite una búsqueda anterior desde el historial

El historial se persiste en el navegador mediante `localStorage`, y la interfaz reutiliza el mismo hook desde `Main.tsx` para compartir estado entre `SearchBar`, `PreviousSearch` y `Characters`.

---

## UI y diseño

La interfaz usa un estilo oscuro con buscador y tarjetas visuales para los personajes. El componente principal de renderizado es `Characters.tsx`, y maneja los siguientes estados:

- sin búsqueda: `Busca un personaje...`
- carga: `Cargando...`
- error: devuelve el mensaje de error de la API
- sin resultados: `No se encontraron personajes.`
- resultados: lista responsiva de tarjetas con nombre, raza, imagen y ki

El componente `PreviousSearch.tsx` renderiza los términos recientes como botones clicables, permitiendo repetir búsquedas sin volver a escribir.

---

## Instalación

### Requisitos

- Node.js 18+
- PNPM

### Comandos

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en Vite, normalmente en:

```text
http://localhost:5173
```

---

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Esto permite arrancar la app localmente, construir la versión de producción y validar el estilo y calidad del código con ESLint.

## Uso

1. Escribe el nombre de un personaje.
2. Presiona “Buscar”.
3. La app consulta la API y renderiza los resultados en tarjetas.
4. Si ocurre un error, se muestra un mensaje visible en la UI.

---

# Demostracion

<img src="./caps/image-1.png">

<br>

<img src="./caps/image-2.png">

<br>

<img src="./caps/image-3.png">

## Nota

Este proyecto está pensado como práctica de React + TypeScript + consumo de APIs con manejo de estados y validación de tipos.
