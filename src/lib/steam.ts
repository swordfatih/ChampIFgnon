export function getSteamImage(id?: string): string | null {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`;
}
