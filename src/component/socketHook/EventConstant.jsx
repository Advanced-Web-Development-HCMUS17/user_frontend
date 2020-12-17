export const LOBBY_EVENT = {
  CREATE_LOBBY: 'lobby/create',
  JOIN_LOBBY: 'lobby/join',
  LIST_LOBBY: 'lobby/list',
  NEW_LOBBY: 'lobby/new',
  DELETE_LOBBY: 'lobby/delete',
  LEAVE_LOBBY: 'lobby/leave',
  LOBBY_INFO: 'lobby/info',
  SEND_MOVE: 'lobby/sendToServer',
  RECEIVE_MOVE: 'lobby/sendToClient'
}

export const PLAYER_1 = "p1";

export const PLAYER_2 = "p2";

export const CHAT_EVENT = {
  SEND_MESSAGE: 'chat/ClientToServerMessage',
  RECEIVE_MESSAGE: 'chat/ServerToClientMessage'
}