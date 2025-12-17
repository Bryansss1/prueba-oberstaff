// Cliente Prisma compartido para evitar múltiples instancias
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
