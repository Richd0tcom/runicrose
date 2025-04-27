import { Model, ModelObject, RelationMappings, RelationMappingsThunk, mixin } from "objection";
import mixins, { modelUnique, modelUuid } from ".";
import { Role } from "../../common/enums";
import { DBErrors } from "objection-db-errors";
import visibility from 'objection-visibility';



class User extends mixins(Model) {
    // [x: string]: any;
    static tableName: string = 'users';

    public readonly id: string;
    public email: string;
    public password: string;
    public role: Role;
    public is_email_verified: boolean;
    public full_name: string;
    public is_deleted: boolean;

    public created_at: Date | string;
    
    static hidden = ["password",] 
    // static query(...args: any) {
    //     return super.query(...args).throwIfNotFound();
    //   }
}

// export type UserT = ModelObject<User>
export default User