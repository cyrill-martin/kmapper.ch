# kmapper.ch

## Architecture

![Architecture of kmapper's little fullstack mapped out](architecture.png)

Based on this little fullstack: https://github.com/cyrill-martin/my-little-fullstack

## Local Development

1. docker compose up -d
   - Access localhost:8055 for Directus
   - Access localhost:3000 for the frontend

## Prod Deployment

### Frontend

1. SSH into the server
1. `cd /opt/kmapper.ch`
1. Pull lates code with `git pull`
1. Rebuild and restart the frontend container with `docker compose -f docker-compose.prod.yml up -d --build frontend`

### Directus (config/extensions)

1. SSH into the server
1. `cd /opt/kmapper.ch`
1. Pull lates code with `git pull`
1. Rebuild and restart the directus container with `docker compose -f docker-compose.prod.yml up -d --build directus`

### Environment Variables

1. SSH into container
1. `cd /opt/kmapper.ch`
1. Edit .env with `nano .env`
   - Ctrl + o
   - Enter
   - Ctrl + x
1. Restart affected container(s)

### Database

Figure out your own workflows to handle database changes.
