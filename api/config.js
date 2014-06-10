
module.exports = {
	'associationsUrl': 'https://ethersource.gavagai.se/ethersource/rest/findAssociations?apiKey=5TrKUetB36uA&customerObserverId=452&timestamp=2014-05-08%2000:00:00%20CEST&maxResults=30&windowSize=24&userId=gavagaiApplicant',	
	'backgroundAssociationsUrl': 'https://ethersource.gavagai.se/ethersource/rest/findBackgroundAssociations?apiKey=5TrKUetB36uA&customerObserverId=452&timestamp=2014-05-08%2000:00:00%20CEST&maxResults=30&backlogInDays=300',
	'userid': process.env.GAVAGAI_USERID,
	'passwd': process.env.GAVAGAI_PWD
};