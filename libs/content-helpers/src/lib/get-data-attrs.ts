export function getDataAttrs(props: Record<string, any> = {}): Record<string, any> {
  return Object.entries(props).reduce((dataAttrs, [key, value]) => {
    if (key.startsWith('data-')) {
      dataAttrs[key] = value;
    }
    return dataAttrs;
  }, {} as Record<string, any>);
}
