import {
  GetContentError,
  CreateOrUpdateContentError,
  DeleteContentError,
  GitHubAppSuspendedOrNotInstalledError,
  UnauthorizedRequestToPRBridgeServiceError,
  MissingChangelogPrBridgeApiKeyError,
  MissingChangelogPrBridgeUrlDomainError,
} from "../errors/index.js";

export const handleChangelogPRBridgeResponseErrors = (error, crudOperation) => {
  console.log("error status: ", error.status);
  console.log(error);
  switch (error.status) {
    case 404:
      console.error(`File '${path}' not found.`);
      return;
    case 401:
      throw new UnauthorizedRequestToPRBridgeServiceError();
    case 403:
      throw new GitHubAppSuspendedOrNotInstalledError();
    case 422:
      if ((error.name = "GitHubAppSuspendedOrNotInstalledError")) {
        throw new MissingChangelogPrBridgeApiKeyError();
      } else {
        throw new MissingChangelogPrBridgeUrlDomainError();
      }
    default:
      if (crudOperation === "READ") {
        throw new GetContentError();
      } else if (crudOperation === "DELETE") {
        throw new DeleteContentError();
      } else {
        throw new CreateOrUpdateContentError();
      }
  }
};
