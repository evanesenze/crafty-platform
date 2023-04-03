import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/modules/users/schemas/user.schema";


export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return data ? user?.[data] : user;
  }
)

