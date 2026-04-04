import ResourcePage from './ResourcePage';

function Leaderboard() {
  return (
    <ResourcePage
      componentName="leaderboard"
      title="Leaderboard"
      description="Compare members using the same Bootstrap table and modal pattern across all frontend views."
      columns={[
        { key: 'user', label: 'User' },
        { key: 'points', label: 'Points' },
      ]}
      titleField="user"
      emptyMessage="No leaderboard entries returned from the API."
    />
  );
}

export default Leaderboard;