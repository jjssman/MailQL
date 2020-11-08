import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker = (
    { root, args, context, info },
    roles,
  ) => {
    if(roles.includes('localhost')){
        const ip = (<any> context).req.connection.remoteAddress;
        if(!(['127.0.0.1','::ffff:127.0.0.1','::1','localhost'].includes(ip)))
            return false;
    }
    return true;
  };