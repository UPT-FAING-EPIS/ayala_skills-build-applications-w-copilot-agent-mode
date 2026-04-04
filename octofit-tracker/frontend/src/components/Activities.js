import ResourcePage from './ResourcePage';

function Activities() {
  return (
    <ResourcePage
      componentName="activities"
      title="Activities"
      description="Track logged activities from the backend REST API with a consistent Bootstrap table layout."
      apiUrl="https://miniature-capybara-4jqr667jj75wcqxpq-8000.app.github.dev/api/activities/"
      columns={[
        { key: 'user', label: 'User' },
        { key: 'activity', label: 'Activity' },
        { key: 'duration', label: 'Duration' },
      ]}
      titleField="activity"
      emptyMessage="No activities returned from the API."
    />
  );
}

export default Activities;