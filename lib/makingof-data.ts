// lib/makingof-data.ts

// El tipo ahora es mucho más simple
export type MakingOfItem = {
  id: number;
  src: string;
};

// Creamos un array con las 17 imágenes secuenciales
export const MAKING_OF_ITEMS: MakingOfItem[] = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/bts/s${i + 1}.webp`,
}));