import { type NextPage } from 'next';

const Home: NextPage = () => {
  // get user works (search by name, score + pagination, returns array of users)
  // const { data } = api.stats.getUsers.useQuery({
  //   name: "1",
  //   scoreLimits: [0, 1000],
  //   sortBy: {
  //     field: "name",
  //     order: SortOrder.DESC,
  //   },
  // });
  // const userId = data ? data[0]?.id : undefined;
  // avg and sum duration work (returns avg and sum in sec)
  // const { data: gameDuration } = api.stats.getUserGamesDuration.useQuery(
  //   {
  //     userId,
  //   },
  //   { enabled: !!userId }
  // );
  // longest and shortest games works (returns inner join for UserMatch + Match => array with 2 games)
  // const { data: longShort } = api.stats.getGamesStats.useQuery(
  //   {},
  //   { enabled: !!userId }
  // );
  // ratio works (returns wins, loses, total)
  // const { data: ratio } = api.stats.getUserRatio.useQuery(
  //   {
  //     userId,
  //   },
  //   { enabled: !!userId }
  // );
  //
  // const { data: longShort } = api.stats.getUserGamesStats.useQuery(
  //   {
  //     userId,
  //   },
  //   { enabled: !!userId }
  // );
  return <p className="container">{'wait'}</p>;
};

export default Home;
