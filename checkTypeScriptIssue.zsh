#!/bin/zsh
# -*- coding: UTF8 -*-

# The corresponding issue is:
#   https://github.com/Microsoft/TypeScript/issues/21444
# « Linux: Problem with --watch when we compile in folder outside /tmp mounted
# by systemd as tmpfs filesystem
# with tsconfig.json « "include": ["app/**/*.ts"] » »
# ≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠

RED='\033[0;31m'
NC='\033[0m' # No Color

if [ -e ~/essaiTS ]
then
    echo -n ${RED}"Please delete ~/essaiTS"${NC}
    return 14
fi

which yarn
if [ `echo $?` -ne 0 ]
then
    echo -n ${RED}"Please install yarn and node before running this \
    script.\n\n"${NC}
    return 15
fi

mkdir -p ~/essaiTS/app
cd ~/essaiTS
cat << EOF > ~/essaiTS/tsconfig.json
{
    "include": [
        "app/**/*.ts"
    ]
}
EOF
cat << EOF > ~/essaiTS/app/file.ts
console.log('');
EOF
cat << EOF > ~/essaiTS/app/file.js
console.log('');
EOF
yarn add typescript@next
node node_modules/typescript/bin/tsc --watch &
sleep 2
echo -n ${RED}'Please Wait 10 secondes:\n\n'${NC}
sleep 10
cat << EOF >> ~/essaiTS/app/file.ts
console.log('');
EOF
diffCommand='diff ~/essaiTS/app/file.ts ~/essaiTS/app/file.js'
echo $diffCommand
eval $diffCommand
isDiff=`echo $?`
echo "echo \$? = " $isDiff
if [ $isDiff -eq 0 ]
then
    echo ${RED}'~/essaiTS/app/file.ts et ~/essaiTS/app/file.js sont identiques \
        ça ne me convient pas du tout$ :(.'${NC}.
else
    echo ${RED}'~/essaiTS/app/file.ts et ~/essaiTS/app/file.js sont différents.\
        Trop de la balle pour moi!!!'${NC}
fi
echo -n '\n\n'
echo 'Contenu du fichier ~/essaiTS/app/file.ts'
echo '≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠'
cat ~/essaiTS/app/file.ts
echo '---fin du fichier--'
echo -n '\n\n'
echo 'Contenu du fichier ~/essaiTS/app/file.js'
echo '≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠'
cat ~/essaiTS/app/file.js
echo '---fin du fichier--'

echo -n '\n\n---Stopping Typescript compiler---'
kill $!
echo -n '\n--Done---\n\n'
echo -n ${RED}'Your typescript version is: '\
    `eval 'node node_modules/typescript/bin/tsc\
    --version'`'\n\n'
echo 'Please send me the reslut :-)'${NC}
