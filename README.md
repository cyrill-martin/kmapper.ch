# kmapper.ch

## Architecture

```mermaid
flowchart TB
    A["GitHub Repository<br/>Source Code, Content (YAML) &amp; Config"]
    A -->|"git pull — manual deployment via SSH"| B

    subgraph B["Ubuntu Production Server"]
        direction TB
        C["Nginx Reverse Proxy<br/>SSL Termination via Let's Encrypt, Routing<br/>Port 80, 443"]
        subgraph D["Docker Compose"]
            E["Nuxt 4 (SSR)<br/>Frontend + Nitro API<br/>content/*.yaml bundled in image<br/>Port 3000"]
        end
        C --> D
    end

    B -->|"HTTPS via Let's Encrypt"| F["End Users"]
```

Content (page copy, SEO metadata) lives as YAML files under `frontend/content/`, and UI labels live under `frontend/i18n/locales/`. Both ship with the frontend image, so content changes go through the same git workflow as code.

## Local Development

1. `docker compose up -d`
   - Access localhost:3000 for the frontend

## Prod Deployment

### Frontend

1. SSH into the server
1. `cd /opt/kmapper.ch`
1. Pull latest code with `git pull`
1. Rebuild and restart the frontend container with `docker compose -f docker-compose.prod.yml up -d --build frontend`
1. Clear build cache with `docker builder prune -f`

### Environment Variables

1. From the project root: `scp .env.prod kmapper-vps:/opt/kmapper.ch/.env`

### Backup Kanboard

1. From the project root (kmapper.ch): `rsync -avz kmapper-vps:/opt/kmapper.ch/kanboard/data/db.sqlite ./kanboard/db.sqlite`

The custom CSS is also backed up separatly in `/kanbaord`.
