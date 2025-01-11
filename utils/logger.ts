import { User } from "next-auth";

const logger = (action: string, user?: User) => {
  let message = `An error occurred during this action:\n    ${action}.`;

  if (user)
    message = `${message}\n\nUser of this action:\n    ID: ${user.id}\n    EMAIL: ${user.email}`;

  console.error(message);
};

export { logger };
