docker stop $(docker ps -aq)

# Build image using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 \
    DOCKER_BUILDKIT=1 \
    docker-compose -f docker-compose.yml build --parallel

docker-compose -f docker-compose.yml up --renew-anon-volumes --remove-orphans