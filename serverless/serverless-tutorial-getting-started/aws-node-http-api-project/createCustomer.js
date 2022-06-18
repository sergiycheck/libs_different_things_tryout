'use strict';
const AWS = require('aws-sdk');

module.exports.createCustomer = async (event) => {
  console.log('EVENT', event);
  const body = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    //environment variables are in in serverless.yml
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email,
    },
  };
  const result = await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: result,
  };
};
