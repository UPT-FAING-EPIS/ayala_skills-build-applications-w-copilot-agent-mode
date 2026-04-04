import ResourcePage from './ResourcePage';

function Teams() {
  return (
    <ResourcePage
      componentName="teams"
      title="Teams"
      description="Manage team records with a consistent Bootstrap table, card shell, search form, and modal." 
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