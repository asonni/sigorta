# Data model
-----

### Users
A _user_ is someone who has a Frank account. A user can have one or many applications
Data model:
  ```
  {
    id,
    fname: string,
    lname: string,
    email: string,
    password: string,
    apps: [app_id, app_id, app_id]
  }
  ```

### Apps
An _app_ is a collection of pages as well as a layout ID.
Data model:
  ```
  {
    id,
    owner: user_id,
    name: string,
    pages: [page_id, page_id, page_id],
    layout: layout_id
  }
  ```

### Pages
A _page_ is an ordered collection of containers
Data model:
   ```
  {
    id,
    app: app_id,
    containers: [container_id, container_id, container_id],
  }
   ```

### Containers
A _container_ is a collection of other containers __and/or__ a collection of components
Data model:
   ```
  {
    id,
    components: [component_id, component_id, component_id],
    containers: [container_id, container_id, container_id],
  }
   ```

### Components
A _component_ is a React component. Each component has a __name__ that we use to import the component into an application and a __config__ that defines what goes into the component.

For example, a component named `infiniteScroll` would be included in an app with
```
import infiniteScroll from '...../components/infiniteScroll'
import { header, body, style, content, ... } from config
```

We could then use _header_, _body_, etc. from the config as __props__ to the actual component.
Data model:
   ```
  {
    id,
    name: app_id,
    config: config_id,
  }
   ```

### Config
A _config_ is an object with arbitrary key/value pairs that will be passed as props to a component
Example data model:
   ```
  {
    id,
    data: {
      headerOne: 'User Profile',
      headerTwo: 'Personal information',
      headerThree: 'Order history',
      user: {
        fname: 'Tom',
        lname: 'Mclaughlin',
        phone: '555-5555',
        email: 'tom@frankapp.com',
      },
      photos: [ photoOne, photoTwo, photoThree, ]
    }
  }
   ```

### Layout
A layout defines the font set and CSS used throught the application. Every component imports a set of styles, each pre-designed to look correct based on the layout's font set.


# API architecture
-----
__API base:__ `/api/v1/`

### Users
-----
__index__: `GET /users`
  Sample response:
  ```
  { 'users':
    [
      {"_id": 'abc123'},
      {"_id": 'abc234'},
      {"_id": 'abc345'},
    ]
  }
  ```

__show__: `GET /users/:id`
  Sample response:
  ```
  { 'user':
    {
      "fname": 'Tom',
      "lname": 'Mclaughlin',
      "email": 'tom@frankapp.com',
    }
  }
  ```
__create__: `POST /users/new`
  Sample response:
  ```
    200: OK
  ```
__update__: `POST /users/:id`
  ```
    200: OK
  ```
__delete__: `DELETE /users/:id`
  ```
    200: OK
  ```

### Apps [user nonspecific]
-----
__index__: `GET /apps`
  Sample response:
  ```
  { 'apps':
    [
      {"_id": 'abc123'},
      {"_id": 'abc234'},
      {"_id": 'abc345'},
    ]
  }
  ```

### Apps [user specific]
-----
__index__: `GET /users/:id/apps`
  Sample response:
  ```
  { 'apps':
    [
      {
        "_id": id,
        "name": 'Frankbook'
      },
      {
        "_id": id,
        "name": 'Frankstagram'
      },
    ]
  }
  ```

__show__: `GET /users/:id/apps/:id`
  Sample response:
  ```
  { 'app':
    {
      id: id,
      name: 'Frankbook',
      pages: ['pabc1', 'pabc2', 'pabc3'],
      layout: 1
    }
  }
  ```
__create__: `POST /users/:id/apps/`
  Sample response:
  ```
    200: OK
  ```
__update__: `POST /users/:id/apps/:id`
  ```
    200: OK
  ```
__delete__: `DELETE /users/:id/apps/:id`
  ```
    200: OK
  ```

### Pages
-----
__index__: N/A
__show__: `GET /apps/:id/pages/:id`
  Sample response:
  ```
  { 'page':
    {
      id,
      containers: [
        {
          id,
          components: [
            {
              name: 'navbar',
              config: {
                id: id,
                header: 'Frankazon',
                logo: 's3.amazon.com/frankazon.png',
              },
            }
            {
              name: 'cart',
              config: {
                id: id,
                header: 'Checkout',
                products: [1,2,3,4],
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                ...,
                ...,
                ...,
              },
            },
            {
              name: 'footer',
              config: {
                id: id,
                links: [
                  { text: 'about', source: '/about'},
                  { text: 'careers', source: '/careers'},
                  { text: 'contact us', source: '/contact'},
                ],
                ...,
                ...,
                ...,
              }
            }
          ],
          containers: [],
        }
      ]
    },
  }
  ```
__create__: `POST /apps/:id/pages/:id`
  Sample response:
  ```
    200: OK
  ```

__update__: `POST /apps/:id/pages/:id`
  Sample response:
  ```
    200: OK
  ```

__delete__: `DELETE /apps/:id/pages/:id`
  ```
    200: OK
  ```

