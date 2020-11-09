import { Field, InputType, ObjectType } from "type-graphql/dist/decorators";
import { EmailAddress } from "./EmailAddress";

@InputType("AddressesInput")
@ObjectType("Addresses")
export class Addresses {
    /**
     * An array with address details.
     */
    @Field(type => [EmailAddress], {description: 'An array with address details.'})
    value!: EmailAddress[];
    /**
     * A formatted address string for HTML context.
     */
    @Field({ description: 'A formatted address string for HTML context.' })
    html!: string;
    /**
     * A formatted address string for plaintext context.
     */
    @Field({ description: 'A formatted address string for plaintext context.' })
    text!: string;
}