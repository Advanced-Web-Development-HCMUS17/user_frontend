export const LOBBY_EVENT = {
  CREATE_LOBBY: 'lobby/create',
  JOIN_LOBBY: 'lobby/join',
  LIST_LOBBY: 'lobby/list',
  NEW_LOBBY: 'lobby/new',
  DELETE_LOBBY: 'lobby/delete',
  LEAVE_LOBBY: 'lobby/leave',
  LOBBY_INFO: 'lobby/info',
}

export const GAME_EVENT = {
  GAME_READY: 'game/ready',
  GAME_START: 'game/start',
  SEND_MOVE: 'game/send',
  GAME_END: 'game/end'
}

export const HOME_EVENT = {
  GET_LOBBIES: 'home/lobbies',
}

export const REPLAY_EVENT = {
  GET_LOBBIES: 'replay/lobbies',
  
}

export const PLAYER_1 = "p1";

export const PLAYER_2 = "p2";

export const CHAT_EVENT = {
  SEND_MESSAGE: 'chat/ClientToServerMessage',
  RECEIVE_MESSAGE: 'chat/ServerToClientMessage'
}