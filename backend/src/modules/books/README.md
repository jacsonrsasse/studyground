# Books Module

This module is responsible for managing an import of books from a CSV or Excel file. The route `/books/import` is used to handle this process. As well as, it has a route `/books/import/progress` which is a SSE route to get the progress of the import process.

## How to test it

You can create a CSV file using the route `/make/mock/books/xlsx`. This route will create a mock Excel file with 1000 books. You can use this file to test the import process.

After that, you should first connect to the SSE route `/books/import/progress` to get the progress of the import process. Then, you can use the route `/books/import` to start the import process. The import process will take some time, so you can check the progress using the SSE route.

## GraphQL

This module also has a GraphQL endpoint that allows you to query the books. The endpoint is `/graphql` and the schema is defined in the `books.resolver.ts` file.
