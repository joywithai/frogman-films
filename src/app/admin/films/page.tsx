import { getFilms } from "@/server/queries/films";
import Link from "next/link";
import { Film, Plus, Edit, Eye, Video } from "lucide-react";

export default async function AdminFilmsPage() {
  const films = await getFilms();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] flex justify-between items-center">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            ARCHIVE RELEASES
          </span>
          <h1 className="font-display text-2xl text-[var(--color-text)] mt-0.5">
            Manage Film Releases
          </h1>
        </div>
        <button
          type="button"
          className="px-3.5 py-2 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold flex items-center gap-1.5 hover:bg-white"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Film</span>
        </button>
      </div>

      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono-archive">
          <thead>
            <tr className="border-b border-[#1c1c20] text-[var(--color-text-dim)]">
              <th className="py-2.5">ARCHIVE ID</th>
              <th className="py-2.5">TITLE</th>
              <th className="py-2.5">YEAR</th>
              <th className="py-2.5">RUNTIME</th>
              <th className="py-2.5">PROVIDER</th>
              <th className="py-2.5">STATUS</th>
              <th className="py-2.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1c1c20]">
            {films.map((f) => (
              <tr key={f.id} className="hover:bg-[#14151a]">
                <td className="py-3 font-semibold text-[#ece7d5]">{f.archiveId}</td>
                <td className="py-3 text-[var(--color-text)]">{f.title}</td>
                <td className="py-3 text-[var(--color-text-dim)]">{f.releaseYear}</td>
                <td className="py-3 text-[var(--color-text-dim)]">{f.runtimeMins} mins</td>
                <td className="py-3 text-amber-300">
                  {f.videoAsset?.provider || "unconfigured"}
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded bg-[#18191f] text-[var(--color-text-muted)] border border-[#24252a] text-[10px]">
                    {f.isPublic ? "PUBLIC ARCHIVE" : "RESTRICTED"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <Link
                    href={`/films/${f.slug}`}
                    className="text-[var(--color-text-dim)] hover:text-[#ece7d5] inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Reel</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
