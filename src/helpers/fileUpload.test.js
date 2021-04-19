import  {fileUpload}  from "./fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'djdcezwon', 
    api_key: '878546731893357', 
    api_secret: 'ILcl8R94Vt3_nzR6HaZRpQ3HyJU' 
});

describe('test in file upload', () => {
    test('should load file and return url', async () => {

        const response = await fetch('https://images.pexels.com/users/avatars/206430/free-jpg-242.jpeg?auto=compress&fit=crop&h=256&w=256');
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpeg');

        const url = await fileUpload(file);

        // delete image
        const segments =  url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');   

        const {deleted} = await cloudinary.v2.api.delete_resources(imageId);
        expect(typeof url).toBe('string');
        expect(deleted).toEqual({ [imageId]: "deleted" });
        

    }, 6000);

    test('should return error', async () => {
        try {
            const file = new File([], 'photo.jpeg');
            const url = await fileUpload(file);
        } catch (error) {
            expect(error).toEqual({ error: { message: 'Empty file' } });
        }
    });
});

