export const SERVICE_ENV = process.env.NODE_ENV ?? 'development';
export const SERVICE_PORT = process.env.SERVICE_PORT ? Number.parseInt(process.env.SERVICE_PORT) : 3998;
export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN ?? 'secret';

export const ROLES_KEY = 'role';