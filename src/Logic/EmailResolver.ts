
import { IsEmail } from "class-validator";
import { Arg, Args, ArgsType, Authorized, Field, Mutation, PubSub, Query, Resolver, Root, Subscription } from "type-graphql/dist/decorators";
import { Publisher } from "type-graphql/dist/interfaces/Publisher";
import { EmailInput, EmailOutput } from "../Model/Email";
import { DatabaseService } from "./DatabaseService";

@ArgsType()
class MailboxArgs {

    @Field()
    @IsEmail({ domain_specific_validation: true }, {
        message: 'Invalid email inbox',
    })
    mailbox!: string;

}

@ArgsType()
class PushEmailArgs {

    @Field()
    email!: EmailInput;

}

@Resolver(EmailOutput)
export class EmailResolver {

    db: DatabaseService;

    constructor() { 
        this.db = new DatabaseService();
    }

    @Query(returns => EmailOutput)
    async getEmail(@Arg("id") id: Number) {
        const email = await this.db.findById(id);
        if (email === undefined) {
            throw new Error('Email not found with id '+id);
        }
        return email;
    }

    @Query(returns => [EmailOutput])
    async getEmails(@Args() { mailbox }: MailboxArgs) {
        return this.db.findAll(mailbox);
    }

    @Subscription(
    {
        topics: "new_email_received",
        filter: ({ payload, args }) => args.mailbox.toLowerCase() == payload.recipient.toLowerCase(),
    })
    subscribeToMailbox(
        @Root() email: EmailOutput,
        @Args() args: MailboxArgs
    ): EmailOutput {
        return email;
    }

    @Authorized("localhost")
    @Mutation(returns => Boolean)
    async pushEmail(
        @Args() { email }: PushEmailArgs,
        @PubSub("new_email_received") publish: Publisher<EmailOutput>
    ): Promise<boolean> {
        const em = <EmailOutput> await this.db.emailDAO.insert(email);
        await publish(em);
        return true;
    }

    // @Mutation(returns => Boolean)
    // @Authorized(Roles.Admin)
    // async removeEmail(@Arg("id") id: string) {
    //     try {
    //     await this.recipeService.removeById(id);
    //     return true;
    //     } catch {
    //     return false;
    //     }
    // }

}