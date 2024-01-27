"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format_morgan = void 0;
//Example: [1] c9uzb_V76qrKkV0EB6Zo0 - ::1 GET /api/v1/docs/favicon-32x32.png 304 3.050 ms - - 2023-12-09 17:02:13.971
//id-unique id , origin - origin of the request , remote-addr - IP address of the client , method - HTTP method ,
// url - URL of the request , status - HTTP status code , response-time - Time taken to respond in milliseconds ,
// res[content-length] - Content length of the response , date - Date and time of the request
exports.format_morgan = ":id :origin :remote-addr :method :url :status :response-time ms - :res[content-length] :date[Asia/Kolkata]";
