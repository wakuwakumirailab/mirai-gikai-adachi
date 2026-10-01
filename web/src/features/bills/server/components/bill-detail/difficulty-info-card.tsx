import Image from "next/image";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { DifficultySelector } from "@/features/bill-difficulty/client/components/difficulty-selector";

export async function DifficultyInfoCard() {
  const level = await getDifficultyLevel();
  return (
    <div className="rounded-xl bg-white p-6 my-10 flex flex-col gap-4">
      <p className="text-base font-medium leading-[1.875em] text-gray-800">
        説明の詳しさを
        <br className="pc:hidden" />
        いつでも切り替えられます
      </p>
      <div className="flex items-center gap-3">
        <Image
          src="/images/difficulty-icon-detail.png"
          alt=""
          width={290}
          height={235}
          className="h-12 w-auto object-contain"
        />
        <DifficultySelector
          currentLevel={level}
          label="説明をもっと詳しく"
          labelStyle={{ fontSize: "16px" }}
          className="flex items-center gap-4"
          maintainScrollFromBottom
        />
      </div>
    </div>
  );
}
