-- CreateTable
CREATE TABLE "public"."MedicalHistory" (
    "historyId" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("historyId")
);

-- CreateTable
CREATE TABLE "public"."ClinicalEntry" (
    "entryId" SERIAL NOT NULL,
    "historyId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "reasonForVisit" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "notes" TEXT,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "ClinicalEntry_pkey" PRIMARY KEY ("entryId")
);

-- CreateTable
CREATE TABLE "public"."ClinicalDocument" (
    "documentId" SERIAL NOT NULL,
    "entryId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "ClinicalDocument_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "public"."Antecedent" (
    "antecedentId" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "historyId" INTEGER NOT NULL,

    CONSTRAINT "Antecedent_pkey" PRIMARY KEY ("antecedentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalHistory_patientId_key" ON "public"."MedicalHistory"("patientId");

-- AddForeignKey
ALTER TABLE "public"."ClinicalEntry" ADD CONSTRAINT "ClinicalEntry_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "public"."MedicalHistory"("historyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClinicalDocument" ADD CONSTRAINT "ClinicalDocument_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "public"."ClinicalEntry"("entryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Antecedent" ADD CONSTRAINT "Antecedent_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "public"."MedicalHistory"("historyId") ON DELETE RESTRICT ON UPDATE CASCADE;
