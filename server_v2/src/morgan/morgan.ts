import { Application } from "express";
import morgan from "morgan";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { format_morgan } from "./morgan.setting";

let counter = 0;

export const setupMorgan = (app: Application) => {
  morgan.token("id", function getId(req: any) {
    return req.id;
  });

  morgan.token("date", function (_, _res, tz) {
    return moment()
      .tz(<string>tz)
      .format("YYYY-MM-DD HH:mm:ss.SSS");
  });

  morgan.token("origin", function getOrigin(req: any) {
    return req.requestOrigin;
  });

  app.use((req: any, _, next) => {
    counter++; // Increment the counter
    req.id = `${counter}-${uuidv4()}`; // Prepend the counter to the unique ID
    req.requestOrigin = req.headers.origin || req.headers.referer; // Retrieves the request origin from headers
    next(); // Passes control to the next middleware
  });

  app.use(morgan(format_morgan));
};
