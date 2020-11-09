#!/usr/bin/env node

import { EmailInput } from './Model/Email';
import { simpleParser } from 'mailparser';
import fs from 'fs';
import { GraphQLClient, gql } from 'graphql-request'
import config from 'config';

(async () => {

    //const rawEmail = fs.readFileSync('./db/email.txt')
    const rawEmail = fs.readFileSync(0, 'utf-8');
    const parsedEmail = await simpleParser(rawEmail);
    let email = EmailInput.fromParsedEmail(parsedEmail);

    const mutation = gql`
        mutation InsertEmail($email: EmailInput!){
            pushEmail(email: $email)
        }
    `

    const variables = {
        email: email,
    }

    const PORT = <Number> config.get('Port')
    const ENDPOINT = (<boolean> config.get('Use_Https') ? 'https' : 'http') + '://localhost:' + PORT;
        
    const graphQLClient = new GraphQLClient(ENDPOINT)
    const data = await graphQLClient.request(mutation, variables)
    //console.log(JSON.stringify(data, undefined, 2));

})();