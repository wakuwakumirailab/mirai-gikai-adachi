"use client";

import { Check, Link2 } from "lucide-react";
import type { MouseEvent, KeyboardEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  copyShareUrl,
  shareNative,
  shareOnFacebook,
  shareOnLine,
  shareOnNote,
  shareOnThreads,
  shareOnTwitter,
} from "@/features/bills/client/utils/share-handlers";

interface BillShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareMessage: string;
  shareUrl: string;
  thumbnailUrl?: string | null;
}

export function BillShareModal({
  isOpen,
  onClose,
  shareMessage,
  shareUrl,
  thumbnailUrl,
}: BillShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const ok = await copyShareUrl(shareUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 共有ボタンの設定（PC: X, Facebook, note, Threads, リンクコピー / スマホ: X, LINE, note, Threads, 共有）
  const shareButtons = [
    {
      name: "X (Twitter)",
      iconPath: "/icons/sns/icon_x.png",
      onClick: () => shareOnTwitter(shareMessage, shareUrl),
    },
    {
      name: "Facebook",
      iconPath: "/icons/sns/icon_facebook.png",
      onClick: () => shareOnFacebook(shareUrl),
      className: "hidden md:inline-flex",
    },
    {
      name: "LINE",
      iconPath: "/icons/sns/icon_line.png",
      onClick: () => shareOnLine(shareMessage, shareUrl),
      className: "md:hidden",
    },
    {
      name: "note",
      iconPath: "/icons/sns/icon_note.png",
      onClick: () => shareOnNote(shareUrl),
    },
    {
      name: "Threads",
      iconPath: "/icons/sns/icon_threads.png",
      onClick: () => shareOnThreads(shareMessage, shareUrl),
    },
    {
      name: "共有",
      iconPath: "/icons/share-general.png",
      onClick: () => shareNative(shareMessage, shareUrl),
      className: "md:hidden",
    },
  ];

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    // 背景クリック時のみモーダルを閉じる
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackgroundKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Escapeキーでモーダルを閉じる
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-3"
      onClick={handleBackgroundClick}
      onKeyDown={handleBackgroundKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-2xl p-7 w-[370px] max-w-full flex flex-col items-center gap-9">
        {/* タイトル */}
        <h2 className="text-xl font-bold text-gray-800 text-center w-full">
          記事を共有する
        </h2>

        {/* サムネイル画像エリア */}
        {thumbnailUrl && (
          <div className="w-full h-[180px] relative rounded-md overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt="記事のサムネイル"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* シェアセクション */}
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-base font-bold text-gray-800 text-center">
            シェアして区議会の議論をオープンに
          </p>

          {/* SNSアイコン */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {shareButtons.map((button) => (
              <Button
                key={button.name}
                type="button"
                variant="ghost"
                onClick={button.onClick}
                className={`w-12 h-12 p-0 hover:bg-transparent ${
                  button.className || ""
                }`}
              >
                <Image
                  src={button.iconPath}
                  alt={button.name}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={handleCopy}
              aria-label="URLをコピー"
              className={`hidden md:inline-flex w-12 h-12 p-0 rounded-full border-2 ${
                copied
                  ? "border-green-600 bg-green-600 text-white hover:bg-green-600 hover:text-white"
                  : "border-gray-800 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              {copied ? (
                <Check className="size-6" />
              ) : (
                <Link2 className="size-6" />
              )}
            </Button>
          </div>
          <p className="h-4 text-xs text-gray-600" aria-live="polite">
            {copied ? "URLをコピーしました" : ""}
          </p>
        </div>

        {/* 閉じるボタン */}
        <Button
          type="button"
          onClick={onClose}
          className="w-[287px] max-w-full h-auto rounded-full px-6 py-3 font-bold text-base bg-mirai-gradient text-gray-800 border border-gray-800"
        >
          このまま閉じる
        </Button>
      </div>
    </div>
  );
}
