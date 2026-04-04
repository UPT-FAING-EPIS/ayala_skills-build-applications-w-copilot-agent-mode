import ResourcePage from './ResourcePage';

function Users() {
  return (
    <ResourcePage
      componentName="users"
      title="Users"
      description="Review user profiles, search by name or email, and inspect details in a Bootstrap modal."
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