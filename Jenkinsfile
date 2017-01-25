node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute-immersive-wave/js_dev_boilerplate.git', branch: "${env.BRANCH_NAME}"

  stage 'Installing Dependencies'
  sh "npm prune"
  sh "npm install"

  stage 'Testing'
  sh "npm run test"
 
}