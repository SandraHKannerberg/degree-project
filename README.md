# Lotus Harmony – fullstack e-commerce project

Repo: https://github.com/SandraHKannerberg/degree-project.git

I have been studying web development for almost two years and this is my degree project. </br>

It is a MERN-stack project with: </br>

- Database with 4 collections (categories, orders, products, users)
- Server with restAPI (Node/express)
- Frontend in React with TypeScript
- Stripe intergation for checkout
- Bootstrap for layout in combination with my own CSS

# Description

I have created a fictional e-commerce from scratch selling yoga products.
The webshop allows you to place and complete an order, both as a guest or an inlogged user by checkout with Stripe </br>
To mention some of the funcionality on the webpage: </br>

- You can signup as a user </br>
- LogIn to your page where the orderhistory are displayed </br>
- As an admin you can login to Adminpanel to see all orders, mark an order as shipped, managing existing products and add new product </br>
- The webpage are full responsive </br>
- InStock indicator </br>

# User permissions

To login as admin use the credentials: </br>
admin@admin.com </br>
admin123 </br>

You can signup as a regular user or login to an existing account by using credentials: </br>
user@mymail.com </br>
user123 </br>

# Installation

To run the project follow the instructions below.

- First of all you need to have NodeJS installed. If you don't have it follow the link to Node documentation https://nodejs.org/en

- Clone the repo from GitHub: https://github.com/SandraHKannerberg/degree-project.git
- Open Terminal and navigate to the folder where you want to save the repo. Then run the command:
  git clone https://github.com/SandraHKannerberg/degree-project.git

**Server**

- Open Terminal and navigate to the repo folder

- Navigate to serverfolder within the repo by runing the command:
  cd server

- To get all dependencies run the command:
  npm install
- When the installation are done, run the command below to start the server and connect to database
  npm start

**Client**

- Open Terminal and navigate to the repo folder

- Navigate to clientfolder within the repo by runing the command:
  cd client

- To get all dependencies run the command:
  npm install

- When the installation are done, run the command:
  npm run dev

  The project are now up and running om localhost and you can open the application in your browser
