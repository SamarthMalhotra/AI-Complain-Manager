import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return !exp || exp < Date.now() / 1000 ? true : false;
  } catch {
    return true;
  }
};

export default isTokenExpired;
