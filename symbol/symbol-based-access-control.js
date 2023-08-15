function Role(name, permissions) {
  this.name = name;
  this.permissions = permissions;
}

const readPermission = Symbol("read");
const writePersmission = Symbol("write");

const adminRole = new Role("Admin", [readPermission, writePersmission]);
const userRole = new Role("User", [readPermission]);

function User(name, roles) {
  this.name = name;
  this.roles = roles;
}

const adminUser = new User("Admin User", [adminRole]);
const regUser = new User("Regular User", [userRole]);

function canAccess(user, permission) {
  return user.roles.some((role) => role.permissions.includes(permission));
}

console.log(canAccess(adminUser, readPermission));
console.log(canAccess(regUser, writePersmission));
