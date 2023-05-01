import { type RouterOutputs } from 'companion/utils/api';
// import { useRouter } from "next/router";
import { type FC } from 'react';
type UserCardProps = {
  user: RouterOutputs['stats']['getUsers'][number];
};
export const UserCard: FC<UserCardProps> = ({}) => {
  // const {
  //   query: { userId },
  //   push,
  // } = useRouter();
  // console.log(userId);
  // if (!userId || Array.isArray(userId)) {
  //   void push("/users-games");
  //   return null;
  // }
  // const a = userId;
  // const {} = api.stats.getUserGamesStats.useQuery();
  // const {} = api.stats.getUserGamesDuration.useQuery();
  // const {} = api.stats.getUserLongestAndShortestGames.useQuery();
  // const {} = api.stats.getUserRatio.useQuery({ userId });
  return <div></div>;
};
