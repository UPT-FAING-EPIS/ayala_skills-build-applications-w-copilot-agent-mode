import ResourcePage from './ResourcePage';

function Teams() {
  return (
    <ResourcePage
      componentName="teams"
      title="Teams"
      description="Manage team records with a consistent Bootstrap table, card shell, search form, and modal."
      apiUrl="https://miniature-capybara-4jqr667jj75wcqxpq-8000.app.github.dev/api/teams"
      columns={[
        { key: 'name', label: 'Team Name' },
        { key: 'members', label: 'Members' },
      ]}
      titleField="name"
      emptyMessage="No teams returned from the API."
    />
  );
}

export default Teams;