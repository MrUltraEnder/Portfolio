export const basePath = ''

/** @param {string} assetPath */
export function publicAsset(assetPath) {
  return `${basePath}${assetPath}`
}
