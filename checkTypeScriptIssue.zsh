#!/bin/zsh
# -*- coding: UTF8 -*-

# The corresponding issue is:
#   https://github.com/Microsoft/TypeScript/issues/21444
# « Problem with --watch option with a tsconfig.json « "include": ["app/**/*.ts"] »
# THIS SCRIPT ISN'T A PROOF OF THE ISSUE MENTIONNED ABOVE !!!
# WITH THIS SCRIPT WE CAN'T PROOVED BUG  WITH TYPESCRIPT@2.6.2 !!
# In previous versions of this script, I'VE FORGOTTEN TO ADD `sleep 5`
#       after: `console.log('') >> $fileAppTS`
# I confirm that with typescript@2.6.2, steps explained at
#       https://github.com/Microsoft/TypeScript/issues/21444#issue-292209455 are confirmed.
# ≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠

# color for the consol output
RED='\033[0;31m'
NC='\033[0m' # No Color

# Some constants used in this script
folder="${HOME}/essaiTS"
fileAppTS="${folder}/app/file.ts"
fileAppJS="${folder}/app/file.js"
cmdNodeTsc='node node_modules/typescript/bin/tsc'
nodeTscWatch="${cmdNodeTsc} --watch --listFiles --listEmittedFiles \
    --extendedDiagnostics &"

# Test if ${folder} is empty
if [ -e ${folder} ]
then
    echo -n ${RED}"Please delete ${folder}"${NC}
    return 14
fi

# Test if you have the software yarn
which yarn
if [ `echo $?` -ne 0 ]
then
    echo -n ${RED}"Please install yarn and node before running this \
    script.\n\n"${NC}
    return 15
fi

# Create three files for this very small project
mkdir -p ${folder}/app
cd ${folder}
pwd
cat << EOF > ${folder}/tsconfig.json
{
    "include": [ "app/**/*.ts"
    ]
}
EOF
cat << EOF > ${fileAppTS}
console.log('');
EOF
cat << EOF > ${fileAppJS}
console.log('');
EOF

# Add TypeScript
yarn add typescript@2.6.2

# Start tsc in watch mode, then after 10 seconds modify the file ${fileAppTS}
echo -n "\$ ${nodeTscWatch}\n"
eval "${nodeTscWatch}"
sleep 10
cat << EOF >> ${fileAppTS}
console.log('');
EOF

# kill typescript after 5 seconds
sleep 5
echo -n '\n\n---Stopping Typescript compiler---\n'
kill $!
echo -n "done\n\n"

# Compare and print files ${fileAppTS} and ${fileAppJS}
diffCommand="diff ${fileAppTS} ${fileAppJS}"
echo ${diffCommand}
eval ${diffCommand}
isDiff=`echo $?`
echo "echo \$? = " $isDiff
if [ $isDiff -eq 0 ]
then
    echo ${RED}"${fileAppTS} ${fileAppJS} are the same. It's normal"${NC}
else
    echo ${RED}"${fileAppTS} ${fileAppJS} are different. Not normal"${NC}
fi
echo -n '\n\n'
echo "File ${fileAppTS}"
echo '≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠'
cat ${fileAppTS}
echo '---End of file--'
echo -n '\n\n'
echo "File ${fileAppJS}"
echo '≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠'
cat ${fileAppJS}
echo '---End of file--'

# Print TypeScript version
echo -n '\n--Done---\n\n'
echo -n ${RED}'Your typescript version is: '
eval "${cmdNodeTsc} --version"
echo ${NC}
