server_dir=${PWD##*/}
admin_app_dir="bauapp"
deployment_dir="baudeploy"

cd ../
[ -d $deployment_dir ] || mkdir $deployment_dir
cd $deployment_dir
if !([ -d .git ]); then
    git init
    heroku git:remote -a bau-app
fi;
cd "../${server_dir}"
tsc
yes | cp -rf package.json "../${deployment_dir}"
yes | cp -rf package-lock.json "../${deployment_dir}"
yes | cp -rf build "../${deployment_dir}"


cd "../${deployment_dir}"
git add .
git commit -m 'deploy'
git push heroku master