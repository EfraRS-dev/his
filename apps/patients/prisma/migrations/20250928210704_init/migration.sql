-- CreateTable
CREATE TABLE "public"."Patient" (
    "patientId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_documentNumber_key" ON "public"."Patient"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_key" ON "public"."Patient"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "public"."Patient"("email");
