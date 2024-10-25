pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/alicechaitea/ttmiTodoApp.git'
        COMPOSE_FILE = 'todo-app/compose.yml'
        DJANGO_SUPERUSER_USERNAME = 'admin'
        DJANGO_SUPERUSER_PASSWORD = 'test1234'
        DJANGO_SUPERUSER_EMAIL = 'admin@example.com'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: "${REPO_URL}"]]
                ])
                echo 'Repository cloned successfully.'
            }
        }

        stage('Build and Run Docker Services') {
            steps {
                script {
                    echo 'Building and running Docker services with docker-compose...'
                    // Executes docker-compose command directly
                    sh "docker-compose -f ${COMPOSE_FILE} up -d --build"
                }
            }
        }

        stage('Test Services') {
            steps {
                script {
                    echo 'Running service health checks...'
                    // Health checks
                    sh 'curl -f http://localhost:8000 || exit 1'  // Backend health check
                    sh 'curl -f http://localhost:3000 || exit 1'  // Frontend health check
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up Docker containers...'
                    sh "docker-compose -f ${COMPOSE_FILE} down || true"
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Final cleanup...'
                sh "docker-compose -f ${COMPOSE_FILE} down || true"
            }
        }
    }
}
