## Algerian-Cities-API

An API serving as a directory for storing and retrieving different city names of algerian wilayas.

### Usage

The project uses Firebase for storage, so you need to have the database credentials file located in: `/etc/secrets/<credentials-file-name>` (You can modify this to work with .env files. I just don't have much time for that).

To run the server, simply:
```
npm install
node index.js
```

The defined endpoints for the clients to interact with the server are:

```
/list[?lang=ar]                        # List all Algerian wilayas.
/cities?wilaya_code=[01-58][&lang=ar]  # List all cities of specified wilaya code.
```
