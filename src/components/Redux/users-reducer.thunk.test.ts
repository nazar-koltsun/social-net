import { APIResponseType, ResultCodeEnum } from '../../api/api';
import { usersApi } from '../../api/users-api';
import { actions, follow, unFollow } from './users-reducer';

jest.mock('../../api/users-api');
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersApiMock.follow.mockClear();
    usersApiMock.unFollow.mockClear();
})


const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

usersApiMock.follow.mockReturnValue(Promise.resolve(result));
usersApiMock.unFollow.mockReturnValue(Promise.resolve(result));

test('success follow thunk', async () => {
    const thunk = follow(1);
    
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
})

test('success unFollow thunk', async () => {
    const thunk = unFollow(1);
    
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
})