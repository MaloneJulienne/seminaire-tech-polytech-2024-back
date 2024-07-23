export default class UserCannotBeRegisteredException extends Error {
  constructor() {
    super('User cannot be registered.');
  }
}
