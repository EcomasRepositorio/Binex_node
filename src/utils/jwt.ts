import jwt from "jsonwebtoken";
import createError from 'http-errors';
import * as dotenv from "dotenv";
import { Payload } from "./format.server";

dotenv.config();

const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new Error("ACCESS_TOKEN_SECRET");
}

interface SignAccessTokenPayload {
  payload: Payload; // Puedes ajustar el tipo de payload según tus necesidades
}

export const signAccessToken = (payload: SignAccessTokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret as string, {}, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token as string);
    });
  });
};

export const verifyAccessToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret as string, (err, payload) => {
      if (err) {
        const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return reject(createError.Unauthorized(message));
      }
      resolve(payload);
    });
  });
};

