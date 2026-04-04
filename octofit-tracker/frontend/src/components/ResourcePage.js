import { useEffect, useMemo, useState } from 'react';
import { getApiEndpoint, normalizeApiResults } from './api';

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function ResourcePage({ componentName, title, description, columns, titleField, emptyMessage }) {
  const endpoint = getApiEndpoint(componentName);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    console.log(`[${title}] REST API endpoint:`, endpoint);

    const loadItems = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        const normalizedItems = normalizeApiResults(payload);

        console.log(`[${title}] fetched data:`, payload);
        console.log(`[${title}] normalized items:`, normalizedItems);

        if (isMounted) {
          setItems(normalizedItems);
          setError('');
        }
      } catch (fetchError) {
        console.error(`[${title}] fetch error:`, fetchError);

        if (isMounted) {
          setError(fetchError.message);
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [endpoint, title]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      columns.some((column) => {
        const value = item?.[column.key];

        return formatValue(value).toLowerCase().includes(normalizedQuery);
      }),
    );
  }, [columns, items, query]);

  return (
    <main className="container py-4 py-lg-5">
      <div className="d-flex flex-column gap-4">
        <section className="app-hero rounded-4 p-4 p-lg-5">
          <div className="row align-items-end g-3">
            <div className="col-lg-8">
              <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
              <h1 className="display-6 fw-bold mb-2">{title}</h1>
              <p className="lead mb-0">{description}</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <span className="badge text-bg-dark px-3 py-2">Endpoint: {endpoint}</span>
            </div>
          </div>
        </section>

        <section className="app-surface rounded-4 p-3 p-lg-4">
          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-12 col-lg-8">
              <label className="form-label fw-semibold" htmlFor={`${componentName}-search`}>
                Search {title}
              </label>
              <input
                id={`${componentName}-search`}
                className="form-control"
                type="search"
                placeholder={`Filter ${title.toLowerCase()} data`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-lg-4 d-flex gap-2 justify-content-lg-end">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setQuery('')}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </div>
          </form>

          {loading ? <div className="alert alert-info mb-3">Loading {title.toLowerCase()}...</div> : null}
          {error ? <div className="alert alert-danger mb-3">{error}</div> : null}

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle app-table mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  {columns.map((column) => (
                    <th scope="col" key={column.key}>
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <tr key={item.id ?? `${componentName}-${index}`}>
                      <th scope="row">{index + 1}</th>
                      {columns.map((column) => (
                        <td key={column.key}>{formatValue(item?.[column.key])}</td>
                      ))}
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => setSelectedItem(item)}
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + 2} className="text-center py-4 text-muted">
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedItem ? (
        <div className="modal fade show d-block app-modal" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title h5 mb-0">{titleField ? formatValue(selectedItem?.[titleField]) : `${title} details`}</h2>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)} />
              </div>
              <div className="modal-body">
                <pre className="bg-body-secondary rounded p-3 mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default ResourcePage;