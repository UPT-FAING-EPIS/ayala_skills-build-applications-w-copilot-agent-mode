import ResourcePage from './ResourcePage';

function Workouts() {
  return (
    <ResourcePage
      componentName="workouts"
      title="Workouts"
      description="Display workout plans in a unified Bootstrap table with search, details, and refresh controls."
      apiUrl="https://miniature-capybara-4jqr667jj75wcqxpq-8000.app.github.dev/api/workouts/"
      columns={[
        { key: 'name', label: 'Workout Name' },
        { key: 'difficulty', label: 'Difficulty' },
      ]}
      titleField="name"
      emptyMessage="No workouts returned from the API."
    />
  );
}

export default Workouts;