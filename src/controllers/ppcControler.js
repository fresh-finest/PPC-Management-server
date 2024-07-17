const axios = require('axios');

exports.createCampaign = async (req,res)=>{
    const {access_token, compaignData} = req.body;

    try {
        const response = await axios.post('API_ENDPOINT_TO_CREATE_CAMPAIGN',campaignData,{
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.response.data);
    }
};

exports.getCampaigns = async(req,res)=>{
    const {access_token} = req.body;

    try {
        const response = await axios.getAdapter('API_ENDPOINT_TO_GET_CAMPAIGNS',{
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.response.data);
    }
}