import { gte, isNil } from "ramda";

type Maybe<T> = T | null | undefined;

export function getRiskScoreColor(score: Maybe<number>, asBg: boolean = false) {
  if (isNil(score)) return asBg ? "bg-gray-200" : "text-gray-300";
  if (gte(score, 80)) return asBg ? "bg-lime-200" : "text-lime-300";
  if (gte(score, 60)) return asBg ? "bg-blue-300" : "text-blue-300";
  if (gte(score, 40)) return asBg ? "bg-amber-300" : "text-amber-300";
  return asBg ? "bg-red-500" : "text-red-600";
}
