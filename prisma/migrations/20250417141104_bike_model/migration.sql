-- CreateTable
CREATE TABLE "bikes" (
    "bikeId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "bikes_pkey" PRIMARY KEY ("bikeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "bikes_model_key" ON "bikes"("model");
