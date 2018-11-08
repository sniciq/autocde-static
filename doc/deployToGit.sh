#!/bin/bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
cd /MyCode/git/autocode/doc/gulp/
gulp
echo 'gulp finished'
cd /MyCode/git/autocode
mvn clean install '-Dmaven.test.skip=true' -Ppublish
echo 'mvn install finished'
rm -rf /MyCode/git/autocode_bd/ROOT.war
mv /MyCode/git/autocode/target/autocode.war /MyCode/git/autocode_bd/ROOT.war
echo 'copy war finished'
cd /MyCode/git/autocode_bd/
git add -A
git commit -m "upgrade_`date +%Y-%m-%d_%H:%M:%S`"
git push
echo 'ok'
