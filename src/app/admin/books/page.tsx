import { getBooks } from "@/server/queries/books";
import Link from "next/link";
import { BookOpen, Plus, Eye, Lock } from "lucide-react";

export default async function AdminBooksPage() {
  const books = await getBooks();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] flex justify-between items-center">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            STORYBOOK CATALOGUE
          </span>
          <h1 className="font-display text-2xl text-[var(--color-text)] mt-0.5">
            Manage Folio Editions
          </h1>
        </div>
        <button
          type="button"
          className="px-3.5 py-2 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold flex items-center gap-1.5 hover:bg-white"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Folio Printing</span>
        </button>
      </div>

      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono-archive">
          <thead>
            <tr className="border-b border-[#1c1c20] text-[var(--color-text-dim)]">
              <th className="py-2.5">FOLIO ID</th>
              <th className="py-2.5">TITLE</th>
              <th className="py-2.5">PRICE</th>
              <th className="py-2.5">STOCK</th>
              <th className="py-2.5">FORMAT</th>
              <th className="py-2.5">DIGITAL KEY</th>
              <th className="py-2.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1c1c20]">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-[#14151a]">
                <td className="py-3 font-semibold text-[#ece7d5]">{b.folioId}</td>
                <td className="py-3 text-[var(--color-text)]">{b.title}</td>
                <td className="py-3 text-[#ece7d5]">${(b.priceCents / 100).toFixed(2)}</td>
                <td className="py-3 text-emerald-400">{b.stock} units</td>
                <td className="py-3 text-[var(--color-text-dim)]">{b.format}</td>
                <td className="py-3 text-[var(--color-text-dim)]">
                  {b.privateFile ? (
                    <span className="flex items-center gap-1 text-blue-400 text-[10px]">
                      <Lock className="w-3 h-3" />
                      <span>PROTECTED</span>
                    </span>
                  ) : (
                    "NONE"
                  )}
                </td>
                <td className="py-3 text-right">
                  <Link
                    href={`/stories/${b.slug}`}
                    className="text-[var(--color-text-dim)] hover:text-[#ece7d5] inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Folio</span>
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
