pipeline {
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
    }
    agent {
        kubernetes {
            label 'meetify-build'
            yamlFile 'ci/build-pod.yaml'
            defaultContainer 'node'
        }
    }
    stages {
        stage('Pre-Build') {
            steps {
                sh 'yarn'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'dist/meetify.*.js', fingerprint: true
        }
    }
}