import cors from "cors";

//allow any web can use the endpoint
export const corsMiddleware = cors({
  origin: (_origin, callback) => {
    callback(null, true);
  },
});
