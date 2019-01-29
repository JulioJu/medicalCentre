#!/bin/bash -
# -*- coding: UTF8 -*-

#===============================================================================
#
#          FILE: ScriptStartOSRM.sh
#
#         USAGE: ./ScriptStartOSRM.sh
#
#   DESCRIPTION: See README
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: https://github.com/JulioJu
#  ORGANIZATION:
#       CREATED: 01/29/2019 17:55
#      REVISION:  ---
#===============================================================================

trap 'kill' HUP
trap 'kill' INT
trap 'kill' QUIT
trap 'finishError "$LINENO"' ERR
trap 'finish' EXIT
# Cannot be trapped
# trap 'kill' KILL
trap 'kill' TERM

# set -euET
set -euET
# Note: `set +E' doesn't work
# set -x

close() {
    # "_" is the throwaway variable
    read -r -t 1 -n 10000 _ || echo ""
    read -r -p "Press 'ENTER' to close"
}

kill() {
    set +x
    1>&2 echo -e "\\n\\n\\n""${URED}""Killed by user""${NC}""\\n\\n"
    exit 130
}

finishError() {
    set +x
    1>&2 echo "In the script, error on line: '$1'"
    exit 2
    # Otherwise, all script it's executed
}

finish() {
    returnCode=$?

    while read -r i ; do
        kill "$i" || echo "\`kill '$i'' is failed. Probably already terminated."
    done < <(jobs -p)

    set +x
    if [[ "${returnCode}" -gt 0 ]] ; then
        1>&2 echo -e "\\n\\n\\n${URED}ERROR" \
            "with code '${returnCode}'${NC}\\n\\n"
        close
    else
        echo -e "\\n\\n\\n""${URED}""SUCCESS""${NC}""\\n\\n"
        close
    fi
    echo -e "\n\n\n"
}

error() {
    set +x
    1>&2 echo -e "\\n\\n\\n${URED}ERROR:" "${@:2}" "${NC}\\n\\n"
    exit "${@:1:1}"
}

testWorkingFolder() {
    local -i profileFileNameArrayIndex=0
    while [[ ${profileFileNameArrayIndex} -lt "${#profileFileNameArray[*]}" ]]
    do
        local profileFile="*-${profileFileNameArray[profileFileNameArrayIndex]}/*.osrm"
        local -i numberOfProfileFile=
        numberOfProfileFile="$(wc -l < <(find . -path  "${profileFile}"))"
        if [[ "${numberOfProfileFile}" -eq 0 ]]
        then
            error 5 "The file '${profileFile}' not found."
        fi
        if [[ "${numberOfProfileFile}" -gt 1 ]]
        then
            error 5 "${numberOfProfileFile} files match the pattern" \
                "'${profileFile}'. Only one match should be found."
        fi
        local -i port=500${profileFileNameArrayIndex}
        if grep "${port}" < <(ss -nap)
        then
            grep "${port}" < <(ss -nap)
            error 6 "port '${port}' busy."
        fi
        profileFileNameArrayIndex=$((profileFileNameArrayIndex+1))
    done
}

main() {
    local -a profileFileNameArray=(bicycle foot car)

    set +x
    testWorkingFolder
    set -x

    local -i profileFileNameArrayIndex=0
    while [[ ${profileFileNameArrayIndex} -lt "${#profileFileNameArray[*]}" ]]
    do
        local profileFile="*-${profileFileNameArray[profileFileNameArrayIndex]}/*.osrm"
        fileOsrm="$(find . -path  "${profileFile}")"
        osrm-routed --algorithm=MLD "${fileOsrm}" \
            -p 500$((profileFileNameArrayIndex+5)) &
        profileFileNameArrayIndex=$((profileFileNameArrayIndex+1))
    done
    sleep 5

    set +x
    echo -e "\n\n${URED} Type <Ctrl-c> to kill \`osrm-route'" \
        "or close the current Terminal${NC}\n\n"
    wait
}

echo -e "\n\nStart of Script\n============\n"

# shellcheck disable=SC2154
export PS4='${debian_chroot:+($debian_chroot)}'\
'\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] [\D{%T}] \$ '
# declare -g -r PS4Light="\\033[1;32m""$USER@""$HOSTNAME""\\033[0m"": "

declare -g -r URED="\\033[4;31m"
declare -g -r NC="\\033[0m"

declare -g DIR_WORKING
DIR_WORKING="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P)/../osrm"
cd -P "${DIR_WORKING}"

set -x
time main "${@}"
