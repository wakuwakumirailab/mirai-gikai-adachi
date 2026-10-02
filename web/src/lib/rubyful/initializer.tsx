"use client";

import Script from "next/script";
import { applyReadingCorrections } from "./corrections";
import { rubyfulClient } from "./index";
import "./styles.css";

declare global {
  interface Window {
    RubyfulV2?: {
      init: (config: {
        selector: string;
        defaultDisplay: boolean;
        observeChanges?: boolean;
        styles?: object;
      }) => void;
    };
  }
}

/**
 * flex / grid コンテナ直下の文字列を <span> で包む。
 * Rubyful は文字列を <ruby> 要素に置き換えるため、そのままだと flex 子要素が
 * 単語ごとにバラバラに並んで文字が崩れる。ふりがなを付ける前に包んでおく。
 */
function wrapFlexTextNodes(root: ParentNode) {
  const containers = root.querySelectorAll<HTMLElement>("main *");
  containers.forEach((el) => {
    if (el.closest("ruby, rt")) return;
    const display = getComputedStyle(el).display;
    if (!/flex|grid/.test(display)) return;
    for (const node of Array.from(el.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const span = document.createElement("span");
        node.replaceWith(span);
        span.appendChild(node);
      }
    }
  });
}

export function RubyfulInitializer() {
  return (
    <Script
      src="https://rubyful-v2.s3.ap-northeast-1.amazonaws.com/v2/rubyful.js?t=20250507022654"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.RubyfulV2) {
          const isEnabled = rubyfulClient.getIsEnabledFromStorage();
          if (!isEnabled) return;
          wrapFlexTextNodes(document);
          // 画面遷移や再描画で増えた文字列も、Rubyful より先に包む
          let scheduled = false;
          new MutationObserver(() => {
            if (scheduled) return;
            scheduled = true;
            // 非表示タブでも止まらないよう rAF ではなく setTimeout を使う
            setTimeout(() => {
              scheduled = false;
              wrapFlexTextNodes(document);
              // Rubyful の読み間違いを辞書で直す（議員名など）
              applyReadingCorrections(document);
            }, 100);
          }).observe(document.body, { childList: true, subtree: true });
          // Rubyful V2を初期化
          window.RubyfulV2.init({
            selector:
              "main p, main h1, main h2, main h3, main h4, main h5, main h6, main li, main td, main th, main span, main a",
            defaultDisplay: true,
            observeChanges: true,
            styles: {
              toggleButtonClass: "ruby-button",
            },
          });
        }
      }}
    />
  );
}
