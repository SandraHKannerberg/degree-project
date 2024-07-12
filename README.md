# Lotus Harmony – fullstack e-commerce project

Link to demo: https://lotusharmony.sandrahkannerberg.se/ </br>
Repo: https://github.com/SandraHKannerberg/degree-project.git </br>

I have been studying web development for two years and this is my degree project. </br>
In this project I have been working with a MERN-stack and create a fictional e-commerce from scratch selling yoga products. </br>
After graduation, I have continued working on this project as a hobby and will keep improving and developing it continuously. </br>

# Description

The webshop allows you to place and complete an order, both as a guest or an inlogged user by checkout with Stripe. </br>
To mention some of the funcionality on the webpage: </br>

- You can sign up as a user. Validation on email and password - you can't register an email that already exists and you need to match the password with expected format.</br>
- Log in to your page where the orderhistory are displayed.</br>
- As an admin you can log in to Adminpanel to see all orders, mark an order as shipped, managing existing products and add new products (CRUD).</br>
- The webpage are full responsive.</br>
- InStock control with color indicator depending on if a product are sold out, few inStock or full inStock.</br>
- React Router for fancy URLs.</br>
- LazyLoading.</br>
- Pagination.</br>
- Search function in productlist. It is located in the menu selection All.</br>
- Errorhandling on required inputs and 401 / 404 page. </br>

# Technologies

- MongoDB: Database with 4 collections (categories, orders, products, users)
- NodeJs/Express: Server with restAPI
- React with TypeScript: Frontend
- Stripe implementation for checkout (handle payments and shipping methods)
- Bootstrap for layout in combination with my own CSS

# User permissions

To login as admin use the credentials: </br>
admin@admin.com </br>
admin123 </br>

You can signup as a regular user or login to an existing demo-user account by using credentials: </br>
user@mailen.com </br>
user123 </br>

# Installation

To run the project follow the instructions below.

- First of all you need to have NodeJS installed. Refer to https://nodejs.org/en/ to install nodejs

- Clone the repo from GitHub: https://github.com/SandraHKannerberg/degree-project.git

- Open Terminal and navigate to the folder where you want to save the repo. Then run the command: </br>

      git clone https://github.com/SandraHKannerberg/degree-project.git

**The project requires**

To be able to run the project, you need access to secretkeys:

Frontend
- VITE_API_URL

Server
- MONGODB_CONNECTION_STRING
- STRIPE_SECRET_KEY
- COOKIE_SECRET_KEY

Open your code editor, for example Visual Studio Code. </br>
Create an .env-file in the server folder and an .env-file in the client folder. In the .env-file enter the secretkeys along with the value of each key: </br>

MONGODB_CONNECTION_STRING=thesecretkeyvalue </br>
STRIPE_SECRET_KEY=thesecretkeyvalue </br>
COOKIE_SECRET_KEY=thesecretkeyvalue </br>

**Server**

- Open Terminal and navigate to the repo/project folder

- Navigate to server folder within the repo by running the command: </br>

      cd server

- To get all dependencies run the command: </br>

      npm install

- When the installation are done, run the command below to start the server and connect to database: </br>

      npm start

The server are now up and running on localhost and connected to the database

**Client**

- Open Terminal and navigate to the repo/project folder

- Navigate to client folder within the repo by running the command: </br>

      cd client

- To get all dependencies run the command: </br>

      npm install

- When the installation are done, run the command: </br>

      npm run dev

The project are now up and running on localhost and you can open the application in your browser
