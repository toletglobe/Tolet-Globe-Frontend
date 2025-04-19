# To-Let Globe : Frontend

This repository contains the codebase for the frontend of the project for "To-Let Globe" designed to facilitate property rentals, reviews, FAQs, and other related functionalities. Below is an overview of the folder structure, key components, and instructions for creating new pages and making API calls.

# Tech Stack

The frontend is built using **React.js** and is structured for scalability and modularity. For styling the project uses Tailwind CSS. For image file uploads cloudinary is being used in the backend.

#### Folder Structure

The code files for the project can be found in the src folder. Inside the src folder are the following folders

- **`assets`**: Contains resources like images being used in the project.
- **`config`**: Contains the configurations for axios ( API calls) and the backend URL
- **`layouts`**: Conatains the common layouts being used in the project.
- **`pages`**: Contains the files arranged as per the pages in the project. All components being used in a page have been created with a subfolder called **components** inside the page folder.
- **`redux`**: Contains redux configurations
- **`reusableComponents`**: Contains react components being reused in multiple pages/ common layouts.
- **`routes`**: Contains react routing for client side routing and serveing the pages in the app

#### Contributing to the Codebase

- **Raising Pull Requests (PR)**:
- First fork the repository from Github
- Clone the forked repository to your local machine - git clone _repo-url_
- Switch to the branch that you need to work in - git checkout -b _branch-name_ origin/_branch-name_
- Make changes to the codebase
- Before raining the PR ensure your codebase is up to date. Sync your fork for the branch being worked on in github. Then pull any changes to your local repo using **git pull** command.
- Raise PR

  - git add .
  - git commit -m "Your commit message"
  - git push origin _branch-name_

- **Creating new Pages/ Components**: To create a new page create a new folder for the page in **src/pages** and write the main component with the same name as the page folder name. For any sub components being used create them in a sub folder called **components**.

- **Adding New Assets**: The assets have been arranged in **src/assets** folder page wise. To add new assets for a particular page/ component, add the same in **src/assets** folder in respective sub folder based on the page being worked on.

- **Making API Calls to the Backend**: Use the API functionality created in **src/config/axios** for making API calls. Please refer to API calls being made in other components to understand the process.

- **Responsive Design**: Ensure that the components that you create are responsive and can work in mobile and tablet mode also.
