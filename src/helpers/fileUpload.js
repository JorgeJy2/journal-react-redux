

export const fileUpload = async (file) =>{

    const cloudUrl = 'https://api.cloudinary.com/v1_1/djdcezwon/upload';

    const formDate = new FormData();
    formDate.append('upload_preset', 'reactreduxjournal');
    formDate.append('file', file);
    
    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formDate
        });

        if(response.ok){
            const cloudResponse = await response.json();
            return cloudResponse.secure_url;
        } else {
            throw await response.json(); 
        }
    } catch (error) {
        throw error;
    }

}