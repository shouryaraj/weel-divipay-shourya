# Implementation and Testing Strategy for Transaction Table

<img width="1390" alt="image" src="https://github.com/shouryaraj/weel-divipay-shourya/assets/47905424/3d06c64e-4c1b-4853-836e-fccce3e76120">

## Folder structure

- src
  - assests (for image)
  - components (for subcomponents)
  - data (mock data)
  - hooks
  - App.js (main page)
  - indes.js (entry point)
 

## Assumptions:
* Data is consistency with no null value and type of the data is same as per the given data.
* Dropdown Options: Assuming that the list of categories provided is exhaustive and covers all relevant categories for transactions
* Assuming that there is no input validation
* Assumping the app only works on desktop, therefore, the whole app is not responsibe.

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
- Error Handling 
