[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/YaVoyCuba/yavoy-frontend-react/blob/main/README.md)

# YaVoy - frontend

![react](https://img.shields.io/badge/react-3670A0?style=for-the-badge&logo=react&logoColor=red)
![redux](https://img.shields.io/badge/redux-darkgreen?style=for-the-badge&logo=redux&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## 📋 Pre-Requirements

* [Nodejs v14](https://nodejs.org/en)
* [Git](https://git-scm.com/downloads)

### 🔧 Development
```bash
npm run dev
```

### 🚀 Deployment
To install packages need to run this command:
```bash
npm i 
```

To build an application to host on hestiacp run:
```bash
npm run hestiacp 
```
> The above command places the compiled files in the `public_web` folder instead of `dist`

### 🚀 Deployment in hestiacp -- mode dev --
After adding a web domain from the hestiacp panel, we move to the root directory of the created domain:
```bash
 cd ~/web/webdomainfolder/
```
remove public_html folder:
```bash
 rm -R ./public_html
```
Clone the repository:
```bash
git clone https://github.com/YaVoyCuba/yavoy-frontend-react.git public_html
```

```bash
 cd ./public_html
```

```bash
 cp .env.development .env.production.local
```
> With this we ensure that when building the app (`npm run hestiacp`) it connects to the __development__ endpoint (https://dev.yavoycuba.com/api).

To build run:
```bash
npm run hestiacp 
```

#### Avoid 404 error after page refresh in __Apache__

To create .htaccess file run:
```bash
touch public_web/public/.htaccess
```

```bash
nano public_web/public/.htaccess
```
Update the .htaccess file to be like this:
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
It will get copied to the build folder when you run `npm run hestiacp` or `npm run build`.

[Read more](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing)

#### Other commands
##### Detecting Updates with ncu
Using the ncu tool we can also detect which packages have newer versions:
```bash
ncu
```
To upgrade the “request” package to its newest major version, we could do the following:
```bash
ncu --upgrade package-name-to-upgrade
```

## 📄 Conditions

## Utils

## 📄 Docs
* [react-developer-tools](https://react.dev/learn/react-developer-tools)
* [vite - env-and-mode](https://vitejs.dev/guide/env-and-mode.html)
* [adding-custom-environment-variables](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used)
### Best practices 
* [best-practices-for-using-react-redux](https://reintech.io/blog/best-practices-for-using-react-redux)

## URLS
* [front dev](http://frontdev.yavoycuba.com/)
* [front prod](http://yavoycuba.com/)
### Social Media
