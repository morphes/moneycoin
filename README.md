node app.js

npm install -g less
npm install -g uglify-js
npm install -g less-plugin-clean-css

lessc public/less/styles.less public/css/styles.css
lessc --clean-css public/less/bootstrap/bootstrap.less public/css/bootstrap.css
