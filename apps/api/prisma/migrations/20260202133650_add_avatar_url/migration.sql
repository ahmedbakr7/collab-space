/*
  Warnings:

  - You are about to drop the column `slug` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `workspaces` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "organizations_slug_key";

-- DropIndex
DROP INDEX "projects_slug_idx";

-- DropIndex
DROP INDEX "projects_workspace_id_slug_key";

-- DropIndex
DROP INDEX "workspaces_org_id_slug_key";

-- DropIndex
DROP INDEX "workspaces_slug_idx";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT;

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "slug";
