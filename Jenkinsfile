pipeline {
    agent any

    environment {
        APP_DIR = '/Users/alicechaiyakul/todo-app'
        COMPOSE_FILE = '/Users/alicechaiyakul/todo-app/compose.yml'
        DJANGO_SUPERUSER_USERNAME = 'admin'
        DJANGO_SUPERUSER_PASSWORD = 'test1234'
        DJANGO_SUPERUSER_EMAIL = 'admin@example.com'
    }

    stages {
        stage('Navigate to App Directory') {
            steps {
                dir("${APP_DIR}") {
                    echo "Using app directory at ${APP_DIR}."
                }
            }
        }

        stage('Build and Run Docker Services') {
            steps {
                script {
                    echo 'Building and running Docker services...'
                    // Using the simplified Docker CLI syntax
                    sh "docker compose up -d"
                }
            }
        }

        stage('Test Services') {
            steps {
                script {
                    echo 'Running service health checks...'
                    sh 'curl -f http://localhost:8000 || exit 1'  // Backend health check
                    sh 'curl -f http://localhost:3000 || exit 1'  // Frontend health check
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up Docker containers...'
                    sh "docker compose -f ${COMPOSE_FILE} down || true"
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Final cleanup...'
                sh "docker compose -f ${COMPOSE_FILE} down || true"
            }
        }
    }
}
