import { JOB_NAME_OF_MAFIA } from "../../../contants/Job";

export const getIsMafiaVictory = (killPersonName, players) => {
    let flag = false;
    if (killPersonName) {
        const after = players
            .filter(player => player.get('name') !== killPersonName)

        const mafias = after.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
        const citizens = after.filter(player => player.get('jobName') !== JOB_NAME_OF_MAFIA)

        if (mafias.size >= citizens.size) {
            flag = true
        }
    }
    return flag;
}

export const getMafiaArray = (mafiaVotes) => Object.values(mafiaVotes).reduce(
    (prev, cur) => !!prev[cur] ? { ...prev, [cur]: prev[cur] + 1 } : { ...prev, [cur]: 1 }
    , {})

export const getSetSaveByDoctor = doctorVotes => new Set(Object.values(doctorVotes))

export const getIsRevoted = mafiaArray => {
    let max = 0;
    let flag = false;
    for (let key in mafiaArray) {
        if (max < mafiaArray[key]) {
            max = mafiaArray[key]
            flag = false
        } else if (max === mafiaArray[key]) {
            flag = true
        }
    }
    return flag
}

export const getKillPersonName = (mafiaArray, set) => {
    let killPersonName = Object.keys(mafiaArray).reduce((acc, cur) => mafiaArray[acc] < mafiaArray[cur] ? cur : acc)

    return set.has(killPersonName) ? null : killPersonName
}

