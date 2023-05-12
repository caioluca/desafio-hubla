-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "product" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "seller" TEXT NOT NULL
);
