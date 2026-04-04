import ResourcePage from './ResourcePage';

function Leaderboard() {
  return (
    <ResourcePage
      componentName="leaderboard"
      title="Leaderboard"
      description="Compare members using the same Bootstrap table and modal pattern across all frontend views."
      apiUrl="https://miniature-capybara-4jqr667jj75wcqxpq-8000.app.github.dev/api/leaderboard"
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