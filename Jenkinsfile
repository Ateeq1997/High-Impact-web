// pipeline {
//     agent any

//     environment {
//         // Set environment based on branch
//         ENV_NAME = "${env.BRANCH_NAME == 'production' ? 'prod' : 'dev'}"
//         DEPLOY_DIR = "${env.BRANCH_NAME == 'production' ? '/var/www/devEntiaWebsite' : '/var/www/devEntiaWebsite-dev'}"
//         COMPOSE_PROJECT_NAME = "${env.BRANCH_NAME == 'production' ? 'deventia-website-version-02' : 'deventia-website-dev'}"
//         COMPOSE_FILE = "${DEPLOY_DIR}/docker-compose.yml"
//         BUILD_TAG = "build-${BUILD_NUMBER}"
        
//         // Different ports for each environment.
//         BACKEND_PORT = "${env.BRANCH_NAME == 'production' ? '4000' : '4001'}"
//         FRONTEND_PORT = "${env.BRANCH_NAME == 'production' ? '3000' : '3001'}"
        
//         // Different env files for different environments
//         ENV_FILE_PATH = "${env.BRANCH_NAME == 'production' ? '/home/ubuntu/deventia/.env' : '/home/ubuntu/deventia/.env'}"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scmGit(
//                     branches: [[name: "*/${env.BRANCH_NAME}"]],
//                     extensions: [],
//                     userRemoteConfigs: [[
//                         credentialsId: 'abdul_git_repo_credentials',
//                         url: 'https://github.com/deventialimited/deventia-website-version-02.git'
//                     ]]
//                 )
//             }
//         }

//         stage('Clean Old Resources') {
//             steps {
//                 script {
//                     sh """
//                         # Stop and remove old containers
//                         docker compose -p $COMPOSE_PROJECT_NAME down || true
                        
//                         # Remove old images for this project (keep last 2 builds) - but not current build
//                         # Get all images except the one we're about to build
//                         CURRENT_BUILD_NUM=${BUILD_NUMBER}
//                         OLD_BACKEND_IMAGES=\$(docker images ${COMPOSE_PROJECT_NAME}-backend --format "{{.Repository}}:{{.Tag}}" | grep -E "build-[0-9]+" | grep -v "build-\$CURRENT_BUILD_NUM" | head -n -1 | tr '\n' ' ')
//                         if [ ! -z "\$OLD_BACKEND_IMAGES" ]; then
//                             echo "Removing old backend images: \$OLD_BACKEND_IMAGES"
//                             docker rmi \$OLD_BACKEND_IMAGES || true
//                         fi
                        
//                         OLD_FRONTEND_IMAGES=\$(docker images ${COMPOSE_PROJECT_NAME}-frontend --format "{{.Repository}}:{{.Tag}}" | grep -E "build-[0-9]+" | grep -v "build-\$CURRENT_BUILD_NUM" | head -n -1 | tr '\n' ' ')
//                         if [ ! -z "\$OLD_FRONTEND_IMAGES" ]; then
//                             echo "Removing old frontend images: \$OLD_FRONTEND_IMAGES"
//                             docker rmi \$OLD_FRONTEND_IMAGES || true
//                         fi
                        
//                         # Clean up dangling images only (not all unused images)
//                         docker image prune -f
//                         docker container prune -f
//                         docker volume prune -f || true
//                         docker network prune -f || true
//                     """
//                 }
//             }
//         }

//         stage('Prepare Deployment Directory') {
//             steps {
//                 script {
//                     sh """
//                         sudo rm -rf $DEPLOY_DIR
//                         sudo mkdir -p $DEPLOY_DIR
//                         sudo cp -r . $DEPLOY_DIR
//                         sudo chown -R \$(whoami):\$(whoami) $DEPLOY_DIR
//                     """
//                 }
//             }
//         }

