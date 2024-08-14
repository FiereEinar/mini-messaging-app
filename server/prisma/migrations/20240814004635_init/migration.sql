-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "sender" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
