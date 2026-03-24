import { notFound } from "next/navigation";

import { RaceDepositPage } from "@/components/races/race-deposit-page";
import { getRaceMappingById } from "@/lib/races-mapping";

const YEAR = 2027;

export default async function Page({ params }: { params: Promise<{ raceId: string }> }) {
  const { raceId } = await params;
  const race = getRaceMappingById(raceId);
  if (!race) notFound();
  return <RaceDepositPage race={race} year={YEAR} />;
}
