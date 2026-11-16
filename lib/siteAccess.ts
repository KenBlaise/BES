export const SITE_ACCESS_COOKIE = "bes-access";
export const SITE_ACCESS_PASSWORD = "Tyra200!";

export function passwordMatches(input: string) {
  const expected = SITE_ACCESS_PASSWORD;
  if (input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function accessToken() {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SITE_ACCESS_PASSWORD),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode("bes-site-access"),
  );
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
