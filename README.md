## Foreword

The project is a web-based platform for creating a Search page for popular movies.

## Scaffolding

```bash
├── public
│   └── index.html                  # HTML Template
├── src
│   ├── actions                     # redux actions
│   ├── components                  # component definitions and their stylesheets
│   ├── mock                        # Holds initial mock data
│       ├── admin.js                # Mock Admin Data
│   │   └── Employee.js             # Mock Employee Data
│   ├── services                    # redux services to fetch data from API(in this case, mock)
│   ├── reducers                    # reducer definitions
│   ├── App.js                      # entrypoint of the component
│   └── App.css                     # CSS definition for App component
├── .eslintrc.js                    # js linting configuration
├── .gitignore
├── package.json                    # project dependencies
└── README.md

```

## Installation

Install Dependencies

`yarn` is the default dependency manager used for installing and building the application.

```bash
$ yarn install
```

Start Development Server

```bash
$ yarn start
```

This will automatically open the application on [http://localhost:3000](http://localhost:8000).

## Deployment
The deployed app can be found on [heroku](https://lasystem.herokuapp.com). 
Few Points to remember:
- Mock Admin Credentials: 
  - phone: 0000000000
  - password: "password"
- Mock Employee Credentials: 
  - phone: 9876543210/ 9876543200
  - password: "password"
  
P.S: Password for every user is default as "password" unless changed.

## Requirements

Install yarn

```
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
dnf/yum install yarn
```

## Build

Build Application

```bash
$ yarn build
```

This will generate the `dist` folder in the root directory, which contains packaged files such as `***.js`, `***.css`, and `index.html`.
