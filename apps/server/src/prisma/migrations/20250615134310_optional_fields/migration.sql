-- AlterTable
ALTER TABLE "List" ALTER COLUMN "position" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL;
