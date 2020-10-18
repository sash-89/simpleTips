import { createSelector } from 'reselect';

const roomsData = state => state.organizationReducer.rooms;
const currentRoomData = state => state.organizationReducer.currentRoom;
const modalToggleForAttachingRoomByUserData = state => state.organizationReducer.modalToggleForAttachingRoomByUser;
const userRoomListData = state => state.organizationReducer.userRoomList;

export const roomsSelector = createSelector(roomsData, data => data.sort((a, b)=>a.number - b.number));
export const currentRoomSelector = createSelector(currentRoomData, data => data);
export const modalToggleForAttachingRoomByUserSelector = createSelector(modalToggleForAttachingRoomByUserData, data => data);

export const userRoomListSelector = createSelector(userRoomListData, data => data.sort((a, b)=>a.floorNumber - b.floorNumber).map(list => ({...list, rooms: list.rooms.sort()})));