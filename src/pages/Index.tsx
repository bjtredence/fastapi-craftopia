import { EndpointCard } from "@/components/EndpointCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">FastAPI Documentation</h1>
          <p className="text-primary-foreground/80">
            Interactive API documentation with automatic validation
          </p>
        </div>
      </header>

      <main className="container py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">API Endpoints</h2>
          
          <EndpointCard
            method="GET"
            path="/api/items"
            summary="Retrieve a list of items"
            responseExample={JSON.stringify({
              items: [
                { id: 1, name: "Item 1" },
                { id: 2, name: "Item 2" },
              ]
            }, null, 2)}
          />
          
          <EndpointCard
            method="POST"
            path="/api/items"
            summary="Create a new item"
            requestExample={JSON.stringify({
              name: "New Item",
              description: "Item description"
            }, null, 2)}
            responseExample={JSON.stringify({
              id: 3,
              name: "New Item",
              description: "Item description",
              created_at: "2024-01-20T12:00:00Z"
            }, null, 2)}
          />
          
          <EndpointCard
            method="PUT"
            path="/api/items/{item_id}"
            summary="Update an existing item"
            requestExample={JSON.stringify({
              name: "Updated Item",
              description: "Updated description"
            }, null, 2)}
            responseExample={JSON.stringify({
              id: 1,
              name: "Updated Item",
              description: "Updated description",
              updated_at: "2024-01-20T12:00:00Z"
            }, null, 2)}
          />
          
          <EndpointCard
            method="DELETE"
            path="/api/items/{item_id}"
            summary="Delete an item"
            responseExample={JSON.stringify({
              message: "Item deleted successfully"
            }, null, 2)}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;