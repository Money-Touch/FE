export function loadImages(): Record<string, string> {
  const imageImport = import.meta.glob('../../assets/images/footer/*.png', {
    eager: true,
  }) as Record<string, { default: string }>;

  return Object.keys(imageImport).reduce(
    (acc, key) => {
      const path = key
        .replace('../../assets/images/footer/', '')
        .replace('.png', '');
      acc[path] = imageImport[key].default;
      return acc;
    },
    {} as Record<string, string>,
  );
}
