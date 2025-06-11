import { IRider } from "./rider";

export interface IRiderStats{
    rider: IRider,
    riderStartingNumber: number,
    riderResults: string,
    riderHomeAway: string,
    isEdit: boolean
}