import { EndpointCard } from "@/components/EndpointCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">FastAPI Microservices Documentation</h1>
          <p className="text-primary-foreground/80">
            Interactive documentation for our microservices architecture
          </p>
        </div>
      </header>

      <main className="container py-8">
        {/* User Service */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-2">User Service</h2>
          <p className="text-gray-600 mb-6">Handles user authentication and profile management</p>
          
          <EndpointCard
            method="POST"
            path="/auth/register"
            summary="Register a new user"
            requestExample={JSON.stringify({
              email: "user@example.com",
              password: "securepassword",
              full_name: "John Doe"
            }, null, 2)}
            responseExample={JSON.stringify({
              user_id: "uuid-1234",
              email: "user@example.com",
              full_name: "John Doe",
              created_at: "2024-01-20T12:00:00Z"
            }, null, 2)}
          />
          
          <EndpointCard
            method="GET"
            path="/users/{user_id}/profile"
            summary="Get user profile details"
            responseExample={JSON.stringify({
              user_id: "uuid-1234",
              email: "user@example.com",
              full_name: "John Doe",
              preferences: {
                theme: "dark",
                notifications: true
              }
            }, null, 2)}
          />
        </div>

        {/* Product Service */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-2">Product Service</h2>
          <p className="text-gray-600 mb-6">Manages product catalog and inventory</p>
          
          <EndpointCard
            method="GET"
            path="/products"
            summary="List all products with pagination"
            responseExample={JSON.stringify({
              items: [
                {
                  id: "prod-1",
                  name: "Product 1",
                  price: 29.99,
                  stock: 100
                },
                {
                  id: "prod-2",
                  name: "Product 2",
                  price: 39.99,
                  stock: 50
                }
              ],
              total: 2,
              page: 1,
              page_size: 10
            }, null, 2)}
          />
          
          <EndpointCard
            method="POST"
            path="/products"
            summary="Create a new product"
            requestExample={JSON.stringify({
              name: "New Product",
              description: "Product description",
              price: 49.99,
              initial_stock: 100
            }, null, 2)}
            responseExample={JSON.stringify({
              id: "prod-3",
              name: "New Product",
              description: "Product description",
              price: 49.99,
              stock: 100,
              created_at: "2024-01-20T12:00:00Z"
            }, null, 2)}
          />
        </div>

        {/* Order Service */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-2">Order Service</h2>
          <p className="text-gray-600 mb-6">Handles order processing and management</p>
          
          <EndpointCard
            method="POST"
            path="/orders"
            summary="Create a new order"
            requestExample={JSON.stringify({
              user_id: "uuid-1234",
              items: [
                { product_id: "prod-1", quantity: 2 },
                { product_id: "prod-2", quantity: 1 }
              ],
              shipping_address: {
                street: "123 Main St",
                city: "Example City",
                country: "US"
              }
            }, null, 2)}
            responseExample={JSON.stringify({
              order_id: "order-789",
              user_id: "uuid-1234",
              items: [
                { product_id: "prod-1", quantity: 2, price: 59.98 },
                { product_id: "prod-2", quantity: 1, price: 39.99 }
              ],
              total: 99.97,
              status: "pending",
              created_at: "2024-01-20T12:00:00Z"
            }, null, 2)}
          />
          
          <EndpointCard
            method="GET"
            path="/orders/{order_id}"
            summary="Get order details"
            responseExample={JSON.stringify({
              order_id: "order-789",
              user_id: "uuid-1234",
              items: [
                { product_id: "prod-1", quantity: 2, price: 59.98 },
                { product_id: "prod-2", quantity: 1, price: 39.99 }
              ],
              total: 99.97,
              status: "processing",
              shipping_address: {
                street: "123 Main St",
                city: "Example City",
                country: "US"
              },
              tracking_number: "1Z999AA1234567890",
              created_at: "2024-01-20T12:00:00Z",
              updated_at: "2024-01-20T12:05:00Z"
            }, null, 2)}
          />
        </div>

        {/* Notification Service */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">Notification Service</h2>
          <p className="text-gray-600 mb-6">Manages email and push notifications</p>
          
          <EndpointCard
            method="POST"
            path="/notifications/email"
            summary="Send email notification"
            requestExample={JSON.stringify({
              user_id: "uuid-1234",
              template: "order_confirmation",
              data: {
                order_id: "order-789",
                total: 99.97
              }
            }, null, 2)}
            responseExample={JSON.stringify({
              notification_id: "notif-456",
              status: "queued",
              created_at: "2024-01-20T12:00:00Z"
            }, null, 2)}
          />
          
          <EndpointCard
            method="GET"
            path="/notifications/status/{notification_id}"
            summary="Check notification status"
            responseExample={JSON.stringify({
              notification_id: "notif-456",
              status: "delivered",
              delivered_at: "2024-01-20T12:01:00Z",
              type: "email",
              recipient: "user@example.com"
            }, null, 2)}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;