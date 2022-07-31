import prisma from "../src/global/prisma.instance";

async function main() {
  await prisma.document.findMany().then((res) => {
    console.log(res);
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((ex) => {
    prisma.$disconnect();
    throw ex;
  });
