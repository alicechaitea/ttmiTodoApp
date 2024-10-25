pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/alicechaitea/ttmiTodoApp.git'
        BACKEND_IMAGE = 'todo-app-backend:latest'
        FRONTEND_IMAGE = 'todo-app-frontend:latest'
        DJANGO_SUPERUSER_USERNAME = 'admin'
        DJANGO_SUPERUSER_PASSWORD = 'test1234'
        DJANGO_SUPERUSER_EMAIL = 'admin@example.com'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo 'Cloning repository...'
                    sh 'rm -rf todo-app'
                    sh "git clone ${REPO_URL} todo-app"
                    sh 'ls -R todo-app' // Verify directory structure
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo 'Building backend and frontend Docker images...'
                    sh 'DOCKER_BUILDKIT=1 /usr/local/bin/docker build -t ${BACKEND_IMAGE} todo-app/backend'
                    sh 'DOCKER_BUILDKIT=1 /usr/local/bin/docker build -t ${FRONTEND_IMAGE} todo-app/frontend'
                }
            }
        }

        stage('Run Backend Service') {
            steps {
                script {
                    echo 'Starting backend service...'
                    sh '''
                    /usr/local/bin/docker run -d --name backend-service -p 8000:8000 \
                    -e DJANGO_SUPERUSER_USERNAME=${DJANGO_SUPERUSER_USERNAME} \
                    -e DJANGO_SUPERUSER_PASSWORD=${DJANGO_SUPERUSER_PASSWORD} \
                    -e DJANGO_SUPERUSER_EMAIL=${DJANGO_SUPERUSER_EMAIL} \
                    ${BACKEND_IMAGE} \
                    sh -c "python manage.py migrate --noinput && \
                           python manage.py ensure_user && \
                           python manage.py runserver 0.0.0.0:8000"
                    '''
                }
            }
        }

        stage('Run Frontend Service') {
            steps {
                script {
                    echo 'Starting frontend service...'
                    sh '''
                    /usr/local/bin/docker run -d --name frontend-service -p 3000:3000 \
                    --link backend-service:backend \
                    ${FRONTEND_IMAGE}
                    '''
                }
            }
        }

        stage('Test Services') {
            steps {
                script {
                    echo 'Running service health checks...'
                    sh 'curl -f http://localhost:8000 || exit 1' // Backend health check
                    sh 'curl -f http://localhost:3000 || exit 1' // Frontend health check
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up Docker containers...'
                    sh '/usr/local/bin/docker rm -f backend-service frontend-service || true'
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Final cleanup...'
                sh '/usr/local/bin/docker rm -f backend-service frontend-service || true'
                sh 'rm -rf todo-app'
            }
        }
    }
}
