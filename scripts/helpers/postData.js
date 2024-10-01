const postData = async (url, datos) => {
    try {
        await axios.post(url, datos);
        
    } catch (error) {
        console.error(error);
    }
};

export default postData;