#!/bin/bash -
# -*- coding: UTF8 -*-

#===============================================================================
#
#          FILE: ScriptGeneratePbfFile.sh
#
#         USAGE: ./ScriptGeneratePbfFile.sh
#
#   DESCRIPTION: see README.md
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: https://github.com/JulioJu
#  ORGANIZATION:
#       CREATED: 01/29/2019 11:01
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
    if [[ -n "${filePbfBasename+x}" ]] && [[ -e "${filePbfBasename}" ]]
    then
        echo -e "\n\n ${URED} Info: ${NC}" \
            "The fat size file '${filePbfBasename}' could be deleted." \
            "\n\n"
    fi
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
    error 5 "${NC}Should have at least one arguments, and max two." \
        "\n\t* First one: name of the country to build" \
            "(e.g. europe-latest, europe/france-latest" \
            " or europe/france/rhone-alpes-latest )." \
        "\n\t* Second one (optional): location of the profile folder." \
            "Default is /usr/share/osrm/profiles, for the ArchLinux package." \
        "\n\t* Note 1: it will be build in '${DIR_SCRIPT}'." \
        "\n\t* Note 2: If you have not enough disk space in '${DIR_SCRIPT}' " \
            "\n\t\tcreate a symlink to an other empty folder in an other" \
            "partition (e.g " \
            " \n\t\t\t \`ln -s /media/user/xxx '${DIR_SCRIPT}'').\n\n"
}

testCommandLine(){
    if [[ $# -ne 1 ]] && [[ $# -ne 2 ]]
    then
        usage
    fi
}

convertBitToGB() {
    local -n sizeGB="${1}"
    # shellcheck disable=SC2034
    sizeGB=$(awk '{ byte =$1 /1024/1024/1024; print byte " GB" }' <<< "${2}")
}

testDiscSpace() {
    sizeLine=${sizeLine/"$curlSizePatern: "/}
    local -ri sizeFileToDownload=${sizeLine//[$'\t\r\n']}
    local -i sizeNeeded
    sizeNeeded=$(awk '{ size=$1 * 14 ; print size }' \
        <<< "${sizeFileToDownload}")

    local -i sizeLocalFileSystemAvailable
    sizeLocalFileSystemAvailable=$(awk '{print $4}' < <(tail -n 1 < \
        <(df --block-size=1 .)))

    local sizeFileToDownloadGB
    convertBitToGB sizeFileToDownloadGB "${sizeFileToDownload}"
    local sizeNeededGB
    convertBitToGB sizeNeededGB "${sizeNeeded}"

    local -ar echoDiskSpace=("\n\tFile to download at ${urlFileToDownload}:" \
                " ${sizeFileToDownloadGB}" \
            "\n\tFile generated by the script: maybe around ${sizeNeededGB}" \
            "\n\tDisk space in the current file system at '${DIR_WORKING}': " \
                "\n$(df -h .)" )

    if [[ ${sizeNeeded} -lt $sizeLocalFileSystemAvailable ]]
    then
        echo -e "So cool, enough disk space ${echoDiskSpace[*]}"
    else
        error 26 "Not enough disk space. ${NC} ${echoDiskSpace[*]}" \
            "\n\tCreate a symlink to an other empty folder in an other" \
                "partition (e.g \`ln -s /media/user/xxx  " \
                "${DIR_SCRIPT}/../osrm').\n\n"
    fi
}

testUrl() {
    # Test url (${1} of command line)

    local sizeLine
    local -r curlSizePatern="Content-Length"

    # note tat `wget' return with error code when error 404
    if sizeLine=$(grep "^${curlSizePatern}" < \
        <(curl --head --fail "$urlFileToDownload"))
    then
        :
    else
        error 25 "Fail to download page with URL '${urlFileToDownload}'."
    fi

    testDiscSpace
}

testProfilFolder() {
    # Test ${2} (or its default value) of command line : profile file

    local -i profileFileNameArrayIndex=0
    while [[ ${profileFileNameArrayIndex} -lt "${#profileFileNameArray[*]}" ]]
    do
        local profileFile="${dirOSRMProfile}/${profileFileNameArray[profileFileNameArrayIndex]}.lua"
        if [[ ! -f "${profileFile}" ]]
        then
            error 5 "OSRM profile file '${profileFile}' doesn't exit"
        fi
        profileFileNameArrayIndex=$((profileFileNameArrayIndex+1))
    done
}

buildProfile() {
    local -r profile=${1}
    local -r dirProfile="${DIR_WORKING}/${country}-${profile}"
    local -r fileOsrm="${country}.osrm"

    mkdir "${dirProfile}"
    mv "${filePbfBasename}" "${dirProfile}"

    pushd "$dirProfile"

    osrm-extract "${filePbfBasename}" -p "${dirOSRMProfile}/${profile}.lua"
    osrm-partition "${fileOsrm}"
    osrm-customize "${fileOsrm}"
    # start the server
    # osrm-routed --algorithm=MLD "${fileOsrm}"

    mv "${filePbfBasename}" ../

    popd
}

main() {
    local -r fileToDownload="${1}.osm.pbf"

    local -r urlFileToDownload="https://download.geofabrik.de/${fileToDownload}"

    local country
    country="$(basename "${1}")"

    local filePbfBasename
    filePbfBasename="$(basename "${1}").osm.pbf"

    local dirOSRMProfile
    if [[ -n "${2+n}" ]]
    then
        dirOSRMProfile="${2}"
    else
        # For Arch ArchLinux users
        dirOSRMProfile="/usr/share/osrm/profiles"
    fi

    local -a profileFileNameArray=(bicycle foot car)

    set +x

    if [[ ! -L "${DIR_WORKING}" ]]
    then
        mkdir "${DIR_WORKING}"
        cd "${DIR_WORKING}"
    else
        cd -P "${DIR_WORKING}"
        DIR_WORKING="$(pwd -P)"
        if [[ $(wc -l < <(find . -maxdepth 1 ! -path "." )) -ne 0 ]]
        then
            error 30 "'${DIR_WORKING} non empty'"
        fi
    fi

    # Test url (${1} of command line)
    testUrl
    # Test ${2} (or its default value) of command line : profile files
    testProfilFolder

    set -x

    wget "${urlFileToDownload}"
    wget "${urlFileToDownload}.md5"
    md5sum -c "${filePbfBasename}.md5"

    local -i profileFileNameArrayIndex=0
    while [[ ${profileFileNameArrayIndex} -lt "${#profileFileNameArray[*]}" ]]
    do
        buildProfile \
            "${profileFileNameArray[profileFileNameArrayIndex]}"
        profileFileNameArrayIndex=$((profileFileNameArrayIndex+1))
    done
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
declare -g DIR_SCRIPT
DIR_SCRIPT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P)"

echo -e "Will be build in '${DIR_WORKING}'.\n\n"

testCommandLine "${@}"

set -x
time main "${@}"