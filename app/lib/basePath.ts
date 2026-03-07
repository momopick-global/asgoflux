/** GitHub Pages 등 서브경로 배포 시 사용. 로컬/Cloudflare에서는 빈 문자열 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
