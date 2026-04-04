import ResourcePage from './ResourcePage';

function Users() {
  return (
    <ResourcePage
      componentName="users"
      title="Users"
      description="Review user profiles, search by name or email, and inspect details in a Bootstrap modal."
      apiUrl="https://miniature-capybara-4jqr667jj75wcqxpq-8000.app.github.dev/api/users/"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
      ]}
      titleField="name"
      emptyMessage="No users returned from the API."
    />
  );
}

export default Users;