rm -rf ../zoo-backend/public/*.js
rm -rf ../zoo-backend/public/*.png
rm -rf ../zoo-backend/public/img
rm -rf ../zoo-backend/public/static
yarn run build && cp -r build/* ../zoo-backend/public && cd ../zoo-backend/public && mv index.html ../resources/views/main.blade.php
