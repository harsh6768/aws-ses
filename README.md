## :heart: Star :heart: the repo to support the project or :smile:[Follow Me](https://github.com/harsh6768).Thanks!



Follow steps to send Email using node.js

1. Create AWS developer account.
   
   Create aws developer account to use all the services provided by the aws.
   
2. Create IAM USER
   
   2.1 Click Add User Button 
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-34-21.png" alt="">
   
   
   2.2 Add username and checked programmatic access then click next button
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-34-52.png" alt="">
   <br>
   
   
   2.3 Click Next
   
   <img src="   https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-02.png" alt="">
   <br>
   
   2.4 Click Next
   
    <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-13.png" alt="">
    <br>
    
   2.5 Click On Create User button
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-22.png" alt="">
   <br>
   
   2.6 Write down Access key and Secret Key And Click Close Button
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-37.png" alt="">
   <br>
   
   
   2.7  Click  Add Inline Policy Button
   
    <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-58.png" alt="">
    <br>
    
    
   2.8 Click Json Button And Json Code to Create New Policy and then save it
   
   
           {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "VisualEditor0",
                  "Effect": "Allow",
                  "Action": "ses:*",
                  "Resource": "*"
              }
          ]
        }
   
   
