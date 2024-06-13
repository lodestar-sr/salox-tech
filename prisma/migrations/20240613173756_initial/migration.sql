-- CreateTable
CREATE TABLE "call_histories" (
    "id" TEXT NOT NULL,
    "agent" VARCHAR(200) NOT NULL,
    "uuid" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "recordingFile" TEXT,

    CONSTRAINT "call_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_histories" (
    "page" INTEGER NOT NULL,
    "imported" BOOLEAN NOT NULL,

    CONSTRAINT "import_histories_pkey" PRIMARY KEY ("page")
);

-- CreateIndex
CREATE INDEX "call_histories_agent_idx" ON "call_histories"("agent");
