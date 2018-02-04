# Frank backend

[![Coverage Status](https://coveralls.io/repos/github/getfrank/backend/badge.svg?t=JRiXVN)](https://coveralls.io/github/getfrank/backend)

## Env Variables
HOST=localhost
PORT=3001
API_URL=https://frank-be.herokuapp.com
FRANK_EMAIL=hi@frankapp.com
JWT_SECRET=butts (or whatever you want)

```sh
$ cd backend
$ npm install
$ npm run test
```

# Components
Adding a new component to a user :
To add a new component first we most add a user and an app for a user
a post request to /api/v1/users with object containing :


**add user:**
```sh
POST => /api/v1/users
{
    fname,
    lname,
    password,
    email
}
```
now since we have a user we can add an app to that user

**add app:**
```sh
POST => /api/v1/apps
{
    name: "New Test App",
    components: [],
    layout: "layoutTwo"
}
```
the response will be an object containing the newly created app

now finally we can add a component to that app

**add component:**
```sh
POST => /api/v1/components
{
    app: app._id.toString(),
    name: "testComponent" + Math.random(),
    configs: [
        {
            name: "header",
            content: "content for header",
            style: {
                color: "#20021b",
                textAlign: "right"
            }
        },
        {
            name: "subtext",
            content: "content for subtext",
            style: {
                color: "#1fee08",
                textAlign: "center"
            }
        }
    ]
}
```
the response will be an object with the newly created component

to update a component you need to provide the component id via the api endpoint

**update component:**
```sh
PUT => /api/v1/components/:componentId
{
    name: "testComponent" + Math.random(),
    configs: [
        {
            name: "header",
            content: "updated content for header",
            style: {
                color: "#20021a",
                textAlign: "left"
            }
        },
        {
            name: "subtext",
            content: "updated content for subtext",
            style: {
                color: "#1fee09",
                textAlign: "right"
            }
        }
    ]
}
```

**delete component:**
```sh
DELETE => /api/v1/components/:componentId
```


**Analytics**

in order to monitor the usage of components for a user, they need to be served via our /serve API endpoints
for example :

a get request with a query contianing a list of  components

```sh
url: `${apiUrl}/serve?cIds=${component._id}&cIds=${component2._id}`
```
this endpoint will get to serve two components and at the same time records the usage of these components into our ComponentUsageLog collection.

now if we want to check the analytics of the usage of a user's components for the current day all we need to do is :

a get request containing the user id:

```sh
url: `${apiUrl}/users/${user._id}/components/analytics`
```

the response will contain two lists of object one called components which have a list of all the components that this user have, and another list called analytics that has a list of object with \_id of each component and a key count that has the number of how many times that component was served.

if we need to get the analytics for a specific date all we need to do is kind of similar to what we did above except we add the from date and to date along the get request:

example :

```sh
url: `${apiUrl}/users/${user._id}/components/analytics`,
qs: {
  from: moment().subtract(3, 'days').toJSON(),
  to: moment().add(3, 'days').toJSON()
},
```
