const patchData = async (url, datos) => {
    try {
        await axios.patch(url, datos)
    } catch (error) {
        console.error(error);
    }
};

export default patchData