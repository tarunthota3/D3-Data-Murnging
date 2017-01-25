node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute-immersive-wave/js_dev_boilerplate.git', branch: "${env.BRANCH_NAME}"

  stage 'Installing Dependencies'
  sh "npm prune"
  sh "npm install"

  try {
    stage 'Linting'
    sh "npm run build"

    stage 'Testing'
    sh "npm run test"
  } finally {
    

    stage 'Creating Report Artifact'
    sh "mv htmlhint-output.html output/htmlhint-output.html"
    step([$class: 'ArtifactArchiver', artifacts: 'output/*.html', fingerprint: true])
  }
}