-- CreateTable
CREATE TABLE "PaperSheets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Laminations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "bladeWidth" INTEGER NOT NULL,
    "bladeLength" INTEGER NOT NULL,
    "machineRatio" INTEGER NOT NULL,
    "numOfPieces" INTEGER NOT NULL,
    "selectedPaper" INTEGER NOT NULL,
    "paperSheetPriceAtProposal" INTEGER,
    "printingPrice" INTEGER NOT NULL,
    "laminationPriceAtProposal" INTEGER,
    "lamination" INTEGER NOT NULL,
    "cuttingPrice" INTEGER NOT NULL,
    "gluingPrice" INTEGER NOT NULL,
    "bladePrice" INTEGER NOT NULL,
    "shipping" INTEGER NOT NULL,
    CONSTRAINT "Proposal_selectedPaper_fkey" FOREIGN KEY ("selectedPaper") REFERENCES "PaperSheets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_lamination_fkey" FOREIGN KEY ("lamination") REFERENCES "Laminations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
