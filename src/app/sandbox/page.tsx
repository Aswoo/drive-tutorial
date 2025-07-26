import { eq } from "drizzle-orm";
import { mockFiles, mockFolders } from "~/lib/mock";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default async function Sandbox() {
  return (
    <div>
      <form
        action={async () => {
          "use server";

          await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              ownerId: "user1",
              name: folder.name,
              parent: index === 0 ? null : index,
            })),
          );
          await db.insert(files_table).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              ownerId: "user1",
              name: file.name,
              size: 50000,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );
        }}
      >
        <button type="submit">Create file</button>
      </form>
    </div>
  );
}
