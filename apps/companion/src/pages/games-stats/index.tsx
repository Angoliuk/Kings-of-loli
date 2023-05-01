import { GameCard, ListWrapper, PageWrapper } from 'companion/components';
import { api } from 'companion/utils/api';
import { type NextPage } from 'next';

const GamesStats: NextPage = () => {
  const {
    data: games,
    error,
    isLoading: isFirstLoading,
    isFetching: isFetchingMore,
    isError,
    isRefetching,
  } = api.stats.getGamesStats.useQuery({});
  return (
    <PageWrapper>
      <ListWrapper
        data={games}
        isError={isError}
        isFetchingMore={isFetchingMore}
        isFirstLoading={isFirstLoading}
        isRefetching={isRefetching}
        error={error?.message}
        listItem={(game) => <GameCard game={game} />}
      />
    </PageWrapper>
  );
};

export default GamesStats;
