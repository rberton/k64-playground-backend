node {
  try {
    stage("Checkout") {
        checkout scm
    }
    
    stage("Environment") {
      sh "git --version"
      echo "Branch: ${env.BRANCH_NAME}"
      sh "docker -v"
      sh "printenv"
    }
    
    stage("Build backend tests") {
      if(env.BRANCH_NAME == "dev") {
        sh "docker build -f Dockerfile-test -t k64/backend-test --no-cache ."
      }
    }
    stage("Run backend tests") {
      if(env.BRANCH_NAME == "dev") {
        sh "docker run --rm k64/backend-test"
      }
    }
    stage("Delete backend tests") {
      if(env.BRANCH_NAME == "dev") {
        sh "docker rmi k64/backend-test"
      }
    }
    stage("Deploy backend") {
      if(env.BRANCH_NAME == "dev") {
        sh "docker build -t k64-playground-backend --no-cache ."
        sh "docker tag k64-playground-backend:latest rberton/k64-playground-backend:latest"
        withCredentials([usernamePassword( credentialsId: "Dockerhub", usernameVariable: "USERNAME", passwordVariable: "PASSWORD")]) {
          sh "docker login -u ${USERNAME} -p ${PASSWORD}"
          sh "docker push rberton/k64-playground-backend:latest"
        }
        sh "docker rmi k64-playground-backend"
      }
    }
  }
  catch (err) {
    throw err
  }
}