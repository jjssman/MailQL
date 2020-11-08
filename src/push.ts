#!/usr/bin/env node

import { EmailInput } from './Model/Email';
import { simpleParser } from 'mailparser';
import fs from 'fs';
import { GraphQLClient, gql } from 'graphql-request'

(async () => {

    // const rawEmail = fs.readFileSync('./db/email.txt')
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
        
    const graphQLClient = new GraphQLClient('http://localhost:3001/graphql')
    const data = await graphQLClient.request(mutation, variables)
    //console.log(JSON.stringify(data, undefined, 2));

})();