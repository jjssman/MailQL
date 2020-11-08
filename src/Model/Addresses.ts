import { Field, InputType, ObjectType } from "type-graphql/dist/decorators";
import { EmailAddress } from "./EmailAddress";

@InputType("AddressesInput")
@ObjectType("Addresses")
export class Addresses {
    /**
     * An array with address details.
     */
    @Field(type => [EmailAddress])
    value!: EmailAddress[];
    /**
     * A formatted address string for HTML context.
     */
    @Field()
    html!: string;
    /**
     * A formatted address string for plaintext context.
     */
    @Field()
    text!: string;
}