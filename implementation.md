# Implementation and Testing Strategy for Transaction Table

## Folder structure

- src
  - assests (for image)
  - components (for subcomponents)
  - data (mock data)
  - hooks
  - App.js (main page)
  - indes.js (entry point)

## Transaction Table Component

- The TransactionTable component is implemented using React functional components.
- It receives props categories, merchants, and initialTransactions to populate and manage transaction data.
- The component includes functionality for pagination, allowing users to navigate through multiple pages of transactions.
- Integrated search functionality to filter transactions based on user-entered text
- Implemented category filtering to allow users to view transactions belonging to specific categories.
- Included billable status toggling to enable users to mark transactions as billable or non-billable.
- Styled the table and its elements to enhance visual appeal and user experience.

## Testing Strategy

### Unit Testing:

- Employed React Testing Library for unit testing the component, and its sub-components and hook.
- Tested rendering of transaction data, search filtering, and billable status toggling.
- Ensured that user interactions such as entering search queries, and toggling billable status function correctly.

### Integration Testing:

- Test the interaction between components, ensuring they work together seamlessly.
- Test the filtering functionality based on search input.

#### Todo:

- Pagination interactions testing
- Category selection interaction testing
- Subcomponent: Dropdown testing
