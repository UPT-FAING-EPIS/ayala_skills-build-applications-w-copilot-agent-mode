import ResourcePage from './ResourcePage';

function Workouts() {
  return (
    <ResourcePage
      componentName="workouts"
      title="Workouts"
      description="Display workout plans in a unified Bootstrap table with search, details, and refresh controls."
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