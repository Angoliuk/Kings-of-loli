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
  } = api.stats.getUsers.useQuery({});
  return (
    <PageWrapper>
      <div className="flex flex-col flex-wrap md:flex-row">
        <ListWrapper
          data={users}
          isError={isError}
          isFetchingMore={isFetchingMore}
          isFirstLoading={isFirstLoading}
          isRefetching={isRefetching}
          error={error?.message}
          listItem={(user) => <UserCard user={user} />}
        />
      </div>
    </PageWrapper>
  );
};

export default UsersStats;
