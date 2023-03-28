import { useId } from 'react';
interface imgInputProperties {
  name: string;
  src: string;
  id: string;
}
export const imgInput = (): imgInputProperties[] => {
  return [
    {
      name: 'large_1',
      src: 'resources/img/leaderboard-background/small_1.jpg',
      id: useId(),
    },
    {
      name: 'large_2',
      src: 'resources/img/leaderboard-background/small_2.jpg',
      id: useId(),
    },
    {
      name: 'large_3',
      src: 'resources/img/leaderboard-background/small_3.jpg',
      id: useId(),
    },
    {
      name: 'large_4',
      src: 'resources/img/leaderboard-background/small_4.jpg',
      id: useId(),
    },
  ];
};
