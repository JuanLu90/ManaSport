import { TAction } from '../actionTypes';
import { IQualification } from '../interfaces';


export const QualificationReducer = (
    state: IQualification[] = [],
    action: TAction
): IQualification[] => {
    if (action.type === "SET_QUALIFICATION") {
        return action.qualification;
    }
    return state;
};