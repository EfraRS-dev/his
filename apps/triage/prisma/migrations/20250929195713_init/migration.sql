-- CreateTable
CREATE TABLE "public"."Triage" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "nurseId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "urgencyLevel" SMALLINT NOT NULL,
    "initialObservations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Triage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VitalSigns" (
    "id" SERIAL NOT NULL,
    "triageId" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "bloodPressure" TEXT NOT NULL,
    "heartRate" INTEGER NOT NULL,
    "respiratoryRate" INTEGER NOT NULL,
    "oxygenSaturation" INTEGER NOT NULL,
    "additionalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VitalSigns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Triage_patientId_idx" ON "public"."Triage"("patientId");

-- CreateIndex
CREATE INDEX "Triage_nurseId_idx" ON "public"."Triage"("nurseId");

-- CreateIndex
CREATE INDEX "VitalSigns_triageId_idx" ON "public"."VitalSigns"("triageId");

-- AddForeignKey
ALTER TABLE "public"."VitalSigns" ADD CONSTRAINT "VitalSigns_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "public"."Triage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
