export interface ILeaderboard {
  users: { place: number; name: string; score: number }[];
}
export const leaderboardData: ILeaderboard = {
  users: [
    { place: 1, name: 'Dingo', score: 1000 },
    { place: 2, name: 'Big BallZ', score: 950 }, /// ЯКИЙ ШЛЮХІН СЮДА Z ДОБАВИВ
    { place: 3, name: 'Sanyocheck', score: 940 },
    { place: 4, name: 'Neitrino Zh', score: 900 },
    { place: 5, name: 'BoyZ lover', score: 880 },
    { place: 6, name: 'Da boy', score: 800 },
    { place: 7, name: 'ebyZBaby', score: 777 },
  ],
};
