
# SAY OUT

social network where you can be anonymous and write your thoughts. It can be amusing for small groups that can share to each other interesting info and discuss.




![Logo](https://github.com/Andrey7967/SAY-OUT/blob/main/frontend/public/flat.png)




## Authors

- [@Andrey7967](https://github.com/Andrey7967)


## Tech Stack

**Prototyping:** Figma

**Client:**  Typescript, React, Redux, React-spring,axios, WebSocket

**Server:** Node, Express, ws (WebSocket), PostgreSQL, jwt, bcrypt

## Showing

![ ](https://github.com/Andrey7967/SAY-OUT/blob/main/readmeSources/1.png)

![ ](https://github.com/Andrey7967/SAY-OUT/blob/main/readmeSources/2.png)

![ ](https://github.com/Andrey7967/SAY-OUT/blob/main/readmeSources/3.png)



## Features
- Cross platform
- Progressive Web App
- live spring animations
- JWT auth
- WebSocket connection
- Secured from XSS



## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| dark blue | #052976  |
| bright blue |#0051ff |
| sky blue (border color) | #73b7ff|
| pastel sky  blue |#bcebff |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER = your_user`

`DB_HOST     = localhost`

`DB_NAME     = your_name`

`DB_PASSWORD = your_password`

`DB_PORT = your_port`

`JWT_SECRET = your_jwt_secret`

## Deployment

To deploy this project run

```bash
git clone https://github.com/Andrey7967/SAY-OUT

# install dev dependencies
cd frontend

npm install

cd ../backend

npm install

# to run


#for frontend
npm run dev

#for backend
npm run dev

```

Or use **run.bat** file to run servers

**For LAN access:**

* in frontend folder edit hosting Address file, write correct ip address
* in backend server.ts file change ip adress in cors settings









## Appendix
**Future features:**

* security from DDos attack
* supplement fault tolerance
* checking email with single-use code


