'use strict';

module.exports.analyze = async (event) => {
  const config = JSON.parse(event.body);
  var AWS = require('aws-sdk');
  var textract = new AWS.Textract();
  var params = {
    DocumentLocation: { /* required */
      S3Object: {
        Bucket: config.bucket,
        Name: config.name,
        // Version: 'config.bucketVersion'/* optional */
      }
    },
    // ClientRequestToken: 'config.clientToken',/* optional */
    // JobTag: 'config.tag',/* optional */
    // NotificationChannel: {
    //   RoleArn:'config.roleArn', /* required */
    //   SNSTopicArn: config.topicArn /* required */
    // }
  };
  textract.startDocumentTextDetection(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      return {
        'isBase64Encoded': false,
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        'body': JSON.stringify({ error: err })
      }
    }
    else {
      console.log('data', data);
      return {
        'isBase64Encoded': false,
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        'body': JSON.stringify({ result: data })
      }
    }
  }).promise();

  return 'success';
};

