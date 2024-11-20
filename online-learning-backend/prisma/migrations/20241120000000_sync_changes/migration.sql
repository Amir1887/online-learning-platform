-- This migration file synchronizes the database schema with the expected Prisma schema.

-- 1. Change the Assignment table
ALTER TABLE "Assignment"
DROP COLUMN "content",
ADD COLUMN "assignments" JSON DEFAULT '[]',
ADD COLUMN "lessonId" INT;

ALTER TABLE "Assignment"
ADD CONSTRAINT "fk_lesson"
FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION;

-- 2. Change the Author table
ALTER TABLE "Author"
ADD COLUMN "email" VARCHAR;

-- 3. Change the Enrollment table
ALTER TABLE "Enrollment"
ADD COLUMN "paymentmethod" VARCHAR,
ADD COLUMN "paymentstate" VARCHAR;

-- 4. Change the Lesson table
ALTER TABLE "Lesson"
ADD COLUMN "assignments" JSON DEFAULT '[]';

-- 5. Change the Submission table
-- Safely cast content to JSON using a fallback for non-JSON values
ALTER TABLE "Submission"
ALTER COLUMN "content" TYPE JSON
USING CASE
    WHEN jsonb_typeof(content::jsonb) IS NOT NULL THEN content::json
    ELSE 'null'::json
END;

-- 6. Change the User table
ALTER TABLE "User"
ADD COLUMN "authId" VARCHAR(255);
