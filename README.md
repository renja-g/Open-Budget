# Open Budget

Open Budget is an open source financial tracking application.
<br>
The goal of this project is to provide an easy to host fincial tracking application for personal use.


.env file
```bash
# Create a free database at https://neon.tech/
DATABASE_URL="postgres://.../neondb"

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```