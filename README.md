<img src="./FRONT/src/assets/img/savLogo.png" alt="savConnect Logo" width="300">



## INSTALLATION

```
npm i
```
Create database in postgreSql and create *.env* file

```
PORT=3000
PGUSER=POSTGRES_USERNAME
PGDATABASE=POSRTGRES_DATABASE
PGPASSWORD=POSTGRES_PASSWORD
PGHOST=POSTGRES_HOSTNAME
JWT_SIGN_SECRET=RANDOM_STRING
SECRET_SESSION=RANDOM_STRING
```
**RANDOM_STRING** > Create a random string for use json web token and an another random string for use epxress-session.

**Create two folders**
- /tmp
- /BACK/uploads

Change rule writing on CHMOD -R 755 (Recursive mdoe)

## COMMANDE

Start serveur déloppement
```
npm run dev
```

Building
```
npm run build
```

Start serveur production
```
npm start
```

## CONTRIBUTER
| | | | |
|---|---|---|---|
|<img src="https://github.com/jimmydupre.png" alt="jimmy dupre" width="200">|<img src="https://github.com/Stellavilar.png" alt="Stellavillar" width="200">|<img src="https://github.com/Alexandre-st.png" alt="Alexandre-st" width="200">|<img src="https://github.com/JenniferARISTIZABAL.png" alt="JenniferARISTIZABAL" width="200">|
| **Jimmy Dupré** | **Stellavilar** | **Alexandre-st** | **JenniferARISTIZABAL** |
| Product owner & Lead Back | Lead Front | Scrum master| Git master |