//         stage('Generate Docker Compose') {
//             steps {
//                 script {
//                     sh """
//                         cd $DEPLOY_DIR
//                         cat > docker-compose.yml << 'EOF'
// services:
//   backend:
//     build:
//       context: ./Backend
//       dockerfile: Dockerfile
//       target: ${ENV_NAME}
//       args:
//         NODE_ENV: ${ENV_NAME == 'prod' ? 'production' : 'development'}
//     container_name: deventia_backend_${ENV_NAME}
//     ports:
//       - "${BACKEND_PORT}:4000"
//     restart: always
//     env_file:
//       - ${ENV_FILE_PATH}
//     healthcheck:
//       test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:4000/health"]
//       interval: 30s
//       timeout: 15s
//       retries: 5
//       start_period: 30s

//   frontend:
//     build:
//       context: ./Frontend
//       dockerfile: Dockerfile
//       target: ${ENV_NAME}
//       args:
//         NODE_ENV: ${ENV_NAME == 'prod' ? 'production' : 'development'}
//     container_name: deventia_frontend_${ENV_NAME}
//     ports:
//       - "${FRONTEND_PORT}:3000"
//     restart: always
//     depends_on:
//       backend:
//         condition: service_healthy
//     healthcheck:
//       test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
//       interval: 30s
//       timeout: 15s
//       retries: 5
//       start_period: 30s
// EOF
//                     """
//                 }
//             }
//         }

//         stage('Build Docker Images with Tag') {
//             steps {
//                 script {
//                     sh """
//                         cd $DEPLOY_DIR
//                         docker compose -p $COMPOSE_PROJECT_NAME build --no-cache
//                         docker tag ${COMPOSE_PROJECT_NAME}-backend ${COMPOSE_PROJECT_NAME}-backend:$BUILD_TAG
//                         docker tag ${COMPOSE_PROJECT_NAME}-frontend ${COMPOSE_PROJECT_NAME}-frontend:$BUILD_TAG
//                         echo "✅ Built and tagged images for build $BUILD_TAG"
//                     """
//                 }
//             }
//         }

//         stage('Deploy Services') {
//             steps {
//                 script {
//                     sh """
//                         cd $DEPLOY_DIR
//                         docker compose -p $COMPOSE_PROJECT_NAME up -d --wait
                        
//                         # Wait a bit more and check container health
//                         sleep 10
//                         docker compose -p $COMPOSE_PROJECT_NAME ps
//                     """
//                 }
//             }
//         }

//         stage('Verify Deployment') {
//             steps {
//                 script {
//                     sh """
//                         # Check if containers are running and healthy
//                         BACKEND_HEALTH=\$(docker inspect --format='{{.State.Health.Status}}' deventia_backend_${ENV_NAME})
//                         FRONTEND_HEALTH=\$(docker inspect --format='{{.State.Health.Status}}' deventia_frontend_${ENV_NAME})
                        
//                         echo "Backend health: \$BACKEND_HEALTH"
//                         echo "Frontend health: \$FRONTEND_HEALTH"
                        
//                         if [ "\$BACKEND_HEALTH" = "healthy" ] && [ "\$FRONTEND_HEALTH" = "healthy" ]; then
//                             echo "✅ All services are healthy"
//                         else
//                             echo "❌ Some services are not healthy"
//                             docker compose -p $COMPOSE_PROJECT_NAME logs --tail=50
//                             exit 1
//                         fi
//                     """
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             echo "🚀 ${ENV_NAME} deployment successful via Docker Compose."
//         }
//         failure {
//             script {
//                 sh """
//                     echo "❌ ${ENV_NAME} deployment failed. Container logs:"
//                     docker compose -p $COMPOSE_PROJECT_NAME logs --tail=50 || true
//                 """
//             }
//         }
//         always {
//             script {
//                 sh """
//                     # Final cleanup of build cache and temporary resources
//                     docker builder prune -af || true
//                 """
//             }
//         }
//     }
// }