### Welcome to the Teslo Shop repository!
Here it is a manual to run the project locally.

### Run in development 

1. First, clone the repository:
```bash
git clone https://github.com/HernanArevalo/teslo-shop
```
2. Rename `.env.template` as `.env`, and change the *variables*.


3. Install the dependencies:
```bash
npm install
```
4. Start up the database:
```bash
docker compose up -d
```
5. Run prisma migrations:
```bash
npx prisma migrate dev
```
6. Execute seed:
```bash
npm run seed
```
8. Clean local storage.

7. Run the server in development mode:
```bash
npm run dev
```
