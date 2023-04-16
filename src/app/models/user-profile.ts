export interface ProfileUser {
    uid: string;
    name?: string;
    email?: string;
    password?: string;
    displayName?: string;

    //Leaderboards
    memoryLaneScore?: number;
    speedsterScore?: number;

    // Achivements
    guessAnimalScore5?: boolean;
    guessAnimalScore10?: boolean;
    finishMemoryLane?: boolean;
    memoryLaneScore10?: boolean;
    finishSpeedster?: boolean;
    speedsterScore25?: boolean;

}