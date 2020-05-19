npm run-script build
git clone git@github.com:esb-music/esb-music.github.io.git
cp -R build/* esb-music.github.io 
cd esb-music.github.io
git add -A
git commit -m "$1"
git push origin master
cd .. && rm -rf esb-music.github.io