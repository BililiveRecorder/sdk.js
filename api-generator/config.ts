export const swaggerUrl =
  process.env.SWAGGER_URL || "http://localhost:1453/swagger/brec/swagger.json";

export const tab = "  ";

export const header = `//
// DO NOT EDIT THIS FILE
//
// It is automatically generated by "src/api-generator"
//
`;

export const knownEnums: Record<string, string> = {
  RestApiErrorCode: `export enum RestApiErrorCode {
  // 错误
  Unknown = -1,
  // 房间号不在允许的范围内
  RoomidOutOfRange = -2,
  // 房间已存在
  RoomExist = -3,
  // 房间不存在
  RoomNotFound = -4,
}`,
  CuttingMode: `export enum CuttingMode {
  // 禁用
  Disabled = 0,
  // 根据时间切割
  ByTime = 1,
  // 根据文件大小切割
  BySize = 2,
}`,
  RecordMode: `export enum RecordMode {
  Standard = 0,
  RawData = 1,
}`,
  AllowedAddressFamily: `export enum AllowedAddressFamily {
  System = -1,
  Any = 0,
  Ipv4 = 1,
  Ipv6 = 2,
}`,
  FileNameTemplateStatus: `export enum FileNameTemplateStatus {
  Success = 0,
  TemplateError = 1,
  OutOfRange = 2,
  FileConflict = 3,
}`

};

export const apiRenameMap: Record<string, string> = {
  "/api/config/default.get": "getDefaultConfig",
  "/api/config/global.get": "getGlobalConfig",
  "/api/config/global.post": "setGlobalConfig",
  "/api/room.get": "listRooms",
  "/api/room.post": "addRoom",
  "/api/room/{roomId}.delete": "removeRoomByRoomId",
  "/api/room/{roomId}.get": "getRoomByRoomId",
  "/api/room/{objectId}.delete": "removeRoomByObjectId",
  "/api/room/{objectId}.get": "getRoomByObjectId",
  "/api/room/{roomId}/stats.get": "statsRoomByRoomId",
  "/api/room/{objectId}/stats.get": "statsRoomByObjectId",
  "/api/room/{roomId}/iostats.get": "getRoomIoStatsByRoomId",
  "/api/room/{objectId}/iostats.get": "getRoomIoStatsByObjectId",
  "/api/room/{roomId}/config.get": "getRoomConfigByRoomId",
  "/api/room/{roomId}/config.post": "setRoomConfigByRoomId",
  "/api/room/{objectId}/config.get": "getRoomConfigByObjectId",
  "/api/room/{objectId}/config.post": "setRoomConfigByObjectId",
  "/api/room/{roomId}/start.post": "startRecordByRoomId",
  "/api/room/{objectId}/start.post": "startRecordByObjectId",
  "/api/room/{roomId}/stop.post": "stopRecordByRoomId",
  "/api/room/{objectId}/stop.post": "stopRecordByObjectId",
  "/api/room/{roomId}/split.post": "splitRecordByRoomId",
  "/api/room/{objectId}/split.post": "splitRecordByObjectId",
  "/api/room/{roomId}/refresh.post": "refreshRoomByRoomId",
  "/api/room/{objectId}/refresh.post": "refreshRoomByObjectId",
  "/api/version.get": "getVersion",
  "/api/file.get": "getFile",
  "/api/misc/generatefilename.post": "generateFilename"
};
