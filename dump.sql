PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "PaperSheets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO PaperSheets VALUES(1,'12312',232);
INSERT INTO PaperSheets VALUES(2,'asdasd',0);
INSERT INTO PaperSheets VALUES(6,'asdasd',0);
INSERT INTO PaperSheets VALUES(7,'asdasd',0);
CREATE TABLE IF NOT EXISTS "Laminations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO Laminations VALUES(1,'ASDAS',2323);
CREATE TABLE IF NOT EXISTS "Proposal" (
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
    "subTotal" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Proposal_selectedPaper_fkey" FOREIGN KEY ("selectedPaper") REFERENCES "PaperSheets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_lamination_fkey" FOREIGN KEY ("lamination") REFERENCES "Laminations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Proposal VALUES(1,'ASD',2,2,2,2,1,232,2,2323,1,2,1,23,23,8368,8414,1761511148896);
INSERT INTO Proposal VALUES(2,'ASD',2,2,2,2,1,232,2,2323,1,2,1,23,23,8368,8414,1761511157359);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('PaperSheets',8);
INSERT INTO sqlite_sequence VALUES('Laminations',8);
INSERT INTO sqlite_sequence VALUES('Proposal',2);
COMMIT;
