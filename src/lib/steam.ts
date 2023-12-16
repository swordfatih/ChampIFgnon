export function getSteamImage(id?: string): string | null {
  if (!id) {
    return null;
  }

  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`;
}
