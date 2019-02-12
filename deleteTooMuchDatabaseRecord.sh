#!/bin/bash
# -*- coding: UTF8 -*-

#===============================================================================
#
#         USAGE: See README.md
#
#   DESCRIPTION: Not very useful, just for fun. Use mongo shell instead.
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: http://github.com/JulioJu
#  ORGANIZATION:
#       CREATED: 12/13/2018 17:26
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
    # sleep 2
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

usage() {
    error 5 "${NC}Should have one or two arguments." \
        "\n\t* First one: name 'mongonative' or 'mongoose' to indicate which" \
            "one to delete." \
        "\n\t* Seconde one (optional): '--all': delete all records " \
        " (use mongo shell to drop database instead)."
}

testCommandLine(){
    if [[ $# -ne 1 ]] && [[ $# -ne 2 ]]
    then
        usage
    fi
    if { [[ ! ${1} = "mongonative" ]] && [[ ! ${1} = "mongoose" ]] ; }
    then
        usage
    fi
    if [[ $# -eq 2 ]]  && [[ ! ${2} = "--all" ]]
    then
        usage
    fi
}

testsBeforeStart() {
    if ! command -v nvim > /dev/null
    then
        error 9 "Please install \`nvim' with all plugins of JulioJu."
    fi
    if ! command -v js-beautify > /dev/null
    then
        error 8 "Please install \`js-beautify'."
    fi
}

deleteTooMuchDatabaseRecord() {
    entityName="${1}"
    # tmpfile=$(mktemp "/tmp/${entityName}.XXXXXX").json
    tmpfile="/tmp/${entityName}_$(date +%Y_%m_%d_%H_%M_%S_%N).json"
    echo -e "\n\n${URED}deleteTooMuchDatabaseRecord ${entityName}${NC}" \
        "\n==============\n"
    set -x
    curl --fail --silent "http://localhost:8080/${database}/${entityName}" \
        > "${tmpfile}"
    nvim --headless -c "set ts=4 sw=4 et ft=json | Neoformat | x" "${tmpfile}"
    set +x
    local -i numberOfRecords=0
    local -i numberOfRecordsToKeep=3
    local -i numberOfRecordsDeleted=0
    if [[ "${deleteAll}" -eq 1 ]]
    then
        numberOfRecordsToKeep=0
    fi
    while IFS= read -r -d $'\n\r' i
    do
        if [[ "$i" =~ ^' '+'"_id":' ]]
        then
            i="${i/    \"_id\": \"/}"
            i="${i/\",/}"
            if [[ "${i}" == '' ]]
            then
                i='null'
            fi
            if [[ ${numberOfRecords} -ge ${numberOfRecordsToKeep} ]]
            then
                set -x
                curl --fail --silent -X DELETE \
                    "http://localhost:8080/${database}/${entityName}/${i}" \
                    > /dev/null
                numberOfRecordsDeleted=$((numberOfRecordsDeleted+1))
                set +x
            else
                echo "http://localhost:8080/${database}/${entityName}/${i}" \
                    "skipped to let some entities in database."
            fi
            numberOfRecords=$((numberOfRecords+1))
        fi
    done < "${tmpfile}"
    echo -e "\n\n${URED}${numberOfRecordsDeleted}" \
        "${entityName} records are deleted${NC}"
    rm "${tmpfile}"
}

main() {
    local database="${1}"

    testsBeforeStart "${@}"

    local -i deleteAll=0
    if [[ $# -eq 2 ]]  && [[ ${2} = "--all" ]]
    then
        deleteAll=1
    fi


    deleteTooMuchDatabaseRecord nurses
    deleteTooMuchDatabaseRecord patients
}

echo -e "\n\nStart of Script\n============\n"

# shellcheck disable=SC2154
export PS4='

${debian_chroot:+($debian_chroot)}'\
'\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] [\D{%T}] \$ '
# declare -g -r PS4Light="\n\n\\033[1;32m""$USER@""$HOSTNAME""\\033[0m"": "

declare -g DIR_SCRIPT
DIR_SCRIPT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P)"
cd "${DIR_SCRIPT}"

declare -g -r URED="\\033[4;31m"
declare -g -r NC="\\033[0m"

testCommandLine "${@}"

main "${@}"
