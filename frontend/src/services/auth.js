export const handleLogin = async (setLoggingIn) => {
    setLoggingIn(true)

    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        window.location.href = 'http://localhost:3000/api/spotify/authorizeUser';
    } catch (err){
        setLoggingIn(false);
        console.error('Error during Spotify Login (login page)', {
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        })
    }   
}