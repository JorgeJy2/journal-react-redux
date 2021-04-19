import { types } from "../types/types";
import { finishLoading, removeError, setError, startLoading } from "./ui";

describe('test in ui actions', ()=>{
    test('should all acctions works', ()=>{
        const action = setError('test error');
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'test error'
        });
    });
    const removeErrorAction = removeError();

    expect(removeErrorAction).toEqual({
        type: types.uiRemoveError
    });
    const startLoadingAction = startLoading();

    expect(startLoadingAction).toEqual({
        type: types.uiStartLoading
    });
    const finishLoadingAction = finishLoading();

    expect(finishLoadingAction).toEqual({
        type: types.uiFinishLoading
    });
});