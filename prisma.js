import { PrismaClient } from "@prisma/client";

// We initialize the client once and export it
const prisma = new PrismaClient();

export default prisma;
