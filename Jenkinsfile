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
                script {
                    echo 'Cloning repository...'
                    sh '/bin/sh -c "rm -rf todo-app"'  // Using full path to sh
                    sh "/bin/sh -c 'git clone ${REPO_URL} todo-app'"
                    sh '/bin/sh -c "ls -R todo-app"'
                }
            }
        }

        stage('Build and Run Docker Services') {
            steps {
                script {
                    echo 'Building and running Docker services with docker-compose...'
                    sh "/bin/sh -c '/usr/local/bin/docker-compose -f ${COMPOSE_FILE} up -d --build'"
                }
            }
        }

        stage('Test Services') {
            steps {
                script {
                    echo 'Running service health checks...'
                    sh '/bin/sh -c "curl -f http://localhost:8000 || exit 1"'  // Backend health check
                    sh '/bin/sh -c "curl -f http://localhost:3000 || exit 1"'  // Frontend health check
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up Docker containers...'
                    sh "/bin/sh -c '/usr/local/bin/docker-compose -f ${COMPOSE_FILE} down || true'"
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Final cleanup...'
                sh "/bin/sh -c '/usr/local/bin/docker-compose -f ${COMPOSE_FILE} down || true'"
                sh '/bin/sh -c "rm -rf todo-app"'
            }
        }
    }
}
