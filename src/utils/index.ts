import startCase from "lodash/startCase";

export const getTemplate = (model: { name: string }) => {
    const nameStartCase = startCase(model.name);
    const nameLowerCase = model.name.toLowerCase();
  
    return `import type { User, ${nameStartCase} } from "@prisma/client";

import { prisma } from "~/db.server";

export function get${nameStartCase}({
    id,
    userId,
}: Pick<${nameStartCase}, "id"> & {
    userId: User["id"];
}) {
    return prisma.${nameLowerCase}.findFirst({
        select: { id: true, body: true, title: true },
        where: { id, userId },
    });
}

export function getAll${nameStartCase}s({ userId }: { userId: User["id"] }) {
    return prisma.${nameLowerCase}.findMany({
        where: { userId },
        select: { id: true, title: true },
        orderBy: { updatedAt: "desc" },
    });
}

export function create${nameStartCase}({
    body,
    title,
    userId,
}: Pick<${nameStartCase}, "body" | "title"> & {
    userId: User["id"];
}) {
    return prisma.note.create({
        data: {
            title,
            body,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}

export function delete${nameStartCase}({
    id,
    userId,
}: Pick<${nameStartCase}, "id"> & { userId: User["id"] }) {
    return prisma.${nameLowerCase}.deleteMany({
        where: { id, userId },
    });
}
`;
};