
## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview

The repo consist of backend which is build in python Django and frontend is build in ReactJs. The project is fully completed with the requirements mentioned. You will need to register and authenticate a user for using this application.
You can create multiple projects under a user and task under each projects, mark them as completed and vise versa. Basic crud is done for task and Exporting the project will download the .md file to the local directory also it will upload as gist to the respective user's
gis collection. While doing the project setup dont forgot to add .env file in the backend and add the github's token as "GIST_TOKEN" key. Then only able to upload to the gist.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fitmyjob.git

2. Navigate into the backend project directory:
   ```bash
   cd backend

4. Set up a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   
6. Install the required dependencies:
   ```bash
   pip install -r requirements.txt

8. Set up the database:
   ```bash
   python manage.py migrate
   
10. Run the development server:
    ```
    python manage.py runserver

The project will run in "http://127.0.0.1:8000/"
Use this to run frontend application and use as BASE_URL

##To set up the frontend project:
7. Navigate into the frontend project directory:
    cd .\frontend\hatiotodo

8. Install the required dependencies:
    npm install

9. Run application:
    npm start

## Usage

create a user from the route /signup and login the user and start using the application by creating a project
- Create new Project
- Edit the project name
- Click the area inside a project to create new task.
- Add, Edit, Delete Task.
- Export the project
