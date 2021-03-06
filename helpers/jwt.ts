import {
  Jose,
  Payload,
  makeJwt,
  setExpiration,
} from "https://deno.land/x/djwt/create.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { config } from "./../config/config.ts";

const {
  JWT_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXP,
  JWT_REFRESH_TOKEN_EXP,
} = config;

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const getAuthToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    exp: setExpiration(new Date().getTime() + parseInt(JWT_ACCESS_TOKEN_EXP)),
  };

  return makeJwt({ header, payload, key: JWT_TOKEN_SECRET });
};

const getRefreshToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    exp: setExpiration(new Date().getTime() + parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  return makeJwt({ header, payload, key: JWT_TOKEN_SECRET });
};

const getJwtPayload = async (token: string): Promise<any | null> => {
  try {
    const jwtObject = await validateJwt(token, JWT_TOKEN_SECRET);
    if (jwtObject && jwtObject.payload) {
      return jwtObject.payload;
    }
  } catch (err) {}
  return null;
};

export { getAuthToken, getRefreshToken, getJwtPayload };
