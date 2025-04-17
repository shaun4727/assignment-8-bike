-- CreateTable
CREATE TABLE "services" (
    "serviceId" TEXT NOT NULL,
    "serviceDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "services_pkey" PRIMARY KEY ("serviceId")
);
