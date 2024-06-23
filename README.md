# Sashka Scraper: Technical Overview

## Overview

Sashka Scraper leverages TypeScript with Express.js, Axios, Cheerio, and Bottleneck for efficient and controlled web scraping of e-commerce websites.

## Key Decisions

- **Technology**: TypeScript for type safety, Express.js for API handling, Axios for HTTP requests, Cheerio for HTML parsing, and Bottleneck for rate limiting.
- **Architecture**: Class-based design for structured and modular development, promoting code organization and reusability.
- **Classes**: Utilization of classes to encapsulate scraping logic (`ScrapingService`) and manage data operations (`mockDb`), enhancing maintainability and scalability.
- **Get Requests**:
  - `/scrape`: Initiates scraping of product details from predefined URLs.
  - `/getProducts`: Retrieves filtered product data based on search queries from the mock database.
- **Next Steps**: Enhance error handling, transition to a persistent database, and optimize performance for scalability.
