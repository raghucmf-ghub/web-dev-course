Week 05 Minor Project - E-Commerce Frontend (ShopZone)

Project Overview:
This is my Week 05 Minor Project for Web Development. I built a simple e-commerce store frontend called ShopZone using React.js and Redux Toolkit. Users can browse products, view product details, search or filter items, and manage a shopping cart.

Features Implemented:
- Home Page with landing banner, navigation menu, search bar, and featured products
- Product Listing Page showing products in a responsive grid with image, price, category, and rating
- Product Details Page with image gallery preview, description, price, and add to cart button
- Shopping Cart page where you can add items, remove items, change quantities (+ / -), and see the total price and item count
- Search bar and category filter dropdown plus price sorting (low to high / high to low)
- Extra features: Wishlist page, Dark mode toggle, Pagination, Login/Register UI page, and LocalStorage saving so the cart stays saved after refreshing

Technologies Used:
- React.js
- Redux Toolkit & React-Redux (for global state management)
- React Router DOM (for page navigation)
- Fake Store API (with static JSON fallback data)
- Plain CSS for mobile, tablet, and desktop responsiveness
- Vite

Folder Structure:
- src/components/ : Navbar, ProductCard, Footer
- src/pages/ : HomePage, ProductsPage, ProductDetailsPage, CartPage, WishlistPage, LoginPage
- src/store/ : Redux store, productSlice, cartSlice, uiSlice
- src/services/ : API fetching logic
- src/assets/ : Static fallback product data

How to Run Locally:
1. Extract the folder and open it in VS Code or terminal
2. Run: npm install
3. Run: npm run dev
4. Open the localhost link shown in the terminal in your browser
