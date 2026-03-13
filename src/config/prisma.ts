// Cliente Prisma compartido para evitar múltiples instancias
import { PrismaClient } from "../database/prisma/generated/index.js";

export const prisma = new PrismaClient();
