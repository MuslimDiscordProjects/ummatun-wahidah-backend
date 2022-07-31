import prisma from "../src/global/prisma.instance";

async function main() {
  await prisma.document
    .create({
      data: {
        name: "test",
        filetype: "pdf",
      },
    })
    .then((res) => {
      console.log("success");
    })
    .catch((ex) => {
      throw ex;
    });
}

main()
  .then(() => prisma.$disconnect())
  .catch((ex) => {
    prisma.$disconnect();
    throw ex;
  });
