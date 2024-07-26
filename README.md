
# Shoonya Life Assessment

## Overview

Shoonya Life Assessment is a web application that helps users find and filter various retreats based on their interests and dates. It features a responsive design, an interactive calendar for date-based filtering, and options for filtering by retreat type.

## Features

- **Calendar-Based Filtering:** Users can filter retreats by selecting dates from a calendar.
- **Type-Based Filtering:** Users can filter retreats based on different types (e.g Yoga, Meditation, Fitness).
- **Search Functionality:** Users can search for retreats by title.
- **Pagination:** Navigate through multiple pages of retreat listings.
- **Responsive Design:** The application is designed to work seamlessly across different devices and screen sizes.

## Technologies Used

- **Frontend:** ReactJS, Tailwind CSS
- **Date Library:** Moment.js
- **Calendar Component:** React Big Calendar
- **Debouncing:** Lodash (for search input debouncing)

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/akhilnandavara/shoonya-life-assesment.git
    ```

2. Navigate to the project directory:
    ```bash
    cd shoonya-life-assesment
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Components

### `FilterBar.jsx`

- **Purpose:** Provides filtering options for retreats by date and type, and includes a search input.
- **Props:**
  - `retreats`: Array of retreat objects.
  - `onFilterChange`: Function to handle filtering by type.
  - `searchInput`: Current value of the search input.
  - `setSearchInput`: Function to update the search input value.
  - `onSearch`: Function to handle search input changes.
  - `onFilterByDate`: Function to handle filtering by date.
- **Features:** 
  - Calendar-based date selection for filtering.
  - Dropdown menu for filtering by type.
  - Search input with debounced updates.

### `App.jsx`

- **Purpose:** Main application component that manages state, fetches data, and renders the UI.
- **State:**
  - `currentPage`: Current page number for pagination.
  - `retreats`: Array of retreat objects fetched from the API.
  - `filterType`: Current filter type for retreats.
  - `searchTerm`: Current search term.
  - `searchInput`: Current search input value.
  - `totalPages`: Total number of pages for pagination.
- **Effects:**
  - Fetches retreat data based on current page, search term, and filter type.
  - Updates total pages for pagination.
- **Features:**
  - Displays a list of retreats.
  - Handles page changes and search/filter updates.
  - Includes a header, footer, hero section, and pagination.

## API

The application fetches retreat data from a mock API:
- **Endpoint for Retreat Data:** `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`
- **Endpoint for Total Pages Calculation:** `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats` (used to calculate total pages for pagination)

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Open a pull request describing your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [Akhil](mailto:akhiln1108@gmail.com).
