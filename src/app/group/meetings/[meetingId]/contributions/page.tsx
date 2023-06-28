import { MeetingContribution } from "@/types/meetings";
import ContributionsList from "@/app/group/meetings/[meetingId]/contributions/ContributionsList";

const mockData = [
  {
    memberId: 3,
    amount: 1500,
    memberName: " Lewis Ndungu",
  },
  {
    memberId: 2,
    amount: 1500,
    memberName: " Lewis Ndungu",
  },
  {
    memberId: 4,
    amount: 1500,
    memberName: " Lewis Ndungu",
  },
  {
    memberId: 1,
    amount: 1500,
    memberName: " Lewis Ndungu",
  },
  {
    memberId: 5,
    amount: 1500,
    memberName: " Lewis Ndungu",
  },
] satisfies MeetingContribution[];

type Props = {
  params: {
    meetingId: number;
  };
};

const getContributions = async (): Promise<MeetingContribution[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));
};

export default async function Page({ params: { meetingId } }: Props) {
  const contributions = await getContributions();

  return <ContributionsList contributions={contributions} />;
}
