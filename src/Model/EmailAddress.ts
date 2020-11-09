import { Field, InputType, ObjectType } from "type-graphql/dist/decorators";

@InputType("EmailAddressInput")
@ObjectType("EmailAddress")
export class EmailAddress {
    /**
     * The email address.
     */
    @Field({ nullable: true, description: 'The email address.' })
    address?: string;
    /**
     * The name part of the email/group.
     */
    @Field({description: 'The name part of the email/group.'})
    name!: string;
    /**
     * An array of grouped addresses.
     */
    @Field(type => [EmailAddress], { nullable: true, description: 'An array of grouped addresses.' })
    group?: EmailAddress[];
}