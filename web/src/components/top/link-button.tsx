import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface LinkButtonProps {
  href: string;
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  children: ReactNode;
  target?: string;
  rel?: string;
}

export function LinkButton({
  href,
  icon,
  children,
  target,
  rel,
}: LinkButtonProps) {
  // サイト内リンク（"/faq" 等）は同一タブ遷移かつクライアント遷移にする。
  // 外部リンクのみ別タブ（target="_blank"）をデフォルトにする。
  const isInternal = href.startsWith("/");
  const resolvedTarget = target ?? (isInternal ? undefined : "_blank");
  const resolvedRel =
    rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

  const content = (
    <>
      <Image
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className="flex-shrink-0"
      />
      <span className="text-[15px] font-bold">{children}</span>
      <Image
        src="/icons/arrow-right.svg"
        alt=""
        width={16}
        height={15}
        className="flex-shrink-0"
      />
    </>
  );

  return (
    <Button
      asChild
      variant="outline"
      className="w-fit rounded-full px-6 py-3 h-auto"
    >
      {isInternal && !resolvedTarget ? (
        <Link href={href}>{content}</Link>
      ) : (
        <a href={href} target={resolvedTarget} rel={resolvedRel}>
          {content}
        </a>
      )}
    </Button>
  );
}
