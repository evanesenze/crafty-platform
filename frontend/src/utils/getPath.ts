import { clientRoutes } from "config";
import { generatePath } from "react-router-dom";


export const getPath = (key: keyof typeof clientRoutes, params?: {}) => {
    // return generatePath(clientRoutes[key], params);
}