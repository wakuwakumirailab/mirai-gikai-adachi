import "server-only";
import {
  ANSWER_BUBBLE,
  QUESTION_BUBBLE,
  QUESTION_SPEAKER_LABEL,
} from "../../shared/utils/bubble-styles";

type SpeakerTurn = {
  speaker: string;
  text: string;
};

function parseSpeakerTurns(rawText: string): SpeakerTurn[] {
  const turns: SpeakerTurn[] = [];
  // Split on ◯ which marks each speaker change; filter blanks
  const segments = rawText.split("◯").filter((s) => s.trim().length > 0);

  for (const seg of segments) {
    const newlineIdx = seg.search(/[\s　]/);
    if (newlineIdx === -1) {
      turns.push({ speaker: seg.trim(), text: "" });
      continue;
    }
    const speaker = seg.slice(0, newlineIdx).trim();
    const text = seg.slice(newlineIdx).trim();
    // Skip 議長 lines (procedural calls only, not substantive content)
    if (speaker.includes("議長")) continue;
    turns.push({ speaker, text });
  }
  return turns;
}

function isQuestioner(speaker: string): boolean {
  // Questioner lines have a seat number pattern like ◯58番（山田ゆみこ）
  return /^\d+番/.test(speaker);
}

export function RawTranscriptView({ rawText }: { rawText: string }) {
  const turns = parseSpeakerTurns(rawText);

  return (
    <div className="flex flex-col gap-4">
      {turns.map((turn, i) => {
        const isQ = isQuestioner(turn.speaker);
        return (
          <div
            key={`${i}-${turn.speaker}`}
            className={isQ ? "flex justify-end" : "flex"}
          >
            <div
              className={`max-w-[85%] ${isQ ? QUESTION_BUBBLE : ANSWER_BUBBLE}`}
            >
              <p
                className={`mb-1 text-xs font-medium ${
                  isQ ? QUESTION_SPEAKER_LABEL : "text-mirai-text-secondary"
                }`}
              >
                {turn.speaker}
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {turn.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
