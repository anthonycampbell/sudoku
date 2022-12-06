export type AmplifyDependentResourcesAttributes = {
    "function": {
        "processsudokufunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "frontenddetectionlibrarieslayer": {
            "Arn": "string"
        }
    },
    "api": {
        "pythonapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}