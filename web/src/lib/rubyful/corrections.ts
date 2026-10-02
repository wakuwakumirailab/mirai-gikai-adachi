import { READING_ENTRIES, type ReadingEntry } from "./readings";

const FIXED_ATTR = "data-ruby-fixed";

type Unit = {
  node: Node;
  text: string;
  fixed: boolean;
  start: number;
};

/** 親要素の直下にある文字列・ruby を、基底文字の並びとして取り出す */
function collectUnits(parent: Element): Unit[] | null {
  const units: Unit[] = [];
  let offset = 0;
  for (const node of Array.from(parent.childNodes)) {
    let text: string | null = null;
    let fixed = false;
    if (node.nodeType === Node.TEXT_NODE) {
      text = node.textContent ?? "";
    } else if (node instanceof HTMLElement) {
      if (node.hasAttribute(FIXED_ATTR)) {
        text = node.getAttribute(FIXED_ATTR);
        fixed = true;
      } else if (node.tagName === "RUBY") {
        text = Array.from(node.childNodes)
          .filter((n) => !(n instanceof HTMLElement && n.tagName === "RT"))
          .map((n) => n.textContent ?? "")
          .join("");
      }
    }
    if (text === null) {
      // 他の要素は区切りとして扱う（またいで一致させない）
      units.push({ node, text: "\u0000", fixed: true, start: offset });
      offset += 1;
      continue;
    }
    units.push({ node, text, fixed, start: offset });
    offset += text.length;
  }
  return units.length > 0 ? units : null;
}

function buildRuby(text: string, reading: string): HTMLElement {
  const ruby = document.createElement("ruby");
  ruby.setAttribute("aria-label", reading);
  ruby.setAttribute("role", "text");
  ruby.append(text);
  const rt = document.createElement("rt");
  rt.className = "rubyful-rt";
  rt.setAttribute("aria-hidden", "true");
  rt.textContent = reading;
  ruby.append(rt);
  return ruby;
}

function applyToParent(parent: Element, entries: ReadingEntry[]) {
  const units = collectUnits(parent);
  if (!units) return;
  const full = units.map((u) => u.text).join("");

  type Match = { from: number; to: number; entry: ReadingEntry };
  const matches: Match[] = [];
  const taken = new Array<boolean>(full.length).fill(false);
  for (const entry of entries) {
    let idx = full.indexOf(entry.surface);
    while (idx !== -1) {
      const end = idx + entry.surface.length;
      if (!taken.slice(idx, end).some(Boolean)) {
        matches.push({ from: idx, to: end, entry });
        for (let i = idx; i < end; i++) taken[i] = true;
      }
      idx = full.indexOf(entry.surface, idx + 1);
    }
  }
  if (matches.length === 0) return;
  matches.sort((a, b) => b.from - a.from); // 後ろから置き換える

  for (const { from, to, entry } of matches) {
    const overlapped = units.filter(
      (u) => u.start < to && u.start + u.text.length > from
    );
    if (overlapped.length === 0) continue;
    if (overlapped.some((u) => u.fixed)) continue; // 置き換え済み・区切りを含む
    const first = overlapped[0];
    const last = overlapped[overlapped.length - 1];
    const regionStart = first.start;
    const regionEnd = last.start + last.text.length;
    const regionText = full.slice(regionStart, regionEnd);

    const wrapper = document.createElement("span");
    wrapper.setAttribute(FIXED_ATTR, entry.surface);
    const pre = regionText.slice(0, from - regionStart);
    const post = regionText.slice(to - regionStart);
    if (pre) wrapper.append(pre);
    for (const part of entry.parts) {
      wrapper.append(
        part.reading ? buildRuby(part.text, part.reading) : part.text
      );
    }
    if (post) wrapper.append(post);

    first.node.parentNode?.insertBefore(wrapper, first.node);
    for (const u of overlapped) u.node.parentNode?.removeChild(u.node);
  }
}

/** data-no-ruby の付いた要素の中のふりがなを外す（区の職員名など） */
function removeRubyInNoRubyElements(root: ParentNode) {
  root.querySelectorAll("[data-no-ruby] ruby").forEach((ruby) => {
    const base = Array.from(ruby.childNodes)
      .filter((n) => !(n instanceof HTMLElement && n.tagName === "RT"))
      .map((n) => n.textContent ?? "")
      .join("");
    ruby.replaceWith(document.createTextNode(base));
  });
}

/** Rubyful が付けたふりがなのうち、辞書にある語だけ読みを上書きする */
export function applyReadingCorrections(root: ParentNode = document) {
  removeRubyInNoRubyElements(root);
  const parents = new Set<Element>();
  root.querySelectorAll("main ruby").forEach((ruby) => {
    if (ruby.parentElement && !ruby.parentElement.hasAttribute(FIXED_ATTR)) {
      parents.add(ruby.parentElement);
    }
  });
  for (const parent of parents) {
    applyToParent(parent, READING_ENTRIES);
  }
}
