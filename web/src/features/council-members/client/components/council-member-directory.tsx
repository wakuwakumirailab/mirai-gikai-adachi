"use client";

import { Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CouncilMember } from "../../shared/types";
import {
  ALL_COMMITTEES,
  ALL_FACTIONS,
  filterCouncilMembers,
} from "../../shared/utils/filter-council-members";
import { shuffle } from "../../shared/utils/shuffle";

type Props = {
  members: CouncilMember[];
};

export function CouncilMemberDirectory({ members }: Props) {
  // 初期表示はサーバーと同じ並び順にし、マウント後にクライアント側でシャッフルする
  // （SSRとクライアントで乱数結果が食い違うハイドレーションエラーを避けるため）
  const [orderedMembers, setOrderedMembers] = useState(members);
  const [keyword, setKeyword] = useState("");
  const [factionId, setFactionId] = useState<string>(ALL_FACTIONS);
  const [committeeId, setCommitteeId] = useState<string>(ALL_COMMITTEES);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 初回マウント時のみシャッフルしたいため members を依存配列に含めない
  useEffect(() => {
    setOrderedMembers(shuffle(members));
  }, []);

  const factionOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const m of members) {
      if (m.faction) seen.set(m.faction.id, m.faction.display_name);
    }
    return Array.from(seen, ([id, label]) => ({ id, label }));
  }, [members]);

  const committeeOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const m of members) {
      for (const c of m.committees) seen.set(c.id, c.name);
    }
    return Array.from(seen, ([id, label]) => ({ id, label }));
  }, [members]);

  const filteredMembers = useMemo(
    () =>
      filterCouncilMembers(orderedMembers, { keyword, factionId, committeeId }),
    [orderedMembers, keyword, factionId, committeeId]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* 検索・絞り込み */}
      <div className="flex flex-col gap-3 rounded-2xl border border-mirai-border bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mirai-text-muted" />
          <Input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="議員名で検索..."
            className="h-11 border-mirai-border bg-white pl-9 text-base"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select value={factionId} onValueChange={setFactionId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="会派で絞り込み" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_FACTIONS}>すべての会派</SelectItem>
              {factionOptions.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={committeeId} onValueChange={setCommitteeId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="委員会で絞り込み" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_COMMITTEES}>すべての委員会</SelectItem>
              {committeeOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-mirai-text-muted">
        {filteredMembers.length}人 / 全{members.length}人
      </p>

      {/* 議員カード一覧 */}
      {filteredMembers.length === 0 ? (
        <p className="py-12 text-center text-sm text-mirai-text-muted">
          該当する議員が見つかりませんでした。
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filteredMembers.map((member) => (
            <li
              key={member.id}
              className="flex flex-col gap-3 rounded-2xl border border-mirai-border bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mirai-surface-grouped text-mirai-text-muted">
                  <Users className="size-4" />
                </span>
                <span className="font-bold text-mirai-text">{member.name}</span>
              </div>

              {member.faction && (
                <Badge variant="light" className="w-fit">
                  {member.faction.display_name}
                </Badge>
              )}

              {member.committees.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {member.committees.map((c) => (
                    <Badge key={c.id} variant="muted">
                      {c.name}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
