const scanner = require('sonarqube-scanner');
require('dotenv').config();
const userToken ='squ_9ebc9211e07dd0e7fb978f28dbf25af89cb9467f'
scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: userToken,
        options: {
            'sonar.sources': './src',
            'sonar.exclusions': '**/__test__/**'
        },
    },
    () => process.exit(),
);
