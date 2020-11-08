import { Field, InputType, ObjectType } from "type-graphql/dist/decorators";

@InputType("EmailAddressInput")
@ObjectType("EmailAddress")
export class EmailAddress {
    /**
     * The email address.
     */
    @Field({ nullable: true })
    address?: string;
    /**
     * The name part of the email/group.
     */
    @Field()
    name!: string;
    /**
     * An array of grouped addresses.
     */
    @Field(type => [EmailAddress], { nullable: true })
    group?: EmailAddress[];
}