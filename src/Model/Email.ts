import { ParsedMail } from "mailparser";
import { field, id } from "sqlite3orm/metadata/decorators";
import { table } from "sqlite3orm/metadata/decorators";
import { Field, InputType, ObjectType } from "type-graphql/dist/decorators";
import { ID } from "type-graphql/dist/scalars/aliases";
import { Addresses } from "./Addresses";

interface Email {
    /**
     * The inbox which received the email
     */
    recipient: string;

    /**
    * An array of attachments.
    */
    //attachments!: Attachment[];
    /**
    * A Map object with lowercase header keys.
    *
    * - All address headers are converted into address objects.
    * - `references` is a string if only a single reference-id exists or an
    *    array if multiple ids exist.
    * - `date` value is a Date object.
    */
    //headers!: Headers;
    /**
    * An array of raw header lines
    */
    //headerLines!: HeaderLines;
    /**
    * The HTML body of the message.
    *
    * Sets to `false` when there is no HTML body.
    *
    * If the message included embedded images as cid: urls then these are all
    * replaced with base64 formatted data: URIs.
    */
    html: string;
    /**
    * The plaintext body of the message.
    */
    text?: string;
    /**
    * The plaintext body of the message formatted as HTML.
    */
    textAsHtml?: string;
    /**
    * The subject line.
    */
    subject?: string;
    /**
    * An array of referenced Message-ID values.
    *
    * Not set if no reference values present.
    */
    references?: string[];
    /**
    * A Date object for the `Date:` header.
    */
    date?: Date;
    /**
    * An address object for the `To:` header.
    */
    to?: Addresses;
    /**
    * An address object for the `From:` header.
    */
    from?: Addresses;
    /**
    * An address object for the `Cc:` header.
    */
    cc?: Addresses;
    /**
    * An address object for the `Bcc:` header (usually not present).
    */
    bcc?: Addresses;
    /**
    * An address object for the `Reply-To:` header.
    */
    replyTo?: Addresses;
    /**
    * The Message-ID value string.
    */
    messageId?: string;
    /**
    * The In-Reply-To value string.
    */
    inReplyTo?: string;
    /**
    * Priority of the e-mail.
    */
    priority?: 'normal' | 'low' | 'high';
}

@table({name: 'emails'})
@InputType()
export class EmailInput implements Email{

    @id({name: 'id', dbtype: 'INTEGER NOT NULL'})
    @Field(type => ID, { nullable: true })
    id?: Number;

    @field({name: 'recipient', dbtype: 'TEXT NOT NULL'})
    @Field()
    recipient!: string;

    @field({name: 'html', dbtype: 'TEXT NOT NULL'})
    @Field()
    html!: string;

    @field({name: 'text', dbtype: 'TEXT'})
    @Field({ nullable: true })
    text?: string;

    @field({name: 'textAsHtml', dbtype: 'TEXT'})
    @Field({ nullable: true })
    textAsHtml?: string;

    @field({name: 'subject', dbtype: 'TEXT'})
    @Field({ nullable: true })
    subject?: string;

    @field({name: 'references', dbtype: 'TEXT', isJson: true})
    @Field(type => [String], { nullable: true })
    references?: string[];

    @field({name: 'date'})
    @Field({ nullable: true })
    date?: Date;

    @field({name: 'to', dbtype: 'TEXT', isJson: true})
    @Field(type => Addresses, { nullable: true })
    to?: Addresses;

    @field({name: 'from', dbtype: 'TEXT', isJson: true})
    @Field(type => Addresses, { nullable: true })
    from?: Addresses;

    @field({name: 'cc', dbtype: 'TEXT', isJson: true})
    @Field(type => Addresses, { nullable: true })
    cc?: Addresses;

    @field({name: 'replyTo', dbtype: 'TEXT', isJson: true})
    @Field(type => Addresses, { nullable: true })
    bcc?: Addresses;

    @field({name: 'replyTo', dbtype: 'TEXT', isJson: true})
    @Field(type => Addresses, { nullable: true })
    replyTo?: Addresses;

    @field({name: 'messageId', dbtype: 'TEXT'})
    @Field({ nullable: true })
    messageId?: string;

    @field({name: 'inReplyTo', dbtype: 'TEXT'})
    @Field({ nullable: true })
    inReplyTo?: string;

    @field({name: 'priority', dbtype: 'TEXT'})
    @Field({ nullable: true })
    priority?: 'normal' | 'low' | 'high';

    static fromParsedEmail(ps: ParsedMail){
      let email = new EmailInput();
      email.recipient = <string> ps.headers.get('x-original-to');
      email.html = ps.html ? ps.html : '';
      email.text = ps.text;
      email.textAsHtml = ps.textAsHtml;
      email.subject = ps.subject;
      email.references = ps.references;
      email.date = ps.date;
      email.to = ps.to;
      email.from = ps.from;
      email.cc = ps.cc;
      email.bcc = ps.bcc;
      email.replyTo = ps.replyTo;
      email.messageId = ps.messageId;
      email.inReplyTo = ps.inReplyTo;
      email.priority = ps.priority;
      return email;
  }
}

@ObjectType()
export class EmailOutput implements Email{

    @Field(type => ID, { description: 'Unique id of the email.' })
    id!: Number;

    @Field({ description: 'The inbox which received the email.' })
    recipient!: string;

    @Field({ description: 'The HTML body of the message.' })
    html!: string;

    @Field({ nullable: true, description: 'The plaintext body of the message.' })
    text?: string;

    @Field({ nullable: true, description: 'The plaintext body of the message formatted as HTML.' })
    textAsHtml?: string;

    @Field({ nullable: true, description: 'The subject line.' })
    subject?: string;

    @Field(type => [String], { nullable: true, description: 'An array of referenced Message-ID values.' })
    references?: string[];

    @Field({ nullable: true, description: 'A Date object for the `Date:` header.' })
    date?: Date;

    @Field(type => Addresses, { nullable: true, description: 'An address object for the `To:` header.' })
    to?: Addresses;

    @Field(type => Addresses, { nullable: true, description: 'An address object for the `From:` header.' })
    from?: Addresses;

    @Field(type => Addresses, { nullable: true, description: 'An address object for the `Cc:` header.' })
    cc?: Addresses;

    @Field(type => Addresses, { nullable: true, description: 'An address object for the `Bcc:` header (usually not present).' })
    bcc?: Addresses;

    @Field(type => Addresses, { nullable: true, description: 'An address object for the `Reply-To:` header.' })
    replyTo?: Addresses;

    @Field({ nullable: true, description: 'The Message-ID value string.' })
    messageId?: string;

    @Field({ nullable: true, description: 'The In-Reply-To value string.' })
    inReplyTo?: string;

    @Field({ nullable: true, description: 'The reported priority of the e-mail.' })
    priority?: 'normal' | 'low' | 'high';

}