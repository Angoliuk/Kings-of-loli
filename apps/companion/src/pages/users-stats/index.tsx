import { ListWrapper, PageWrapper, UserCard } from 'companion/components';
import { api } from 'companion/utils/api';
import { type NextPage } from 'next';

const UsersStats: NextPage = () => {
  const {
    data: users,
    error,
    isLoading: isFirstLoading,
    isFetching: isFetchingMore,
    isError,
    isRefetching,
  } = api.stats.getUsers.useQuery({ name: '123', scoreLimits: [0, 12_300] });
  return (
    <PageWrapper>
      <ListWrapper
        data={users}
        isError={isError}
        isFetchingMore={isFetchingMore}
        isFirstLoading={isFirstLoading}
        isRefetching={isRefetching}
        error={error?.message}
        listItem={(user) => <UserCard user={user} />}
      />
    </PageWrapper>
  );
};

export default UsersStats;
