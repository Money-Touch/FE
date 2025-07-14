type EagerImageModule = Record<string, { default: string }>;

const imageGlobs = {
  mypageButton: import.meta.glob('../../assets/images/auth/mypage/*.png', {
    eager: true,
  }),
  footer: import.meta.glob('../../assets/images/footer/*.png', { eager: true }),
} as const;

export function loadImages(
  folder: keyof typeof imageGlobs,
): Record<string, string> {
  const imageImport = imageGlobs[folder] as unknown as EagerImageModule;

  return Object.keys(imageImport).reduce(
    (acc, key) => {
      const path = key.split('/').pop()!.replace('.png', '');
      acc[path] = imageImport[key].default;
      return acc;
    },
    {} as Record<string, string>,
  );
}
