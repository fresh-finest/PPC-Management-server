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

exports.updateCampaign = async(req,res)=>{
    const {access_token,compaignId,campaignData} = req.data;
    try {
        const response = await axios.put(`API_ENDPOINT_TO_UPDATE_CAMPAIGN/${campaignId}`,campaignData,{
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.response.data);
    }
};

exports.deleteCampaign = async(req,res)=>{
    const {access_token,campaignId} = req.body;

    try {
        const response = await axios.delete(`API_ENDPOINT_TO_DELETE_COMPAIGN/${campaignId}`,{
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        });
        res.status(response.data);
    } catch (error) {
        res.status(500).send(error.response.data);
    }
}