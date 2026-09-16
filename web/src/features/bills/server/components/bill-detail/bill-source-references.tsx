import { ExternalLink } from "lucide-react";

type SourceReference = { label: string; url: string };

interface BillSourceReferencesProps {
  sourceReferences: unknown;
}

function isSourceReference(value: unknown): value is SourceReference {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as SourceReference).label === "string" &&
    typeof (value as SourceReference).url === "string"
  );
}

export function BillSourceReferences({
  sourceReferences,
}: BillSourceReferencesProps) {
  const refs = Array.isArray(sourceReferences)
    ? sourceReferences.filter(isSourceReference)
    : [];

  if (refs.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="text-lg font-bold text-mirai-text mb-3">
        参考にした会議録
      </h2>
      <ul className="flex flex-col gap-2">
        {refs.map((ref) => (
          <li key={ref.url}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary-accent hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              {ref.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
